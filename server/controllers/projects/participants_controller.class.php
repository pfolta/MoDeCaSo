<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/controllers/projects/participants_controller.class.php
 * Created:			2015-01-13
 * Last modified:	2015-01-14
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace controllers;

use data\user_roles;
use Exception;
use main\controller;
use model\participants;
use tools\file;

class participants_controller extends controller
{

    public function register_routes()
    {
        $this->app->group(
            "/projects/:project_key/participants",
            function()
            {
                $this->app->post(
                    "/add_participant",
                    array(
                        $this,
                        'add_participant'
                    )
                );

                $this->app->post(
                    "/delete_participant",
                    array(
                        $this,
                        'delete_participant'
                    )
                );

                $this->app->get(
                    "/delete_all_participants",
                    array(
                        $this,
                        'delete_all_participants'
                    )
                );

                $this->app->post(
                    "/edit_participant",
                    array(
                        $this,
                        'edit_participant'
                    )
                );

                $this->app->get(
                    "/get_participant/:participant_id",
                    array(
                        $this,
                        'get_participant'
                    )
                );

                $this->app->get(
                    "/export_participants",
                    array(
                        $this,
                        'export_participants'
                    )
                );

                $this->app->post(
                    "/import_participants",
                    array(
                        $this,
                        'import_participants'
                    )
                );
            }
        );
    }

    public function create_model()
    {
        $this->model = new participants();
    }

    public function add_participant($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $first_name     = $this->request->first_name;
            $last_name      = $this->request->last_name;
            $email          = $this->request->email;

            if (preg_match("/\|/i", $first_name)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Participant First Name contains invalid character \"|\".");

                $error->send();
            }

            if (preg_match("/\|/i", $last_name)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Participant Last Name contains invalid character \"|\".");

                $error->send();
            }

            if (preg_match("/\|/i", $email)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Participant Email Address contains invalid character \"|\".");

                $error->send();
            }

            $result = $this->model->add_participant($project_key, $first_name, $last_name, $email);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function delete_participant($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $participant_id = $this->request->participant_id;

            $result = $this->model->delete_participant($project_key, $participant_id);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function delete_all_participants($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->delete_all_participants($project_key);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function edit_participant($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $participant_id = $this->request->participant_id;
            $first_name     = $this->request->first_name;
            $last_name      = $this->request->last_name;
            $email          = $this->request->email;

            if (preg_match("/\|/i", $first_name)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Participant First Name contains invalid character \"|\".");

                $error->send();
            }

            if (preg_match("/\|/i", $last_name)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Participant Last Name contains invalid character \"|\".");

                $error->send();
            }

            if (preg_match("/\|/i", $email)) {
                $error = new error($this->app);
                $error->set_status(400);
                $error->set_type("Bad Request");
                $error->set_message("Participant Email Address contains invalid character \"|\".");

                $error->send();
            }

            $result = $this->model->edit_participant($project_key, $participant_id, $first_name, $last_name, $email);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function get_participant($project_key, $participant_id)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->get_participant($project_key, $participant_id);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function export_participants($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $export = $this->model->export_participants($project_key);

            $file = new file($this->app);
            $file->set_filename($project_key."_participants_export_".date("Ymdhis").".txt");
            $file->set_mimetype("text/plain");
            $file->set_file_contents($export);
            $file->serve();
        } else {
            throw new Exception("Insufficient rights");
        }
    }

    public function import_participants($project_key)
    {
        if ($this->auth->authenticate($this->get_api_key(), user_roles::MODERATOR)) {
            $result = $this->model->import_participants($project_key, $_FILES['import_file']);

            $this->app->render(
                200,
                $result
            );
        } else {
            throw new Exception("Insufficient rights");
        }
    }

}