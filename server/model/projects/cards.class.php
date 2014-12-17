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

    public function add_card($key, $value)
    {
        /*
         * Check if project key exists
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
                'value'         => $value,
                'created'       => time(),
                'last_modified' => time()
            ));

            $result = array(
                'error'         => false,
                'msg'           => "card_created"
            );
        } else {
            $result = array(
                'error'         => true,
                'msg'           => "invalid_project_key"
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
             * Invalid Card ID provided
             */
            $result = array(
                'error'         => true,
                'msg'           => "invalid_card_id",
            );
        }

        return $result;
    }

    public function edit_card($card_id, $value)
    {
        /*
         * Check if card exists
         */
        $this->database->select("project_cards", null, "`id` = '".$card_id."'");

        if ($this->database->row_count() == 1) {
            $data = array(
                'value'         => $value,
                'last_modified' => time()
            );

            /*
             * Update card in database
             */
            $this->database->update("project_cards", "`id` = '".$card_id."'", $data);

            $result = array(
                'error'         => false,
                'msg'           => "card_edited"
            );
        } else {
            $result = array(
                'error'         => true,
                'msg'           => "invalid_card_id"
            );
        }

        return $result;
    }

    public function get_card($card_id)
    {
        $this->database->select("project_cards", "id, project, value", "`id` = '".$card_id."'");

        if ($this->database->row_count() == 1) {
            $card = $this->database->result()[0];

            $result = array(
                'error'         => false,
                'card'          => $card
            );
        } else {
            /*
             * Invalid Card ID provided
             */
            $result = array(
                'error'         => true,
                'msg'           => "invalid_card_id"
            );
        }

        return $result;
    }

}