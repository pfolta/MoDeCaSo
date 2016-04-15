<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /server/controllers/projects/projects_controller.class.php
 * Created:         2014-11-24
 * Author:          Peter Folta <mail@peterfolta.net>
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

                $this->app->post(
                    "/delete_project",
                    array(
                        $this,
                        'delete_project'
                    )
                );

                $this->app->get(
                    "/get_project_list",
                    array(
                        $this,
                        'get_project_list'
                    )
                );

                $this->app->get(
                    "/get_project/:key",
                    array(
                        $this,
                        'get_project'
                    )
                );

                $this->app->get(
                    "/participant_results/:project_key/:participant",
                    array(
                        $this,
                        'get_results'
                    )
                );
            }
        );

        $this->app->group(
            "/projects/:project_key",
            function()
            {
                $this->app->post(
                    "/edit_project",
                    array(
                        $this,
                        'edit_project'
                    )
                );

                $this->app->post(
                    "/start_project",
                    array(
                        $this,
                        'start_project'
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

    public function delete_project()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $project_key = $this->request->key;

            $result = $this->model->delete_project($project_key);

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

    public function get_project($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->get_project($project_key);

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

    public function edit_project($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $completion = $this->request->completion;
            $reminder   = $this->request->reminder;

            if (is_int($completion) && is_int($reminder)) {
                $result = $this->model->edit_project($project_key, $completion, $reminder);

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
                    400,
                    array(
                        'error'         => true,
                        'msg'           => "Completion timestamp and reminder timestamp need to be integer values."
                    )
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

    public function start_project($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->start_project($project_key);

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

    public function get_results($project_key, $participant)
    {
        $this->app->render(
            200,
            $this->model->get_results($project_key, $participant)
        );
    }

}