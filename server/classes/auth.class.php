<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/classes/auth.class.php
 * Created:			2014-11-05
 * Last modified:	2014-11-10
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace classes;

class auth
{

    private static $instance = null;

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
                    $this->database->insert("users_tokens", array(
                        'api_key'       => $api_key,
                        'user'          => $result['id'],
                        'granted'       => time(),
                        'expiration'    => time() + config::get_instance()->get_config_value("auth", "session_lifetime")
                    ));

                    print $this->database->error();

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
                        'role'          => $result['role']
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

    public function logout()
    {
        /*
         * Delete API Key from database
         */

        return true;
    }

    public function change_password($username, $new_password)
    {
        return true;
    }

    public function authenticate()
    {
        /*
         * Clear database of expired API Keys
         */
        $this->database->delete("users_token", "expiration < ".time());
    }

    private function generate_api_key()
    {
        return sha1(microtime());
    }

}