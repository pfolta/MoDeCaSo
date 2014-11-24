<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/tools/mail.class.php
 * Created:			2014-11-17
 * Last modified:	2014-11-17
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace tools;

use Exception;
use main\config;

class mail
{

    private $config;

    private $recipient;
    private $subject;
    private $body;
    private $headers;

    public function __construct($sender, $recipient, $subject, $body)
    {
        $this->config = config::get_instance();

        $this->recipient = $recipient;
        $this->subject = $subject;
        $this->body = $body;

        $this->headers = array(
            'From'          => $sender,
            'X-Mailer'      => "MoDeCaSo"
        );
    }

    public function get_subject()
    {
        return $this->subject;
    }

    public function set_subject($subject)
    {
        $this->subject = $subject;
    }

    public function set_header($key, $value)
    {
        $this->headers[$key] = $value;
    }

    public function get_header($key)
    {
        if ($this->is_set_header($key)) {
            throw new Exception("Header '".$key."' is not set.");
        }

        return $this->headers[$key];
    }

    public function is_set_header($key)
    {
        return (isset($this->headers[$key]));
    }

    public function un_set_header($key)
    {
        if (!$this->is_set_header($key)) {
            throw new Exception("Header '".$key."' is not set.");
        }

        unset($this->headers[$key]);
    }

    public function send()
    {
        $headers = $this->prepare_headers();

        return mail($this->recipient, $this->config->get_config_value("email", "subject_prefix").$this->subject, $this->body, $headers);
    }

    private function prepare_headers()
    {
        $header_string = "";

        foreach ($this->headers as $key => $value) {
            $header_string .= $key.": ".$value."\r\n";
        }

        return $header_string;
    }

}