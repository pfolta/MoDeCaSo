<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/projects/cards.class.php
 * Created:			2014-12-10
 * Last modified:	2014-12-17
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace model;

use data\project_statuses;
use main\database;

class cards
{

    private $database;

    public function __construct()
    {
        $this->database = database::get_instance();
    }

    public function add_card($key, $card)
    {
        /*
         * Check if project key already exists
         */
        $this->database->select("projects", null, "`key` = '".$key."'");

        if ($this->database->row_count() == 1) {
            /*
             * Get project ID
             */
            $project_id = $this->database->result()[0]['id'];

            /*
             * Insert new card into database
             */
            $this->database->insert("project_cards", array(
                'project'       => $project_id,
                'value'         => $card
            ));

            $result = array(
                'error'         => false,
                'msg'           => "project_created"
            );
        } else {
            $result = array(
                'error'         => true,
                'msg'           => "project_key_does_not_exists"
            );
        }

        return $result;
    }

    public function delete_card($card_id)
    {
        /*
         * Check if card exists
         */
        $this->database->select("project_cards", null, "`id` = '".$card_id."'");

        if ($this->database->row_count() == 1) {
            /*
             * Delete card
             */
            $this->database->delete("project_cards", "`id` = '".$card_id."'");

            $result = array(
                'error'         => false,
                'msg'           => "card_deleted"
            );
        } else {
            /*
             * Invalid card id provided
             */
            $result = array(
                'error'         => true,
                'msg'           => "invalid_card_id",
            );
        }

        return $result;
    }

}