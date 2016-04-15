<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/model/projects/cards.class.php
 * Created:			2014-12-10
 * Last modified:	2015-01-21
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace model;

use Exception;
use main\database;

class cards
{

    private $database;

    public function __construct()
    {
        $this->database = database::get_instance();
    }

    public function add_card($project_key, $text, $tooltip)
    {
        /*
         * Get project ID
         */
        $project_id = projects::get_project_id($project_key);

        /*
         * Insert new card into database
         */
        $this->database->insert("project_cards", array(
            'project'       => $project_id,
            'text'          => $text,
            'tooltip'       => $tooltip,
            'created'       => $GLOBALS['timestamp'],
            'last_modified' => 0
        ));

        /*
         * Update project last modified timestamp
         */
        projects::update_last_modified($project_key);

        /*
         * Compute project status
         */
        projects::compute_project_status($project_key);

        $result = array(
            'error'         => false,
            'msg'           => "card_created"
        );

        return $result;
    }

    public function delete_card($project_key, $card_id)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        /*
         * Check if card exists
         */
        $this->database->select("project_cards", null, "`id` = '".$card_id."' AND `project` = '".$project_id."'");

        if ($this->database->row_count() == 1) {
            /*
             * Delete card
             */
            $this->database->delete("project_cards", "`id` = '".$card_id."'");

            /*
             * Update project last modified timestamp
             */
            projects::update_last_modified($project_key);

            /*
             * Compute project status
             */
            projects::compute_project_status($project_key);

            $result = array(
                'error'         => false,
                'msg'           => "card_deleted"
            );
        } else {
            throw new Exception("Invalid Card");
        }

        return $result;
    }

    public function delete_all_cards($project_key)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        /*
         * Delete all cards linked to this project from database
         */
        $this->database->delete("project_cards", "`project` = '".$project_id."'");

        /*
         * Update project last modified timestamp
         */
        projects::update_last_modified($project_key);

        /*
         * Compute project status
         */
        projects::compute_project_status($project_key);

        $result = array(
            'error'         => false,
            'msg'           => "all_cards_deleted"
        );

        return $result;
    }

    public function edit_card($project_key, $card_id, $text, $tooltip)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        /*
         * Check if card exists
         */
        $this->database->select("project_cards", null, "`id` = '".$card_id."' AND `project` = '".$project_id."'");

        if ($this->database->row_count() == 1) {
            $data = array(
                'text'          => $text,
                'tooltip'       => $tooltip,
                'last_modified' => $GLOBALS['timestamp']
            );

            /*
             * Update card in database
             */
            $this->database->update("project_cards", "`id` = '".$card_id."'", $data);

            /*
             * Update project last modified timestamp
             */
            projects::update_last_modified($project_key);

            $result = array(
                'error'         => false,
                'msg'           => "card_edited"
            );
        } else {
            throw new Exception("Invalid Card");
        }

        return $result;
    }

    public function get_card($project_key, $card_id)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        $this->database->select("project_cards", null, "`id` = '".$card_id."' AND `project` = '".$project_id."'");

        if ($this->database->row_count() == 1) {
            $card = $this->database->result()[0];

            $result = array(
                'error'         => false,
                'card'          => $card
            );
        } else {
            throw new Exception("Invalid Card");
        }

        return $result;
    }

    public function export_cards($project_key)
    {
        /*
         * Get Project ID
         */
        $project_id = projects::get_project_id($project_key);

        $this->database->select("project_cards", null, "`project` = '".$project_id."'");
        $cards = $this->database->result();

        $export_data = "";

        foreach ($cards as $card) {
            $export_data .= $card['text'];

            if (!empty($card['tooltip'])) {
                $export_data .= "|".$card['tooltip'];
            }

            $export_data .= "\n";
        }

        $export_data = trim($export_data);

        return $export_data;
    }

    public function import_cards($project_key, $import_file)
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

            $text = trim($card[0]);
            $tooltip = "";

            if (isset($card[1])) {
                $tooltip = trim($card[1]);
            }

            if (!empty($text)) {
                $this->database->insert("project_cards", array(
                    'project'       => $project_id,
                    'text'          => $text,
                    'tooltip'       => $tooltip,
                    'created'       => $GLOBALS['timestamp'],
                    'last_modified' => 0
                ));
            }
        }

        /*
         * Update project last modified timestamp
         */
        projects::update_last_modified($project_key);

        /*
         * Compute project status
         */
        projects::compute_project_status($project_key);

        return array(
            'error'         => false,
            'msg'           => "cards_imported"
        );
    }

}