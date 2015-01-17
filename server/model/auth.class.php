<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/auth.class.php
 * Created:			2014-11-05
 * Last modified:	2015-01-17
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace model;

use data\user_roles;
use Exception;

use main\config;
use main\database;
use Slim\Slim;

class auth
{

    private static $instance = null;

    private $app;

    private $config;
    private $database;

    public static function get_instance()
    {
        if (self::$instance == null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
        $this->app = Slim::getInstance();

        $this->config = config::get_instance();
        $this->database = database::get_instance();
    }

    private function __clone()
    {
    }

    public function login($username, $password, $client_application)
    {
        /*
         * Check whether user exists
         */
        $this->database->select("users", null, "username = '".$username."'");

        if ($this->database->row_count() == 1) {
            $result = $this->database->result()[0];

            /*
             * Verify password
             */
            if (password_verify($password, $result['password'])) {
                /*
                 * Check whether user account is enabled
                 */
                if ($result['status'] == 1) {
                    /*
                     * Generate API Key
                     */
                    $api_key = $this->generate_api_key();

                    $granted    = $GLOBALS['timestamp'];
                    $expiry     = $granted + $this->config->get_config_value("auth", "session_lifetime");

                    /*
                     * Store API Key in user database
                     */
                    $this->database->insert("user_tokens", array(
                        'api_key'                       => $api_key,
                        'user'                          => $result['id'],
                        'granted'                       => $granted,
                        'expiry'                        => $expiry
                    ));

                    /*
                     * Update user data with current login information
                     */
                    $this->database->update("users", "`id` = '".$result['id']."'", array(
                        'last_login'                    => $GLOBALS['timestamp'],
                        'last_login_from_ip'            => $_SERVER['REMOTE_ADDR'],
                        'last_login_from_hostname'      => gethostbyaddr($_SERVER['REMOTE_ADDR']),
                        'last_login_from_application'   => $client_application
                    ));

                    /*
                     * Set options
                     */
                    $login_result = array(
                        'error'                         => false,
                        'msg'                           => "login_successful",
                        'api_key'                       => $api_key,
                        'api_key_granted'               => $granted,
                        'api_key_expiry'                => $expiry,
                        'username'                      => $result['username'],
                        'first_name'                    => $result['first_name'],
                        'last_name'                     => $result['last_name'],
                        'role'                          => user_roles::$values[$result['role']],
                        'password_last_changed'         => $result['password_last_changed'],
                        'last_login'                    => $result['last_login'],
                        'last_login_from_ip'            => $result['last_login_from_ip'],
                        'last_login_from_hostname'      => $result['last_login_from_hostname'],
                        'last_login_from_application'   => $result['last_login_from_application']
                    );
                } else {
                    /*
                     * User account exists but is disabled
                     */
                    $login_result = array(
                        'error'         => true,
                        'msg'           => "account_disabled"
                    );
                }
            } else {
                /*
                 * Incorrect password provided
                 */
                $login_result = array(
                    'error'         => true,
                    'msg'           => "invalid_credentials",
                );
            }
        } else {
            /*
             * Invalid username provided
             */
            $login_result = array(
                'error'         => true,
                'msg'           => "invalid_credentials",
            );
        }

        /*
         * Return result array
         */
        return $login_result;
    }

    public function logout($api_key)
    {
        /*
         * Delete API Key from database
         */
        $this->database->delete("user_tokens", "api_key = '".$api_key."'");
    }

    public function change_password($api_key, $old_password, $new_password)
    {
        /*
         * Get user
         */
        $this->database->select("user_tokens", "user", "api_key = '".$api_key."'");

        if ($this->database->row_count() == 1) {
            $user = $this->database->result()[0]['user'];

            $this->database->select("users", "password", "id = '".$user."'");
            $stored_old_password = $this->database->result()[0]['password'];

            /*
             * Verify old password
             */
            if (password_verify($old_password, $stored_old_password)) {
                /*
                 * Create password hash
                 */
                $new_password_hashed = password_hash($new_password, PASSWORD_BCRYPT, array(
                    'cost'          => $this->config->get_config_value("auth", "password_cost")
                ));

                /*
                 * Updated password in database
                 */
                $this->database->update("users", "`id` = '".$user."'", array(
                    'password'                  => $new_password_hashed,
                    'password_last_changed'     => $GLOBALS['timestamp']
                ));

                $result = array(
                    'error'         => false,
                    'msg'           => "password_change_successful"
                );
            } else {
                /*
                 * Incorrect old password provided
                 */
                $result = array(
                    'error'         => true,
                    'msg'           => 'incorrect_old_password'
                );
            }
        } else {
            /*
             * Invalid API key
             */
            throw new Exception("Invalid API Key.");
        }

        return $result;
    }

    /**
     * authenticate ( )
     *
     * Verifies if user is authorized to access protected resources
     *
     * @param $api_key          string  API key of the user to verify
     * @param $required_role    int     Role rights required to verify against
     * @return bool                     true if user is authorized, false if user is not authorized
     */
    public function authenticate($api_key, $required_role)
    {
        /*
         * Clear database of expired API Keys
         */
        $this->clear_expired_tokens();

        $this->database->select("user_tokens", "user", "api_key = '".$api_key."'");

        if ($this->database->row_count() == 1) {
            /*
             * Get user role
             */
            $user = $this->database->result()[0]['user'];
            $this->database->select("users", "role", "id = '".$user."'");
            $role = $this->database->result()[0]['role'];

            /*
             * Update session lifetime
             */
            $this->database->update("user_tokens", "api_key = '".$api_key."'", array(
                'expiration'    => $GLOBALS['timestamp'] + $this->config->get_config_value("auth", "session_lifetime")
            ));

            if ($role >= $required_role) {
                return true;
            }

            return false;
        }

        $this->app->render(
            401,
            array(
                'error'         => true,
                'msg'           => "invalid_api_key"
            )
        );

        return false;
    }

    /**
     * clear_expired_tokens ( )
     *
     * Clears database of expired API Keys
     */
    public function clear_expired_tokens()
    {
        $this->database->delete("user_tokens", "expiration < ".$GLOBALS['timestamp']);
    }

    private function generate_api_key()
    {
        return sha1(uniqid(rand(), true));
    }

}