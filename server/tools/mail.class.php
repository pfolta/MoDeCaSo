<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /server/tools/mail.class.php
 * Created:         2014-11-17
 * Author:          Peter Folta <mail@peterfolta.net>
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

        $body = $this->body."\n\n---\nPlease note: This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.";

        return mail($this->recipient, $this->config->get_config_value("email", "subject_prefix")." ".$this->subject, $body, $headers);
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