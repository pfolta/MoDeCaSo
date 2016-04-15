<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /server/controllers/experiment/experiment_controller.class.php
 * Created:         2015-03-31
 * Last modified:	2015-04-05
 * Author:          Peter Folta <mail@peterfolta.net>
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

                $this->app->get(
                    "/do_not_participate/:uuid",
                    array(
                        $this,
                        'do_not_participate'
                    )
                );

                $this->app->post(
                    "/save/:uuid",
                    array(
                        $this,
                        'save'
                    )
                );

                $this->app->post(
                    "/save_and_submit/:uuid",
                    array(
                        $this,
                        'save_and_submit'
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

    public function do_not_participate($project_key, $uuid)
    {
        $this->model->do_not_participate($uuid);

        $this->app->render(
            200,
            array(
                'error'     => false,
                'msg'       => "Participation canceled."
            )
        );
    }

    public function save($project_key, $uuid)
    {
        $data = $this->request->data;

        $this->model->save($project_key, $uuid, $data);

        $this->app->render(
            200,
            array(
                'error'     => false,
                'msg'       => "Data saved."
            )
        );
    }

    public function save_and_submit($project_key, $uuid)
    {
        $data = $this->request->data;

        $this->model->save_and_submit($project_key, $uuid, $data);

        $this->app->render(
            200,
            array(
                'error'     => false,
                'msg'       => "Data saved and participation completed."
            )
        );
    }

}