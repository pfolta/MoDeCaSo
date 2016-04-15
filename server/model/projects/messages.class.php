<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/model/projects/messages.class.php
 * Created:			2015-01-17
 * Last modified:	2015-01-21
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace model;

use Exception;
use main\database;

class messages
{

    private $database;

    public function __construct()
    {
        $this->database = database::get_instance();
    }

    public function get_message($project_key, $type)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        $this->database->select("project_messages", null, "`type` = '".$type."' AND `project` = '".$project_id."'");

        if ($this->database->row_count() == 1) {
            $message = $this->database->result()[0];

            $result = array(
                'error'         => false,
                'message'       => $message
            );
        } else {
            throw new Exception("Invalid Message");
        }

        return $result;
    }

    public function get_welcome_message($project_key, $uuid)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        $this->database->select("project_participants", null, "`project` = '".$project_id."'", null, null, "`order` ASC");
        $participants = $this->database->result();

        /*
         * Is seed participant?
         */
        $is_seed = true;

        if ($participants[$i]['order'] > 1) {
            for ($j = $participants[$i]['order']; $j >= 1; $j--) {
                if ($participants[$j]['status'] == participant_statuses::COMPLETED) {
                    $is_seed = false;
                }
            }
        }



        $this->database->select("project_messages", null, "`type` = '".$type."' AND `project` = '".$project_id."'");

        if ($this->database->row_count() == 1) {
            $message = $this->database->result()[0];

            $result = array(
                'error'         => false,
                'message'       => $message
            );
        } else {
            throw new Exception("Invalid Message");
        }

        return $result;
    }

    public function edit_message($project_key, $type, $message)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        $data = array(
            'message'       => $message,
            'last_modified' => $GLOBALS['timestamp']
        );

        /*
         * Update message in database
         */
        $this->database->update("project_messages", "`type` = '".$type."' AND `project` = '".$project_id."'", $data);

        /*
         * Update project last modified timestamp
         */
        projects::update_last_modified($project_key);

        $result = array(
            'error'         => false,
            'msg'           => "message_edited"
        );

        return $result;
    }

}