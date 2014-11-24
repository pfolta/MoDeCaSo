<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/projects/projects.class.php
 * Created:			2014-11-24
 * Last modified:	2014-11-24
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace model;

use main\database;

class projects
{

    private $database;

    public function __construct()
    {
        $this->database = database::get_instance();
    }

    public function create_project($title, $key, $moderator)
    {
        /*
         * Check if project key already exists
         */
        $this->database->select("projects", null, "`key` = '".$key."'");

        if ($this->database->row_count() == 0) {
            /*
             * Insert new project into database
             */
            $this->database->insert("projects", array(
                'title'         => $title,
                'key'           => $key,
                'moderator'     => $moderator,
                'created'       => time(),
                'last_modified' => time()
            ));

            print $this->database->error();

            $result = array(
                'error'         => false,
                'msg'           => "project_created"
            );
        } else {
            $result = array(
                'error'         => true,
                'msg'           => "project_key_already_exists"
            );
        }

        return $result;
    }

}