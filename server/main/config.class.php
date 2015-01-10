<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/main/config.class.php
 * Created:			2014-11-03
 * Last modified:	2014-11-12
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace main;

use Exception;

class config
{

    private static $instance = null;

    private $configfile = null;
    private $config;

    public static function get_instance()
    {
        if (self::$instance == null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
    }

    private function __clone()
    {
    }

    /**
     * load_config ( )
     *
     * Loads and parses specified config file
     *
     * @param string $configfile
     */
    public function load_config($configfile)
    {
        $this->configfile = $configfile;
        $this->parse_config();
    }

    /**
     * parse_config ( )
     *
     * Parses the given File in $configfile into a $config array
     */
    private function parse_config()
    {
        if (is_null($this->configfile)) {
            throw new Exception("No config file loaded.");
        }

        $this->config = parse_ini_file($this->configfile, true);
    }

    /**
     * get_config_value ( )
     *
     * Reads and returns a config value for a given category and key if $category
     * $key are valid
     *
     * @param string $category
     * @param string $key
     *
     * @return mixed
     *
     * @throws Exception
     */
    public function get_config_value($category, $key)
    {
        if (is_null($this->configfile)) {
            throw new Exception("No config file loaded.");
        }

        if (array_key_exists($category, $this->config)) {
            if (array_key_exists($key, $this->config[$category])) {
                $value = $this->config[$category][$key];

                /*
                 * Return "real" boolean values
                 */
                if (strtolower($value) == "true") {
                    return true;
                }

                if (strtolower($value) == "false") {
                    return false;
                }

                return $value;
            } else {
                throw new Exception("'".$key."' is not a valid key.");
            }
        } else {
            throw new Exception("'".$category."' is not a valid category.");
        }
    }

}