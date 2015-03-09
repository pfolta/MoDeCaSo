<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
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
                    "/execute",
                    array(
                        $this,
                        'execute'
                    )
                );
            }
        );
    }

    public function create_model()
    {
    }

    public function execute()
    {
        $output = server_maintenance_service::execute();
    }

}