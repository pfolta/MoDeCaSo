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
 * Last modified:	2014-11-05
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace classes;

class auth
{

    private static $instance = null;

    public static function get_instance()
    {
        if (self::$instance == null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
    }

    private function __clone()
    {
    }

    public function login($username, $password)
    {
        if ($username == "dev" && $password == "dev") {
            /*
             * Generate API Key
             */
            $api_key = $this->generate_api_key();

            /*
             * Set options
             */
            $options = array(
                "api_key"       => $api_key,
                "username"      => $username,
                "first_name"    => "First",
                "last_name"     => "Last"
            );

            /*
             * Return Options array
             */
            return $options;
        }

        return false;
    }

    public function logout()
    {
        return true;
    }

    public function change_password($username, $new_password)
    {
        return true;
    }

    private function generate_api_key()
    {
        return sha1(microtime());
    }

}