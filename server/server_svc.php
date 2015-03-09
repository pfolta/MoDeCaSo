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

use data\project_statuses;
use main\config;
use main\database;
use main\errorhandling;

/*
 * Print welcome message
 */
print(
"
MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
Server Maintenance Service

");

/*
 * Check if service is run from command line (terminal)
 */
if (php_sapi_name() != "cli") {
    die("Please run me from the console - not from a web browser!");
}

/*
 * Print start timestamp
 */
print(
    "Process Started: ".date("n/j/Y g:i:s A")."

");

/*
 * Initialize global timestamp variable
 */
$timestamp = time();

/*
 * Initialize config object, load and parse config file
 */
$config = config::get_instance();
$config->load_config("config.ini");

/*
 * Set debug options
 */
if ($config->get_config_value("main", "debug")) {
    errorhandling::set_error_handling(true);
} else {
    errorhandling::set_error_handling(false);
}

/*
 * Initialize database object, connect with credentials provided in config file
 */
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

/*
 * Print project list
 */
print(
    "Projects:

");

$projects = $database->select("projects", null);
$projects = $database->result();

$mask = "%5.5s     %-40.40s     %-10.10s     %-8.8s\n";
printf($mask, "ID", "Title", "Key", "Status");
print("------------------------------------------------------------------------------
");

for ($i = 0; $i < count($projects); $i++) {
    printf($mask, $projects[$i]['id'], $projects[$i]['title'], $projects[$i]['key'], project_statuses::$values[$projects[$i]['status']]);
}

print("
");

/*
 * Print end timestamp
 */
print(
    "Process Finished: ".date("n/j/Y g:i:s A")."

"
);