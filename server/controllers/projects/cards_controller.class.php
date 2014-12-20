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
 * Last modified:	2014-12-20
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

                $this->app->post(
                    "/edit_card",
                    array(
                        $this,
                        'edit_card'
                    )
                );

                $this->app->get(
                    "/get_card/:card_id",
                    array(
                        $this,
                        'get_card'
                    )
                );

                $this->app->get(
                    "/export_cards/:project_key",
                    array(
                        $this,
                        'export_cards'
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
            $value = $this->request->value;

            $result = $this->model->add_card($key, $value);

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

    public function edit_card()
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $card_id = $this->request->card_id;
            $value = $this->request->value;

            $result = $this->model->edit_card($card_id, $value);

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

    public function get_card($card_id)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->get_card($card_id);

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

    public function export_cards($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $export = $this->model->export_cards($project_key);

            $this->app->response()->status(200);
            $this->app->response()->header("Content-Type", "text/plain");
            $this->app->response()->header("Content-Disposition", "attachment; filename=\"export.txt\"");
            $this->app->response()->header("Last-Modified", date("r"));
            $this->app->response()->header("Cache-Control", "cache, must-revalidate");
            $this->app->response()->body($export);

            $this->app->stop();
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