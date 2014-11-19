/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/tools/toast.js
 * Created:			2014-11-19
 * Last modified:	2014-11-19
 * Author:			Peter Folta <mail@peterfolta.net>
 */

var toast;

function show_toast(message)
{
    toast = $("<div id='toast'>" + message + "<div class='bounce3'></div><div class='bounce2'></div><div class='bounce1'></div></div>");

    $("body").append(toast);
    toast.hide().fadeIn(500);
}

function hide_toast()
{
    toast.fadeOut(500).queue(function()
    {
        $(this).remove().dequeue();
    });
}