/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/tools/toast.js
 * Created:			2014-11-19
 * Last modified:	2014-11-20
 * Author:			Peter Folta <mail@peterfolta.net>
 */

var toast;

function show_toast(title, text, type, loading_animation)
{
    if (toast) {
        toast.remove();
    }

    if (loading_animation) {
        toast = $("<div id='toast' class='" + type + "'><div class='banner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div><p class='title'>" + title + "</p><p class='text'>" + text + "</p></div>");
    } else {
        var icon;

        switch(type) {
            case "toast-danger":
                icon = "<span class='glyphicon glyphicon-remove-sign toast-icon'></span>";
                break;
            case "toast-default":
                icon = "<span class='glyphicon glyphicon-info-sign toast-icon'></span>";
                break;
            case "toast-info":
                icon = "<span class='glyphicon glyphicon-info-sign toast-icon'></span>";
                break;
            case "toast-primary":
                icon = "<span class='glyphicon glyphicon-info-sign toast-icon'></span>";
                break;
            case "toast-success":
                icon = "<span class='glyphicon glyphicon-ok-sign toast-icon'></span>";
                break;
            case "toast-warning":
                icon = "<span class='glyphicon glyphicon-exclamation-sign toast-icon'></span>";
                break;
        }

        toast = $("<div id='toast' class='" + type + "'><div class='banner'>" + icon + "</div><p class='title'>" + title + "</p><p class='text'>" + text + "</p></div>");
    }

    $("body").append(toast);
    toast.hide().fadeIn(500);
}

var toaster = {
    danger: function(title, text, loading_animation)
    {
        show_toast(title, text, "toast-danger", loading_animation);
    },
    default: function(title, text, loading_animation)
    {
        show_toast(title, text, "toast-default", loading_animation);
    },
    info: function(title, text, loading_animation)
    {
        show_toast(title, text, "toast-info", loading_animation);
    },
    primary: function(title, text, loading_animation)
    {
        show_toast(title, text, "toast-primary", loading_animation);
    },
    success: function(title, text, loading_animation)
    {
        show_toast(title, text, "toast-success", loading_animation);
    },
    warning: function(title, text, loading_animation)
    {
        show_toast(title, text, "toast-warning", loading_animation);
    }
};

function hide_toast(delay)
{
    toast.delay(delay).fadeOut(500).queue(function()
    {
        $(this).remove().dequeue();
    });
}