<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/main/controller.class.php
 * Created:			2014-11-04
 * Last modified:	2014-11-24
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace main;

use model\auth;

use \Slim\Slim;

abstract class controller
{

    protected $app;
    protected $database;
    protected $auth;

    protected $model;

    protected $request;
    protected $request_headers;
    protected $response;

    public function __construct(Slim $slim = null)
    {
        if (!is_null($slim)) {
            $this->app = $slim;
        } else {
            $this->app = Slim::getInstance();
        }

        $this->database = database::get_instance();

        $this->auth = auth::get_instance();

        $this->request = json_decode($this->app->request()->getBody());
        $this->request_headers = $this->app->request()->headers();
        $this->response = $this->app->response();

        $this->register_routes();
        $this->create_model();
    }

    protected function get_api_key()
    {
        $api_key = $this->request_headers->get("X-API-Key");

        if (is_null($api_key) || empty($api_key)) {
            $this->app->render(
                401,
                array(
                    'error'         => true,
                    'msg'           => "missing_api_key"
                )
            );
        }

        return $api_key;
    }

    protected function get_user_id()
    {
        $api_key = $this->get_api_key();
        $this->database->select("user_tokens", "user", "`api_key` = '".$api_key."'");

        return $this->database->result()[0]['user'];
    }

    protected function get_user_role()
    {
        $user_id = $this->get_user_id();
        $this->database->select("users", "`role`", "`id` = '".$user_id."'");

        return $this->database->result()[0]['role'];
    }

    protected abstract function register_routes();

    protected abstract function create_model();

}