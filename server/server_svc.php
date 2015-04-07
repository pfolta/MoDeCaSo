<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/server_svc.php
 * Created:			2015-03-09
 * Last modified:	2015-04-07
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

require "vendor/autoload.php";

require "main/config.class.php";
require "main/controller.class.php";
require "main/database.class.php";
require "main/errorhandling.class.php";

require "data/participant_statuses.class.php";
require "data/project_statuses.class.php";
require "data/user_roles.class.php";
require "data/user_statuses.class.php";

require "tools/error.class.php";
require "tools/file.class.php";
require "tools/mail.class.php";
require "tools/url.class.php";

require "model/administration/user_management.class.php";
require "model/projects/cards.class.php";
require "model/projects/messages.class.php";
require "model/projects/participants.class.php";
require "model/projects/projects.class.php";
require "model/auth.class.php";

use data\participant_statuses;
use data\project_statuses;
use main\config;
use main\database;
use main\errorhandling;
use tools\mail;

try {
    /*
     * Print welcome message
     */
    print("\nMoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments\nServer Maintenance Service\n\n");

    /*
     * Check if service is run from command line (terminal)
     */
    if (php_sapi_name() != "cli") {
        die("Please run me from the console - not from a web browser!");
    }

    /*
     * Print start timestamp
     */
    print("Process Started: ".date("n/j/Y g:i:s A")."\n\n\n");

    /*
     * Initialize global timestamp variable
     */
    $timestamp = time();

    /*
     * Initialize config object, load and parse config file
     */
    print("Loading and parsing config file...\t\t\t\t\t");
    $config = config::get_instance();
    $config->load_config("config.ini");
    print("[Done]\n");

    /*
     * Set debug options
     */
    print("Setting debug options...\t\t\t\t\t\t");
    if ($config->get_config_value("main", "debug")) {
        errorhandling::set_error_handling(true);
    } else {
        errorhandling::set_error_handling(false);
    }
    print("[Done]\n");

    /*
     * Initialize database object, connect with credentials provided in config file
     */
    print("Connecting to database...\t\t\t\t\t\t");
    $database = database::get_instance();
    $database->connect(
        $config->get_config_value("database", "server"),
        $config->get_config_value("database", "username"),
        $config->get_config_value("database", "password"),
        $config->get_config_value("database", "database")
    );

    /*
     * Set database connection character set
     */
    $database->set_charset("UTF8");
    print("[Done]\n");

    /*
     * Print project list
     */
    print("\n\nPROJECT LIST\n\n");

    $database->select("projects", null);
    $projects = $database->result();

    $mask = "%5.5s     %-40.40s     %-10.10s     %-8.8s\n";
    printf($mask, "ID", "Title", "Key", "Status");
    print("------------------------------------------------------------------------------\n");

    foreach ($projects as $project) {
        printf($mask, $project['id'], $project['title'], $project['key'], project_statuses::$values[$project['status']]);
    }

    /*
     * Servicing projects
     */
    print("\n\nSERVICING PROJECTS...\n\n");

    foreach ($projects as $project) {
        print("Servicing Project [".$project['id'].": ".$project['key']."]\n");

        switch($project['status']) {
            case project_statuses::RUNNING:
                print("Project is running.\n");

                /*
                 * Print participant list
                 */
                print("\n\nPARTICIPANT LIST\n\n");

                $database->select("project_participants", null, "`project` = '".$project['id']."'", null, null, "`order` ASC");
                $participants = $database->result();

                $mask = "%5.5s     %-20.20s     %-20.20s     %-8.8s\n";
                printf($mask, "Order", "First Name", "Last Name", "Status");
                print("------------------------------------------------------------------------------\n");

                foreach ($participants as $participant) {
                    printf($mask, $participant['order'], $participant['first_name'], $participant['last_name'], participant_statuses::$values[$participant['status']]);
                }

                print("\n");

                /*
                 * Check for notified participants
                 */
                $notified = false;

                foreach ($participants as $participant) {
                    if ($participant['status'] == participant_statuses::NOTIFIED) {
                        print("Notified participant found: ".$participant['first_name']." ".$participant['last_name']." (".$participant['email'].").\n");
                        $notified = true;

                        /*
                         * Check if notified participant needs reminder email
                         */
                        if ($participant['notified'] + $project['reminder'] < $timestamp) {
                            print("Sending reminder email to participant ".$participant['first_name']." ".$participant['last_name']." (".$participant['email'].")...\n");

                            /*
                             * Retrieve email text
                             */
                            $database->select("project_messages", null, "`project` = '".$project['id']."' AND `type` = 'email_reminder'");
                            $message = $database->result()[0]['message'];

                            /*
                             * Send email
                             */
                            email_participant($project['key'], $message, "Card Sorting Experiment - Reminder", $participant['first_name'], $participant['last_name'], $participant['notified'] + $project['completion'], $participant['id'], $participant['email']);

                            /*
                             * Set participant status to REMINDED
                             */
                            $database->update("project_participants", "`id` = '".$participant['id']."'", array(
                                'status'    => participant_statuses::REMINDED,
                                'reminded'  => $timestamp
                            ));
                        }

                        break;
                    }
                }

                if (!$notified) {
                    print("No notified participants found.\n");

                    /*
                     * Check for reminded participants
                     */
                    $reminded = false;

                    foreach ($participants as $participant) {
                        if ($participant['status'] == participant_statuses::REMINDED) {
                            print("Reminded participant found: ".$participant['first_name']." ".$participant['last_name']." (".$participant['email'].").\n");
                            $reminded = true;

                            /*
                             * Check if reminded participant reached timeout
                             */
                            if ($participant['notified'] + $project['completion'] < $timestamp) {
                                print("Sending timeout email to participant ".$participant['first_name']." ".$participant['last_name']." (".$participant['email'].")...\n");

                                /*
                                 * Retrieve email text
                                 */
                                $database->select("project_messages", null, "`project` = '".$project['id']."' AND `type` = 'email_timeout'");
                                $message = $database->result()[0]['message'];

                                /*
                                 * Send email
                                 */
                                email_participant($project['key'], $message, "Card Sorting Experiment - Timeout", $participant['first_name'], $participant['last_name'], $participant['notified'] + $project['completion'], $participant['id'], $participant['email']);

                                /*
                                 * Check if there is a saved model that contains all cards
                                 */
                                $database->select("project_cards", null, "`project` = '".$project['id']."'");
                                $total_card_count = $database->row_count();

                                $database->select("experiment_models", null, "`project` = '".$project['id']."' AND `participant` = '".$participant['id']."'");
                                $saved_card_count = $database->row_count();

                                if ($saved_card_count == $total_card_count) {
                                    /*
                                     * Set participant status to COMPLETED
                                     */
                                    $database->update("project_participants", "`id` = '".$participant['id']."'", array(
                                        'status'    => participant_statuses::COMPLETED,
                                        'completed' => $timestamp
                                    ));
                                } else {
                                    /*
                                     * Set participant status to TIMEOUT
                                     */
                                    $database->update("project_participants", "`id` = '".$participant['id']."'", array(
                                        'status'    => participant_statuses::TIMEOUT,
                                        'timedout'  => $timestamp
                                    ));
                                }
                            }

                            break;
                        }
                    }

                    if (!$reminded) {
                        print("No reminded participants found.\n");

                        /*
                         * Notify next added participant
                         */
                        print("Notifying next added participant...\n");

                        for ($i = 0; $i < count($participants); $i++) {
                            if ($participants[$i]['status'] == participant_statuses::ADDED) {
                                print("Notifying participant ".$participants[$i]['first_name']." ".$participants[$i]['last_name']." (".$participants[$i]['email'].")...");

                                /*
                                 * Is seed participant?
                                 */
                                $is_seed = true;

                                if ($participants[$i]['order'] > 1) {
                                    for ($j = $participants[$i]['order'] - 1; $j >= 0; $j--) {
                                        print $participants[$j]['first_name'];

                                        if ($participants[$j]['status'] == participant_statuses::COMPLETED) {
                                            $is_seed = false;
                                        }
                                    }
                                }

                                /*
                                 * Save seed participant information in database
                                 */
                                if ($is_seed) {
                                    $database->update("projects", "`id` = '".$project['id']."'", array(
                                        'seed'  => $participants[$i]['id']
                                    ));
                                }

                                /*
                                 * Retrieve email text
                                 */
                                if ($is_seed) {
                                    $database->select("project_messages", null, "`project` = '".$project['id']."' AND `type` = 'sp_email_invitation'");
                                } else {
                                    $database->select("project_messages", null, "`project` = '".$project['id']."' AND `type` = 'email_invitation'");
                                }

                                $message = $database->result()[0]['message'];

                                /*
                                 * Send email
                                 */
                                email_participant($project['key'], $message, "Card Sorting Experiment - Invitation", $participants[$i]['first_name'], $participants[$i]['last_name'], $timestamp + $project['completion'], $participants[$i]['id'], $participants[$i]['email']);

                                /*
                                 * Set participant status to NOTIFIED
                                 */
                                $database->update("project_participants", "`id` = '".$participants[$i]['id']."'", array(
                                    'status'    => participant_statuses::NOTIFIED,
                                    'notified'  => $timestamp
                                ));

                                break;
                            }
                        }
                    }
                }

                break;
            default:
                print("Project is not currently running. No action needed.\n\n");
                break;
        }
    }

    /*
     * Print end timestamp
     */
    print("\n\nProcess Finished: ".date("n/j/Y g:i:s A")."\n");
} catch (Exception $exception) {
    print("\n\nA fatal error has occured: ".$exception->getMessage()."\n");
}

function email_participant($project_key, $message, $subject, $first_name, $last_name, $completion_timestamp, $uuid, $email)
{
    $config = config::get_instance();

    /*
     * Replace custom variables
     */
    $message = str_replace("%first_name%", $first_name, $message);
    $message = str_replace("%last_name%", $last_name, $message);
    $message = str_replace("%completion_timestamp%", date("n/j/Y g:i:s A", $completion_timestamp), $message);
    $message = str_replace("%experiment_link%", $config->get_config_value("main", "application_url")."/frontend/experiment/".$project_key."/".$uuid, $message);

    /*
     * Send email
     */
    $mail = new mail("MoDeCaSo <".$config->get_config_value("email", "sender_address").">", $first_name." ".$last_name." <".$email.">", $subject, $message);
    $mail->send();
}