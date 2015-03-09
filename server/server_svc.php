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
 * Last modified:	2015-03-09
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
    print("Process Started: " . date("n/j/Y g:i:s A") . "\n\n\n");

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

    $projects = $database->select("projects", null);
    $projects = $database->result();

    $mask = "%5.5s     %-40.40s     %-10.10s     %-8.8s\n";
    printf($mask, "ID", "Title", "Key", "Status");
    print("------------------------------------------------------------------------------\n");

    for ($i = 0; $i < count($projects); $i++) {
        printf($mask, $projects[$i]['id'], $projects[$i]['title'], $projects[$i]['key'], project_statuses::$values[$projects[$i]['status']]);
    }

    /*
     * Servicing projects
     */
    print("\n\nSERVICING PROJECTS...\n\n");

    for ($i = 0; $i < count($projects); $i++) {
        print("Servicing Project [".$projects[$i]['id'].": ".$projects[$i]['key']."]\n");

        switch($projects[$i]['status']) {
            case project_statuses::RUNNING:
                print("Project is running.\n");

                /*
                 * Print participant list
                 */
                print("\n\nPARTICIPANT LIST\n\n");

                $participants = $database->select("project_participants", null);
                $participants = $database->result();

                $mask = "%5.5s     %-20.20s     %-20.20s     %-8.8s\n";
                printf($mask, "ID", "First Name", "Last Name", "Status");
                print("------------------------------------------------------------------------------\n");

                for ($i = 0; $i < count($participants); $i++) {
                    printf($mask, $participants[$i]['id'], $participants[$i]['first_name'], $participants[$i]['last_name'], participant_statuses::$values[$participants[$i]['status']]);
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
    print("\n\nProcess Finished: " . date("n/j/Y g:i:s A") . "\n");
} catch (Exception $exception) {
    print("\n\nA fatal error has occured: ".$exception->getMessage()."\n");
}