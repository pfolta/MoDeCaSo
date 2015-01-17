<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/projects/messages.class.php
 * Created:			2015-01-17
 * Last modified:	2015-01-17
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
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

        $result = array(
            'error'         => false,
            'msg'           => "message_edited"
        );

        return $result;
    }

}