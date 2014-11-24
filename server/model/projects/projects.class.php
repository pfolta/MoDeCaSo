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

use data\project_statuses;
use main\database;

class projects
{

    private $database;

    public function __construct()
    {
        $this->database = database::get_instance();
    }

    public function create_project($title, $key, $lead)
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
                'lead'          => $lead,
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

    public function get_project_list($lead = null)
    {
        if (is_null($lead)) {
            $this->database->select("projects", "`id`, `title`, `key`, `lead`, `status`, `created`, `last_modified`, `started`");
        } else {
            $this->database->select("projects", "`id`, `title`, `key`, `lead`, `status`, `created`, `last_modified`, `started`", "`lead` = '".$lead."'");
        }

        $projects = $this->database->result();

        for ($i = 0; $i < count($projects); $i++) {
            $this->database->select("users", "`username`, `first_name`, `last_name`", "`id` = '".$projects[$i]['lead']."'");
            $lead = $this->database->result()[0];

            $projects[$i]['lead'] = $lead['first_name']." ".$lead['last_name']." (".$lead['username'].")";

            $projects[$i]['status'] = project_statuses::$values[$projects[$i]['status']];
        }

        return $projects;
    }

}