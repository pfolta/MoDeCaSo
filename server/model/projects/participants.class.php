<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/projects/participants.class.php
 * Created:			2015-01-13
 * Last modified:	2015-01-13
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace model;

use Exception;
use main\database;

class participants
{

    private $database;

    public function __construct()
    {
        $this->database = database::get_instance();
    }

    public function add_participant($project_key, $first_name, $last_name, $email)
    {
        /*
         * Get project ID
         */
        $project_id = projects::get_project_id($project_key);

        /*
         * Insert new participant into database
         */
        $this->database->insert("project_participants", array(
            'project'       => $project_id,
            'first_name'    => $first_name,
            'last_name'     => $last_name,
            'email'         => $email,
            'created'       => time(),
            'last_modified' => time()
        ));

        $result = array(
            'error'         => false,
            'msg'           => "participant_created"
        );

        return $result;
    }

    public function delete_participant($project_key, $participant_id)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        /*
         * Check if participant exists
         */
        $this->database->select("project_participants", null, "`id` = '".$participant_id."' AND `project` = '".$project_id."'");

        if ($this->database->row_count() == 1) {
            /*
             * Delete participant
             */
            $this->database->delete("project_participants", "`id` = '".$participant_id."'");

            $result = array(
                'error'         => false,
                'msg'           => "participant_deleted"
            );
        } else {
            throw new Exception("Invalid Participant");
        }

        return $result;
    }

    public function delete_all_participants($project_key)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        /*
         * Delete all participants linked to this project from database
         */
        $this->database->delete("project_participants", "`project` = '".$project_id."'");

        $result = array(
            'error'         => false,
            'msg'           => "all_participants_deleted"
        );

        return $result;
    }

    public function edit_participant($project_key, $participant_id, $first_name, $last_name, $email)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        /*
         * Check if participant exists
         */
        $this->database->select("project_participants", null, "`id` = '".$participant_id."' AND `project` = '".$project_id."'");

        if ($this->database->row_count() == 1) {
            $data = array(
                'first_name'    => $first_name,
                'last_name'     => $last_name,
                'email'         => $email,
                'last_modified' => time()
            );

            /*
             * Update participant in database
             */
            $this->database->update("project_participants", "`id` = '".$participant_id."'", $data);

            $result = array(
                'error'         => false,
                'msg'           => "card_edited"
            );
        } else {
            throw new Exception("Invalid Card");
        }

        return $result;
    }

    public function get_participant($project_key, $participant_id)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        $this->database->select("project_participants", null, "`id` = '".$participant_id."' AND `project` = '".$project_id."'");

        if ($this->database->row_count() == 1) {
            $participant = $this->database->result()[0];

            $result = array(
                'error'         => false,
                'participant'   => $participant
            );
        } else {
            throw new Exception("Invalid Participant");
        }

        return $result;
    }

    public function export_participants($project_key)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        $this->database->select("project_participants", null, "`project` = '".$project_id."'");
        $participants = $this->database->result();

        $export_data = "";

        foreach ($participants as $participant) {
            $export_data .= $participant['first_name']."|".$participant['last_name']."|".$participant['email'];

            $export_data .= "\n";
        }

        $export_data = trim($export_data);

        return $export_data;
    }

    public function import_participants($project_key, $import_file)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        if ($import_file['type'] != "text/plain") {
            throw new Exception("'".$import_file['name']."' is not a plain text file");
        }

        $file_handle = fopen($import_file['tmp_name'], "rb");

        while (($line = fgets($file_handle)) !== false) {
            $card = explode("|", $line);

            $first_name = trim($card[0]);
            $last_name = trim($card[1]);
            $email = trim($card[2]);

            if (!empty($first_name) && !empty($last_name) && !empty($email)) {
                $this->database->insert("project_participants", array(
                    'project'       => $project_id,
                    'first_name'    => $first_name,
                    'last_name'     => $last_name,
                    'email'         => $email,
                    'created'       => time(),
                    'last_modified' => time()
                ));
            }
        }

        return array(
            'error'         => false,
            'msg'           => "participants_imported"
        );
    }

}