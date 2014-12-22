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
 * Last modified:	2014-12-22
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace controllers;

use data\user_roles;
use main\controller;
use model\cards;
use tools\file;

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

            $file = new file($this->app);
            $file->set_filename($project_key."_card_export_".date("Ymdhis").".txt");
            $file->set_mimetype("text/plain");
            $file->set_file_contents($export);
            $file->serve();
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