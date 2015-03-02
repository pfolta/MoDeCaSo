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
 * Last modified:	2015-03-02
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace model;

use data\participant_statuses;
use \Exception;
use data\project_statuses;
use main\config;
use main\database;

class projects
{

    private $config;
    private $database;

    public function __construct()
    {
        $this->config = config::get_instance();
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
                'title'                 => $title,
                'key'                   => $key,
                'lead'                  => $lead,
                'completion'            => $this->config->get_config_value("project", "completion_timestamp"),
                'reminder'              => $this->config->get_config_value("project", "reminder_timestamp"),
                'created'               => $GLOBALS['timestamp'],
                'last_modified'         => 0
            ));

            /*
             * Project ID
             */
            $project_id = $this->database->get_insert_id();

            /*
             * Insert default messages into database
             */
            $this->database->insert("project_messages", array(
                'project'               => $project_id,
                'type'                  => "email_invitation",
                'message'               => $this->config->get_config_value("project", "email_invitation"),
                'created'               => $GLOBALS['timestamp'],
                'last_modified'         => 0
            ));

            $this->database->insert("project_messages", array(
                'project'               => $project_id,
                'type'                  => "sp_email_invitation",
                'message'               => $this->config->get_config_value("project", "sp_email_invitation"),
                'created'               => $GLOBALS['timestamp'],
                'last_modified'         => 0
            ));

            $this->database->insert("project_messages", array(
                'project'               => $project_id,
                'type'                  => "welcome_message",
                'message'               => $this->config->get_config_value("project", "welcome_message"),
                'created'               => $GLOBALS['timestamp'],
                'last_modified'         => 0
            ));

            $this->database->insert("project_messages", array(
                'project'               => $project_id,
                'type'                  => "sp_welcome_message",
                'message'               => $this->config->get_config_value("project", "sp_welcome_message"),
                'created'               => $GLOBALS['timestamp'],
                'last_modified'         => 0
            ));

            $this->database->insert("project_messages", array(
                'project'               => $project_id,
                'type'                  => "email_reminder",
                'message'               => $this->config->get_config_value("project", "email_reminder"),
                'created'               => $GLOBALS['timestamp'],
                'last_modified'         => 0
            ));

            $this->database->insert("project_messages", array(
                'project'               => $project_id,
                'type'                  => "email_timeout",
                'message'               => $this->config->get_config_value("project", "email_timeout"),
                'created'               => $GLOBALS['timestamp'],
                'last_modified'         => 0
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
             * Set Project Lead information
             */
            $this->database->select("users", "`username`, `first_name`, `last_name`", "`id` = '".$project['lead']."'");
            $lead = $this->database->result()[0];

            $project['lead'] = $lead['first_name']." ".$lead['last_name']." (".$lead['username'].")";

            $project['status'] = project_statuses::$values[$project['status']];

            /*
             * Retrieve messages
             */
            $this->database->select("project_messages", null, "`project` = '".$project_id."'");
            $messages = $this->database->result();

            $project_messages = array();

            foreach ($messages as $message) {
                $project_messages[$message['type']] = $message;
            }

            /*
             * Retrieve list of participants
             */
            $this->database->select("project_participants", null, "`project` = '".$project_id."'", null, null, "`order` ASC");
            $project_participants = $this->database->result();

            for ($i = 0; $i < count($project_participants); $i++) {
                $project_participants[$i]['status'] = participant_statuses::$values[$project_participants[$i]['status']];
            }

            /*
             * Retrieve list of cards
             */
            $this->database->select("project_cards", null, "`project` = '".$project_id."'");
            $project_cards = $this->database->result();

            $result = array(
                'error'         => false,
                'project'       => $project,
                'messages'      => $project_messages,
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

    public function edit_project($project_key, $completion, $reminder)
    {
        $project_id = self::get_project_id($project_key);

        $this->database->update("projects", "`id` = '".$project_id."'", array(
            'completion'        => $completion,
            'reminder'          => $reminder
        ));

        self::compute_project_status($project_key);
        self::update_last_modified($project_key);

        return array(
            'error'         => false,
            'msg'           => "project_edited"
        );
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

    public static function update_last_modified($project_key)
    {
        $database = database::get_instance();

        $database->select("projects", null, "`key` = '".$project_key."'");

        if ($database->row_count() == 1) {
            $database->update("projects", "`key` = '".$project_key."'", array(
                'last_modified' => $GLOBALS['timestamp']
            ));
        } else {
            throw new Exception("Invalid project key '".$project_key."'");
        }
    }

    public static function compute_project_status($project_key)
    {
        $database = database::get_instance();

        $database->select("projects", null, "`key` = '".$project_key."'");

        if ($database->row_count() == 1) {
            $project = $database->result()[0];
            $status  = $project['status'];

            /*
             * Retrieve list of participants
             */
            $database->select("project_participants", null, "`project` = '".$project['id']."'");
            $participant_count = $database->row_count();

            /*
             * Retrieve list of cards
             */
            $database->select("project_cards", null, "`project` = '".$project['id']."'");
            $card_count = $database->row_count();

            switch ($status) {
                case project_statuses::CREATED:
                    if ($participant_count > 0 && $card_count > 0) {
                        $status = project_statuses::READY;
                    }

                    break;
                case project_statuses::READY:
                    if ($participant_count < 1 || $card_count < 1) {
                        $status = project_statuses::CREATED;
                    }

                    break;
            }

            /*
             * Update project status
             */
            $database->update("projects", "`key` = '".$project_key."'", array(
                'status'        => $status
            ));
        } else {
            throw new Exception("Invalid project key '".$project_key."'");
        }
    }

}