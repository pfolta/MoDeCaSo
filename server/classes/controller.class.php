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
 * Last modified:	2014-11-05
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace classes;

use \Slim\Slim;

abstract class controller
{

    protected $app;
    protected $auth;

    protected $request;
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
        $this->response = $this->app->response();

        $this->register_routes();
    }

    public abstract function register_routes();

}