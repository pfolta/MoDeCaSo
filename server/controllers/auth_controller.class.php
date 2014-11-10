<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/controllers/auth.class.php
 * Created:			2014-11-04
 * Last modified:	2014-11-10
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace controllers;

use classes\controller;

class auth_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/auth",
            function()
            {
                $this->app->post("/login", array($this, "login"));
                $this->app->get("/logout", array($this, "logout"));
                $this->app->post("/change_password", array($this, "change_password"));
            }
        );
    }

    public function login()
    {
        $username = $this->request->username;
        $password = $this->request->password;

        $login_result = $this->auth->login($username, $password);

        if (!$login_result['error']) {
            $this->app->render(
                200,
                $login_result
            );
        } else {
            $this->app->render(
                401,
                $login_result
            );
        }
    }

    public function logout()
    {
        $logout_result = $this->auth->logout();

        $this->app->render(200, array("msg" => "ok"));
    }

    public function change_password()
    {
        $username = $this->request->username;
        $new_password = $this->request->new_password;

        $change_password_result = $this->auth->change_password($username, $new_password);
    }

}