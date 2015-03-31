<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/controllers/experiment/experiment_controller.class.php
 * Created:			2015-03-31
 * Last modified:	2015-03-31
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace controllers;

use main\controller;
use model\experiment;

class experiment_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/experiment/:project_key",
            function()
            {
                $this->app->get(
                    "/init/:uuid",
                    array(
                        $this,
                        'init'
                    )
                );
            }
        );
    }

    public function create_model()
    {
        $this->model = new experiment();
    }

    public function init($project_key, $uuid)
    {
        $this->app->render(
            200,
            $this->model->init($project_key, $uuid)
        );
    }

}