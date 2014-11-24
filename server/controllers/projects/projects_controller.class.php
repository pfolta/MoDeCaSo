<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/controllers/projects/projects_controller.class.php
 * Created:			2014-11-24
 * Last modified:	2014-11-24
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace controllers;

use data\user_roles;
use main\controller;
use model\projects;

class projects_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/projects",
            function()
            {
                $this->app->post(
                    "/create_project",
                    array(
                        $this,
                        'create_project'
                    )
                );

                $this->app->get(
                    "/get_project_list",
                    array(
                        $this,
                        'get_project_list'
                    )
                );
            }
        );
    }

    public function create_model()
    {
        $this->model = new projects();
    }

    public function create_project()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $title = $this->request->title;
            $key = $this->request->key;
            $lead = $this->get_user_id();

            $result = $this->model->create_project($title, $key, $lead);

            if (!$result['error']) {
                $this->app->render(
                    200,
                    $result
                );
            } else {
                $this->app->render(
                    400,
                    $result
                );
            }
        } else {
            $this->app->render(
                403,
                array(
                    'error'         => true,
                    'msg'           => "insufficient_rights"
                )
            );
        }
    }

    public function get_project_list()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            if ($this->get_user_role() == user_roles::MODERATOR) {
                $project_list = $this->model->get_project_list($this->get_user_id());
            } else {
                $project_list = $this->model->get_project_list();
            }

            $users = array(
                'projects'         => $project_list
            );

            $this->app->render(
                200,
                $users
            );
        } else {
            $this->app->render(
                403,
                array(
                    'error'         => true,
                    'msg'           => "insufficient_rights"
                )
            );
        }
    }

}