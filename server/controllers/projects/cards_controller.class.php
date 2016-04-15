<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/controllers/projects/cards_controller.class.php
 * Created:			2014-12-10
 * Last modified:	2015-01-14
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace controllers;

use data\user_roles;
use Exception;
use main\controller;
use model\cards;
use tools\error;
use tools\file;

class cards_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/projects/:project_key/cards",
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

                $this->app->get(
                    "/delete_all_cards",
                    array(
                        $this,
                        'delete_all_cards'
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
                    "/export_cards",
                    array(
                        $this,
                        'export_cards'
                    )
                );

                $this->app->post(
                    "/import_cards",
                    array(
                        $this,
                        'import_cards'
                    )
                );
            }
        );
    }

    public function create_model()
    {
        $this->model = new cards();
    }

    public function add_card($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $text       = $this->request->text;
            $tooltip    = $this->request->tooltip;

            if (preg_match("/\|/i", $text)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Card Text contains invalid character \"|\".");

                $error->send();
            }

            if (preg_match("/\|/i", $tooltip)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Card Tooltip contains invalid character \"|\".");

                $error->send();
            }

            $result = $this->model->add_card($project_key, $text, $tooltip);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function delete_card($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $card_id = $this->request->card_id;

            $result = $this->model->delete_card($project_key, $card_id);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function delete_all_cards($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->delete_all_cards($project_key);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function edit_card($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $card_id    = $this->request->card_id;
            $text       = $this->request->text;
            $tooltip    = $this->request->tooltip;

            if (preg_match("/\|/i", $text)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Card Text contains invalid character \"|\".");

                $error->send();
            }

            if (preg_match("/\|/i", $tooltip)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Card Tooltip contains invalid character \"|\".");

                $error->send();
            }

            $result = $this->model->edit_card($project_key, $card_id, $text, $tooltip);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function get_card($project_key, $card_id)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->get_card($project_key, $card_id);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function export_cards($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $export = $this->model->export_cards($project_key);

            $file = new file($this->app);
            $file->set_filename($project_key."_cards_export_".date("Ymdhis").".txt");
            $file->set_mimetype("text/plain");
            $file->set_file_contents($export);
            $file->serve();
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function import_cards($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->import_cards($project_key, $_FILES['import_file']);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

}