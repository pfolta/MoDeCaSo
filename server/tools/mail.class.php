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
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace tools;

use Exception;

class mail
{

    private $recipient;
    private $subject;
    private $body;
    private $headers;

    public function __construct($sender, $recipient, $subject, $body)
    {
        $this->recipient = $recipient;
        $this->subject = $subject;
        $this->body = $body;

        $this->headers = array(
            'From'          => $sender,
            'X-Mailer'      => "MoDeCaSo"
        );
    }

    public function header_set($key, $value)
    {
        $this->headers[$key] = $value;
    }

    public function header_get($key)
    {
        if ($this->header_is_set($key)) {
            throw new Exception("Header '".$key."' is not set.");
        }

        return $this->headers[$key];
    }

    public function header_is_set($key)
    {
        return (isset($this->headers[$key]));
    }

    public function header_un_set($key)
    {
        if (!$this->header_is_set($key)) {
            throw new Exception("Header '".$key."' is not set.");
        }

        unset($this->headers[$key]);
    }

    public function send()
    {
        $headers = $this->prepare_headers();

        return mail($this->recipient, $this->subject, $this->body, $headers);
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