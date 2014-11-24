<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/controllers/administration/user_management_controller.class.php
 * Created:			2014-11-12
 * Last modified:	2014-11-24
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace controllers;

use Exception;

use data\user_roles;
use main\controller;
use model\user_management;

class user_management_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/administration/user_management",
            function()
            {
                $this->app->post(
                    "/add_user",
                    array(
                        $this,
                        'add_user'
                    )
                );

                $this->app->post(
                    "/delete_user",
                    array(
                        $this,
                        'delete_user'
                    )
                );

                $this->app->post(
                    "/edit_user",
                    array(
                        $this,
                        'edit_user'
                    )
                );

                $this->app->get(
                    "/get_user/:username",
                    array(
                        $this,
                        'get_user'
                    )
                );

                $this->app->get(
                    "/get_user_list",
                    array(
                        $this,
                        'get_user_list'
                    )
                );
            }
        );
    }

    public function create_model()
    {
        $this->model = new user_management();
    }

    public function add_user()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::ADMINISTRATOR)) {
            $username = $this->request->username;
            $first_name = $this->request->first_name;
            $last_name = $this->request->last_name;
            $email = $this->request->email;
            $role = $this->request->role;
            $status = $this->request->status;

            $result = $this->model->add_user($username, $first_name, $last_name, $email, $role, $status);

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

    public function delete_user()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::ADMINISTRATOR)) {
            $username = $this->request->username;

            $result = $this->model->delete_user($username);

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

    public function edit_user()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::ADMINISTRATOR)) {
            $username = $this->request->username;
            $first_name = $this->request->first_name;
            $last_name = $this->request->last_name;
            $email = $this->request->email;
            $role = $this->request->role;
            $status = $this->request->status;

            try {
                $password = $this->request->password;
            } catch (Exception $exception) {
                $password = null;
            }

            $result = $this->model->edit_user($username, $password, $first_name, $last_name, $email, $role, $status);

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

    public function get_user($username)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::ADMINISTRATOR)) {
            $result = $this->model->get_user($username);

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

    public function get_user_list()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::ADMINISTRATOR)) {
            $users = array(
                'users'         => $this->model->get_user_list()
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