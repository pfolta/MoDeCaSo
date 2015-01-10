<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/projects/projects.class.php
 * Created:			2014-11-24
 * Last modified:	2014-12-22
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace model;

use \Exception;
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

    public function delete_project($project_key)
    {
        /*
         * Check if project exists
         */
        $this->database->select("projects", null, "`key` = '".$project_key."'");

        if ($this->database->row_count() == 1) {
            /*
             * Delete project
             */
            $this->database->delete("projects", "`key` = '".$project_key."'");

            $result = array(
                'error'         => false,
                'msg'           => "project_deleted"
            );
        } else {
            /*
             * Invalid project key provided
             */
            $result = array(
                'error'         => true,
                'msg'           => "invalid_project_key",
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

    public function get_project($project_key)
    {
        $this->database->select("projects", null, "`key` = '".$project_key."'");

        if ($this->database->row_count() == 1) {
            $project = $this->database->result()[0];

            $project_id = $project['id'];

            /*
             * Retrieve list of participants
             */
            $this->database->select("project_participants", null, "`project` = '".$project_id."'");
            $project_participants = $this->database->result();

            /*
             * Retrieve list of cards
             */
            $this->database->select("project_cards", null, "`project` = '".$project_id."'");
            $project_cards = $this->database->result();

            $result = array(
                'error'         => false,
                'project'       => $project,
                'participants'  => $project_participants,
                'cards'         => $project_cards
            );
        } else {
            /*
             * Invalid project key provided
             */
            $result = array(
                'error'         => true,
                'msg'           => "invalid_username"
            );
        }

        return $result;
    }

    /**
     * get_project_id ( )
     *
     * Returns the ID of a project represented by a key
     *
     * @param   string  $project_key    The project key
     * @return  int                     The ID of the associated project
     * @throws  Exception               Invalid project key
     */
    public static function get_project_id($project_key)
    {
        $database = database::get_instance();

        $database->select("projects", "`id`", "`key` = '".$project_key."'");

        if ($database->row_count() == 1) {
            $project_id = $database->result()[0]['id'];

            return $project_id;
        }

        throw new Exception("Invalid project key '".$project_key."'");
    }

}