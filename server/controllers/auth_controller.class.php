<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/controllers/auth.class.php
 * Created:			2014-11-04
 * Last modified:	2014-11-15
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace controllers;

use main\controller;

class auth_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/auth",
            function()
            {
                $this->app->post("/login", array($this, 'login'));
                $this->app->get("/logout", array($this, 'logout'));
                $this->app->post("/change_password", array($this, 'change_password'));
            }
        );
    }

    public function create_model()
    {
        $this->model = $this->auth;
    }

    public function login()
    {
        $username           = $this->request->username;
        $password           = $this->request->password;
        $client_application = $this->request_headers->get("X-Client-Application");

        $result = $this->auth->login($username, $password, $client_application);

        if (!$result['error']) {
            $this->app->render(
                200,
                $result
            );
        } else {
            $this->app->render(
                401,
                $result
            );
        }
    }

    public function logout()
    {
        $this->auth->logout($this->get_api_key());

        $this->app->render(
            200,
            array(
                'msg'        => "logout_successful"
            )
        );
    }

    public function change_password()
    {
        $old_password = $this->request->old_password;
        $new_password = $this->request->new_password;

        $result = $this->auth->change_password($this->get_api_key(), $old_password, $new_password);

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
    }

}