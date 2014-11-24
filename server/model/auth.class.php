<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/auth.class.php
 * Created:			2014-11-05
 * Last modified:	2014-11-17
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace model;

use data\user_roles;
use Exception;

use main\config;
use main\database;

class auth
{

    private static $instance = null;

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
        $this->config = config::get_instance();
        $this->database = database::get_instance();
    }

    private function __clone()
    {
    }

    public function login($username, $password)
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

                    /*
                     * Store API Key in user database
                     */
                    $this->database->insert("user_tokens", array(
                        'api_key'       => $api_key,
                        'user'          => $result['id'],
                        'granted'       => time(),
                        'expiration'    => time() + $this->config->get_config_value("auth", "session_lifetime")
                    ));

                    /*
                     * Set options
                     */
                    $login_result = array(
                        'error'         => false,
                        'msg'           => "login_successful",
                        'api_key'       => $api_key,
                        'username'      => $result['username'],
                        'first_name'    => $result['first_name'],
                        'last_name'     => $result['last_name'],
                        'role'          => user_roles::$values[$result['role']]
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
                $this->database->update("users", "id = '".$user."'", array(
                    'password'      => $new_password_hashed
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
                'expiration'    => time() + $this->config->get_config_value("auth", "session_lifetime")
            ));

            if ($role >= $required_role) {
                return true;
            }

            return false;
        }

        return false;
    }

    /**
     * clear_expired_tokens ( )
     *
     * Clears database of expired API Keys
     */
    public function clear_expired_tokens()
    {
        $this->database->delete("user_tokens", "expiration < ".time());
    }

    private function generate_api_key()
    {
        return sha1(uniqid(rand(), true));
    }

}