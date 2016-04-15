<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/main/controller.class.php
 * Created:			2014-11-04
 * Last modified:	2014-12-22
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace main;

use \Exception;
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

    /**
     * get_api_key ( )
     *
     * Returns API Key that accompanies the currently active request
     * Accepts API Key via
     *   - Header           "X-API-Key"
     *   - GET parameter    "api_key"
     *
     * @return $api_key     The API Key
     * @throws Exception    No API Key present
     */
    protected function get_api_key()
    {
        /*
         * Assume X-API-Key header is present
         */
        $api_key = $this->request_headers->get("X-API-Key");

        if (is_null($api_key) || empty($api_key)) {
            /*
             * Header not present or empty, check GET parameters
             */
            $api_key = @$_GET['api_key'];

            if (is_null($api_key) || empty($api_key)) {
                /*
                 * No API Key present
                 */
                throw new Exception("Missing API Key");
            }
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