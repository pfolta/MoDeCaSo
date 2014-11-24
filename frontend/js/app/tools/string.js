/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/tools/string.js
 * Created:			2014-11-03
 * Last modified:	2014-11-19
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
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
        "Uh oh!"
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