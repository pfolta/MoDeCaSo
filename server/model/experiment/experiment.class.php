<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/experiment/experiment.class.php
 * Created:			2015-03-31
 * Last modified:	2015-03-31
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace model;

use data\participant_statuses;
use main\config;
use main\database;

class experiment
{

    private $config;
    private $database;

    public function __construct()
    {
        $this->config = config::get_instance();
        $this->database = database::get_instance();
    }

    public function init($project_key, $uuid)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        /*
         * Check if participant can proceed (status either NOTIFIED or REMINDED)
         */
        $this->database->select("project_participants", null, "`id` = '".$uuid."'");
        $participant = $this->database->result()[0];

        switch ($participant['status']) {
            case participant_statuses::NOTIFIED:
            case participant_statuses::REMINDED:
                /*
                 * Is seed participant?
                 */
                $this->database->select("projects", null, "`key` = '".$project_key."'");
                $project = $this->database->result()[0];
                $seed = $project['seed'];

                if ($participant['id'] == $seed) {
                    $is_seed = true;
                } else {
                    $is_seed = false;
                }

                /*
                 * Load welcome message
                 */
                if ($is_seed) {
                    $this->database->select("project_messages", null, "`project` = '".$project_id."' AND `type` = 'sp_welcome_message'");
                } else {
                    $this->database->select("project_messages", null, "`project` = '".$project_id."' AND `type` = 'welcome_message'");
                }

                $message = $this->database->result()[0]['message'];

                /*
                 * Replace custom variables
                 */
                $message = str_replace("%first_name%", $participant['first_name'], $message);
                $message = str_replace("%last_name%", $participant['last_name'], $message);
                $message = str_replace("%completion_timestamp%", date("n/j/Y g:i:s A", $project['completion']), $message);
                $message = str_replace("%experiment_link%", $this->config->get_config_value("main", "application_url")."/frontend/experiment/".$project_key."/".$uuid, $message);

                return array(
                    'proceed'   => true,
                    'message'   => $message
                );
            default:
                /*
                 * Participant cannot proceed
                 */
                return array(
                    'proceed'   => false
                );
        }
    }

}