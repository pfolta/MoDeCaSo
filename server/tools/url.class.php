<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/tools/url.class.php
 * Created:         2014-11-11
 * Last modified:	2014-12-20
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace tools;

class url
{

    private static $path;
    private static $url;
    private static $local;
    private static $https;
    private static $port;
    private static $physical;
    private static $protocol;
    private static $method;

    /**
     * get_local ( )
     *
     * Returns the local part of the url, i.e. the request string for the current
     * web application
     *
     * @return string
     */
    public static function get_local()
    {
        if (!isset(self::$local) || empty(self::$local)) {
            $url = self::get_url();
            $path = self::get_path();

            $local = str_replace($path, "", $url);

            self::$local = $local;
        }

        return self::$local;
    }

    /**
     * get_url ( )
     *
     * Returns a string that contains the url the user requested for the current
     * page (does not contain url anchors)
     *
     * @return string
     */
    public static function get_url()
    {
        if (!isset(self::$url) || empty(self::$url)) {
            /*
             * Get protocol
             */
            if (self::is_https()) {
                $path = "https://";
            } else {
                $path = "http://";
            }

            /*
             * Server host part
             */
            $path .= $_SERVER['SERVER_NAME'];

            /*
             * Server port
             */
            if (self::is_https()) {
                if (self::get_port() != 443) {
                    $path .= ":".self::get_port();
                }
            } else {
                if (self::get_port() != 80) {
                    $path .= ":".self::get_port();
                }
            }

            /*
             * Add local part
             */
            $path .= $_SERVER['REQUEST_URI'];

            self::$url = $path;
        }

        return self::$url;
    }

    /**
     * is_https ( )
     *
     * Determines whether SSL/TLS encryption is active
     * Returns true if request is sent over https, false otherwise
     *
     * @return bool
     */
    public static function is_https()
    {
        if (!isset(self::$https) || empty(self::$https)) {
            /*
             * Check if $_SERVER['HTTPS'] is available and set to non zero value
             */
            if (isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS'])) {
                /*
                 * Using PHP with ISAPI on IIS will set $_SERVER['HTTPS'] to "off"
                 * if the request was not made through the HTTPS protocol
                 */
                if ($_SERVER['HTTPS'] == "off") {
                    self::$https = false;
                } else {
                    self::$https = true;
                }
            } else {
                self::$https = false;
            }
        }

        return self::$https;
    }

    /**
     * get_port ( )
     *
     * Returns the server port used to service the current request
     *
     * @return int
     */
    public static function get_port()
    {
        if (!isset(self::$port) || empty(self::$port)) {
            self::$port = intval($_SERVER['SERVER_PORT']);
        }

        return self::$port;
    }

    /**
     * get_path ( )
     *
     * Returns the path to this web application
     *
     * @return string
     */
    public static function get_path()
    {
        if (!isset(self::$path) || empty(self::$path)) {
            /*
             * Get protocol
             */
            if (self::is_https()) {
                $path = "https://";
            } else {
                $path = "http://";
            }

            /*
             * Server host part
             */
            $path .= $_SERVER['SERVER_NAME'];

            /*
             * Server port
             */
            if (self::is_https()) {
                if (self::get_port() != 443) {
                    $path .= ":".self::get_port();
                }
            } else {
                if (self::get_port() != 80) {
                    $path .= ":".self::get_port();
                }
            }

            /*
             * Add directory path
             */
            $path .= dirname($_SERVER['PHP_SELF']);

            /*
             * Remove trailing slash
             */
            $path = rtrim($path, "/");

            self::$path = $path;
        }

        return self::$path;
    }

    /**
     * get_physical_path ( )
     *
     * Returns the path to this web application on the webserver's filesystem
     *
     * @return string
     */
    public static function get_physical_path()
    {
        if (!isset(self::$physical) || empty(self::$physical)) {
            $physical = getcwd();

            self::$physical = $physical;
        }

        return self::$physical;
    }

    /**
     * get_protocol ( )
     *
     * Returns the protocol used to service the current request
     *
     * @return string
     */
    public static function get_protocol()
    {
        if (!isset(self::$protocol) || empty(self::$protocol)) {
            $protocol = $_SERVER['SERVER_PROTOCOL'];

            self::$protocol = $protocol;
        }

        return self::$protocol;
    }

    /**
     * get_method ( )
     *
     * Returns the HTTP request method of the current request
     *
     * @return string
     */
    public static function get_method()
    {
        if (!isset(self::$method) || empty(self::$method)) {
            $method = strtoupper($_SERVER['REQUEST_METHOD']);

            self::$method = $method;
        }

        return self::$method;
    }

}