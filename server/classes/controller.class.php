<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/classes/controller.class.php
 * Created:			2014-11-04
 * Last modified:	2014-11-11
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace classes;

use Exception;

use \Slim\Slim;

abstract class controller
{

    protected $app;
    protected $auth;

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

        $this->auth = auth::get_instance();

        $this->request = json_decode($this->app->request()->getBody());
        $this->request_headers = $this->app->request()->headers();
        $this->response = $this->app->response();

        $this->register_routes();
    }

    protected function get_api_key()
    {
        $api_key = $this->request_headers->get("X-API-Key");

        if (is_null($api_key) || empty($api_key)) {
            throw new Exception("No API Key present.");
        }

        return $api_key;
    }

    protected abstract function register_routes();

}