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
use main\database;

class experiment
{

    private $database;

    public function __construct()
    {
        $this->database = database::get_instance();
    }

    public function init($project_key, $uuid)
    {
        /*
         * Check if participant can proceed (status either NOTIFIED or REMINDED)
         */
        $this->database->select("project_participants", null, "`id` = '".$uuid."'");
        $participant = $this->database->result()[0];

        switch ($participant['status']) {
            case participant_statuses::NOTIFIED:
            case participant_statuses::REMINDED:
                return array(
                    'proceed'   => true
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