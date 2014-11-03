<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/main/app.class.php
 * Created:			2014-11-03
 * Last modified:	2014-11-03
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace main;

class app
{

    public $auth;
    public $config;
    public $database;
    public $session;

    public function run()
    {
        ob_start();

        $this->config = new config("config.ini");

        errorhandling::set_error_handling($this->config->get_config_value("main", "debug"));

        $this->database = new database(
            $this->config->get_config_value("database", "server"),
            $this->config->get_config_value("database", "username"),
            $this->config->get_config_value("database", "password"),
            $this->config->get_config_value("database", "database")
        );

        print "EXEC!";

        ob_end_flush();
    }

}