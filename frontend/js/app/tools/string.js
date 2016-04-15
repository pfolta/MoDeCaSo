/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /frontend/js/app/tools/string.js
 * Created:         2014-11-03
 * Last modified:	2015-01-01
 * Author:          Peter Folta <mail@peterfolta.net>
 */

/**
 * get_error_title ( )
 *
 * Returns a random error title
 *
 * @returns string
 */
function get_error_title()
{
    var error_titles = [
        "Oh snap!",
        "Oh oh!",
        "Oh no!",
        "D’oh!",
        "Uh oh!",
        "Whoops!"
    ];

    return error_titles[Math.floor(Math.random() * error_titles.length)].toString();
}

/**
 * get_success_title ( )
 *
 * Returns a random success title
 *
 * @returns string
 */
function get_success_title()
{
    var success_titles = [
        "Well done!",
        "Great!",
        "Nice!",
        "Awesome!"
    ];

    return success_titles[Math.floor(Math.random() * success_titles.length)].toString();
}