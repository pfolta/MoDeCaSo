<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/controllers/projects/cards_controller.class.php
 * Created:			2014-12-10
 * Last modified:	2014-12-17
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace controllers;

use data\user_roles;
use main\controller;
use model\cards;

class cards_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/projects/cards",
            function()
            {
                $this->app->post(
                    "/add_card",
                    array(
                        $this,
                        'add_card'
                    )
                );

                $this->app->post(
                    "/delete_card",
                    array(
                        $this,
                        'delete_card'
                    )
                );
            }
        );
    }

    public function create_model()
    {
        $this->model = new cards();
    }

    public function add_card()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $key = $this->request->key;
            $card = $this->request->card;

            $result = $this->model->add_card($key, $card);

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

    public function delete_card()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $card_id = $this->request->card_id;

            $result = $this->model->delete_card($card_id);

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

}