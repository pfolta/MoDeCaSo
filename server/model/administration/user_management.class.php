<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/administration/user_management.class.php
 * Created:			2014-11-12
 * Last modified:	2014-11-12
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace model;

use main\database;

class user_management
{

    private $database;

    public function __construct()
    {
        $this->database = database::get_instance();
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

    public function edit_user()
    {
    }

    public function get_user_list()
    {
        $this->database->select("users", "id, username, first_name, last_name, email, role, status");
        $users = $this->database->result();

        for ($i = 0; $i < count($users); $i++) {
            if ($users[$i]['status'] == 1) {
                $users[$i]['status'] = "active";
            } else {
                $users[$i]['status'] = "inactive";
            }
        }

        return $users;
    }

}