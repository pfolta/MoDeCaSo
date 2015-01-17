<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/administration/user_management.class.php
 * Created:			2014-11-12
 * Last modified:	2015-01-17
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace model;

use data\user_roles;
use data\user_statuses;
use Exception;

use main\config;
use main\database;
use tools\mail;

class user_management
{

    private $config;
    private $database;

    public function __construct()
    {
        $this->config = config::get_instance();
        $this->database = database::get_instance();
    }

    public function add_user($username, $first_name, $last_name, $email, $role, $status)
    {
        /*
         * Check if username already exists
         */
        $this->database->select("users", null, "username = '".$username."'");

        if ($this->database->row_count() == 0) {
            /*
             * Auto generate password
             */
            $password = $this->generate_password(10);
            $password_hash = password_hash($password, PASSWORD_BCRYPT, array(
                'cost'          => $this->config->get_config_value("auth", "password_cost")
            ));

            /*
             * Insert new user into database
             */
            $this->database->insert("users", array(
                'username'      => $username,
                'password'      => $password_hash,
                'first_name'    => $first_name,
                'last_name'     => $last_name,
                'email'         => $email,
                'role'          => $role,
                'status'        => $status,
                'created'       => $GLOBALS['timestamp'],
                'last_modified' => $GLOBALS['timestamp']
            ));

            /*
             * Notify new user via email
             */
            $message = "Dear ".$first_name." ".$last_name.",

a new MoDeCaSo user account has been created for you.

You can find your credentials below:
Username: ".$username."
Password: ".$password."

Please go to MoDeCaSo by visiting ".$this->config->get_config_value("main", "application_url")." and log in to MoDeCaSo to change your password.

Hint: To change your password, open the \"Signed in as\" menu and click on \"Change Password\". Please keep your password secret and do not share it with others.";

            $mail = new mail("MoDeCaSo <".$this->config->get_config_value("email", "sender_address").">", $first_name." ".$last_name." <".$email.">", "Account Registration", $message);
            $mail->send();

            $result = array(
                'error'         => false,
                'msg'           => "user_added"
            );
        } else {
            $result = array(
                'error'         => true,
                'msg'           => "username_already_exists"
            );
        }

        return $result;
    }

    public function delete_user($username)
    {
        /*
         * Check if user exists
         */
        $this->database->select("users", null, "username = '".$username."'");

        if ($this->database->row_count() == 1) {
            /*
             * Delete user
             */
            $this->database->delete("users", "username = '".$username."'");

            $result = array(
                'error'         => false,
                'msg'           => "user_deleted"
            );
        } else {
            /*
             * Invalid username provided
             */
            $result = array(
                'error'         => true,
                'msg'           => "invalid_username",
            );
        }

        return $result;
    }

    public function edit_user($username, $password, $first_name, $last_name, $email, $role, $status)
    {
        /*
         * Check if user exists
         */
        $this->database->select("users", null, "username = '".$username."'");

        if ($this->database->row_count() == 1) {
            $data = array(
                'first_name'    => $first_name,
                'last_name'     => $last_name,
                'email'         => $email,
                'role'          => $role,
                'status'        => $status,
                'last_modified' => $GLOBALS['timestamp']
            );

            if (!is_null($password)) {
                /*
                 * Hash password
                 */
                $password_hash = password_hash($password, PASSWORD_BCRYPT, array(
                    'cost'          => $this->config->get_config_value("auth", "password_cost")
                ));

                $data['password'] = $password_hash;
            }

            /*
             * Update user in database
             */
            $this->database->update("users", "username = '".$username."'", $data);

            $result = array(
                'error'         => false,
                'msg'           => "user_edited"
            );
        } else {
            $result = array(
                'error'         => true,
                'msg'           => "invalid_username"
            );
        }

        return $result;
    }

    public function get_user($username)
    {
        $this->database->select("users", "id, username, first_name, last_name, email, role, status, created, last_modified, password_last_changed, last_login, last_login_from_ip, last_login_from_hostname, last_login_from_application", "username = '".$username."'");

        if ($this->database->row_count() == 1) {
            $user = $this->database->result()[0];

            $result = array(
                'error'         => false,
                'user'          => $user
            );
        } else {
            /*
             * Invalid username provided
             */
            $result = array(
                'error'         => true,
                'msg'           => "invalid_username"
            );
        }

        return $result;
    }

    public function get_user_list()
    {
        $this->database->select("users", "id, username, first_name, last_name, email, role, status, created, last_modified");
        $users = $this->database->result();

        for ($i = 0; $i < count($users); $i++) {
            $users[$i]['role'] = user_roles::$values[$users[$i]['role']];
            $users[$i]['status'] = user_statuses::$values[$users[$i]['status']];
        }

        return $users;
    }

    private function generate_password($length)
    {
        if ($length < 1 || $length > 40) {
            throw new Exception("The password length must be between 1 and 40.");
        }

        return substr(sha1(uniqid(rand(), true)), 0, $length);
    }

}