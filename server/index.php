<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/index.php
 * Created:			2014-11-03
 * Last modified:	2014-11-11
 * Author:			Peter Folta <mail@peterfolta.net>
 */

require "vendor/autoload.php";

require "classes/auth.class.php";
require "classes/config.class.php";
require "classes/controller.class.php";
require "classes/database.class.php";
require "classes/errorhandling.class.php";

require "controllers/auth_controller.class.php";

use \Slim\Slim;

use classes\auth;
use classes\config;
use classes\database;
use classes\errorhandling;

use controllers\auth_controller;

try {
    /*
     * Create new instance of web application
     */
    $app = new Slim();
    $app->view(new JsonApiView());
    $app->add(new JsonApiMiddleware());

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
        $app->config("debug", true);
        $app->config("mode", "debug");
    } else {
        errorhandling::set_error_handling(false);
        $app->config("debug", false);
        $app->config("mode", "production");
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

    $auth = auth::get_instance();

    /*
     * Instantiate controllers
     */
    $auth_controller = new auth_controller();

    /*
     * Finally, handle requests
     */
    $app->run();
} catch (Exception $exception) {
    header($_SERVER['SERVER_PROTOCOL']." 500 Internal Server Error");
    header("Content-Type: application/json");

    $error = array(
        'error'     => true,
        'msg'       => "internal_application_error",
        'reason'    => $exception->getMessage(),
        'status'    => 500
    );

    print json_encode($error);
    exit;
}