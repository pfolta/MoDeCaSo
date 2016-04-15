<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/controllers/projects/messages_controller.class.php
 * Created:         2015-01-17
 * Last modified:	2015-01-17
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace controllers;

use data\user_roles;
use Exception;
use main\controller;
use model\messages;

class messages_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/projects/:project_key/messages",
            function()
            {
                $this->app->get(
                    "/get_message/:type",
                    array(
                        $this,
                        'get_message'
                    )
                );

                $this->app->get(
                    "/get_welcome_message/:uuid",
                    array(
                        $this,
                        'get_welcome_message'
                    )
                );

                $this->app->post(
                    "/edit_message",
                    array(
                        $this,
                        'edit_message'
                    )
                );
            }
        );
    }

    public function create_model()
    {
        $this->model = new messages();
    }

    public function get_message($project_key, $type)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->get_message($project_key, $type);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function get_welcome_message($project_key, $uuid)
    {
        $result = $this->model->get_welcome_message($project_key, $uuid);

        $this->app->render(
            200,
            $result
        );
    }

    public function edit_message($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $type       = $this->request->type;
            $message    = $this->request->message;

            $result = $this->model->edit_message($project_key, $type, $message);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

}