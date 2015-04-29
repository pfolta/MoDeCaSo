<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/controllers/administration/server_maintenance_service_controller.class.php
 * Created:			2015-03-09
 * Last modified:	2015-03-09
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace controllers;

use main\controller;
use model\server_maintenance_service;

class server_maintenance_service_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/administration/server_maintenance_service",
            function()
            {
                $this->app->get(
                    "/run",
                    array(
                        $this,
                        'run'
                    )
                );
            }
        );
    }

    public function create_model()
    {
    }

    public function run()
    {
        $output = server_maintenance_service::run();
    }

}