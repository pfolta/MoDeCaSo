<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/tools/error.class.php
 * Created:			2015-01-14
 * Last modified:	2015-01-14
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace tools;

use Slim\Slim;

class error
{

    private $app;

    private $status;
    private $type;
    private $message;

    /**
     * __construct ( )
     *
     * Creates a new file object for file downloads
     *
     * @param Slim $slim                Slim instance
     */
    public function __construct(Slim $slim = null)
    {
        if (!is_null($slim)) {
            $this->app = $slim;
        } else {
            $this->app = Slim::getInstance();
        }
    }

    public function set_status($status)
    {
        $this->status = $status;
    }

    public function set_type($type)
    {
        $this->type = $type;
    }

    public function set_message($message)
    {
        $this->message = $message;
    }

    public function send()
    {
        $this->app->render(
            $this->status,
            array(
                'error'         => true,
                'status'        => $this->status,
                'type'          => $this->type,
                'message'       => $this->message
            )
        );

        $this->app->stop();
    }

}