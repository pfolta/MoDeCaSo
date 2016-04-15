<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/main/errorhandling.class.php
 * Created:			2014-11-03
 * Last modified:	2014-11-12
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace main;

use Exception;

class errorhandling
{

    /**
     * set_error_handling ( )
     *
     * Set error handling settings for php execution
     *
     * @param bool $debug
     *
     * @throws Exception
     */
    public static function set_error_handling($debug)
    {
        /*
         * Turn on error reporting
         */
        error_reporting(E_ALL);

        /*
         * If in debug mode, display error messages to user,
         * otherwise hide any error messages
         */

        if (is_bool($debug)) {
            if ($debug) {
                ini_set("display_errors", "1");
            } else {
                ini_set("display_errors", "0");
            }

            return;
        }

        throw new Exception("'".$debug."' is not a valid bool value");
    }

}