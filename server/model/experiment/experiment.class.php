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
 * Last modified:	2015-04-06
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

                /*
                 * Load all cards
                 */
                $this->database->select("project_cards", "`id`, `text`, `tooltip`", "`project` = '".$project_id."'");
                $cards = $this->database->result();

                $categories = array();

                if ($participant['last_save'] > 0) {
                    $load_from = $participant['id'];
                } else {
                    if (!$is_seed) {
                        $this->database->select("project_participants");
                        $participants = $this->database->result();

                        for ($i = $participant['order']; $i >= 1; $i--) {
                            if ($participants[$i]['status'] == participant_statuses::COMPLETED) {
                                $load_from = $participants[$i]['id'];
                                break;
                            }
                        }
                    }
                }

                /*
                 * Get Experiment data
                 * Categories
                 */
                $this->database->select("experiment_categories", "`id`, `text`", "`project` = '".$project_id."' AND `participant` = '".$load_from."'");
                $categories = $this->database->result();

                for ($i = 0; $i < count($categories); $i++) {
                    /*
                     * Get Cards in Category
                     */
                    $this->database->select("experiment_models", "`card`", "`project` = '".$project_id."' AND `participant` = '".$load_from."' AND `category` = '".$categories[$i]['id']."'");
                    $cards_in_category = $this->database->result();

                    $cards_model = array();

                    foreach ($cards_in_category as $card_in_category) {
                        $this->database->select("project_cards", "`id`, `text`, `tooltip`", "`id` = '".$card_in_category['card']."'");
                        $card = $this->database->result()[0];

                        for ($j = 0; $j < count($cards); $j++) {
                            if ($cards[$j]['id'] == $card_in_category['card']) {
                                array_splice($cards, $j, 1);
                            }
                        }

                        $cards_model[] = $card;
                    }

                    $categories[$i]['cards'] = $cards_model;
                }

                return array(
                    'proceed'           => true,
                    'message'           => $message,
                    'unsorted_cards'    => $cards,
                    'categories'        => $categories
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

    public function do_not_participate($participant)
    {
        $this->database->update("project_participants", "`id` = '".$participant."'", array(
            'status'    => participant_statuses::CANCELED
        ));

        return true;
    }

    public function save($project_key, $participant, $data)
    {
        $project_id = projects::get_project_id($project_key);

        /*
         * Delete all categories associated with this project and this participant
         */
        $this->database->delete("experiment_categories", "`project` = '".$project_id."' AND `participant` = '".$participant."'");

        /*
         * Delete all cards associated with this project and this participant
         */
        $this->database->delete("experiment_models", "`project` = '".$project_id."' AND `participant` = '".$participant."'");

        /*
         * Iterate over categories
         */
        foreach ($data as $category) {
            $category_text = $category->text;

            /*
             * Save category in database
             */
            $this->database->insert("experiment_categories", array(
                'project'       => $project_id,
                'participant'   => $participant,
                'text'          => $category_text,
                'created'       => $GLOBALS['timestamp']
            ));

            /*
             * Get category ID
             */
            $category_id = $this->database->get_insert_id();

            /*
             * Iterate over cards in category
             */
            foreach ($category->cards as $card) {
                $card_id = $card->id;

                /*
                 * Save card in database
                 */
                $this->database->insert("experiment_models", array(
                    'project'       => $project_id,
                    'participant'   => $participant,
                    'category'      => $category_id,
                    'card'          => $card_id,
                    'created'       => $GLOBALS['timestamp']
                ));
            }
        }

        /*
         * Update last save timestamp
         */
        $this->database->update("project_participants", "`id` = '".$participant."'", array(
            'last_save'     => $GLOBALS['timestamp']
        ));

        return true;
    }

    public function save_and_submit($project_key, $participant, $data) {
        /*
         * Invoke saving routine
         */
        $this->save($project_key, $participant, $data);

        /*
         * Set participant status to completed
         */
        $this->database->update("project_participants", "`id` = '".$participant."'", array(
            'status'        => participant_statuses::COMPLETED
        ));

        return true;
    }

}