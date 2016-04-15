/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /frontend/js/app/tools/url.js
 * Created:         2014-11-24
 * Author:          Peter Folta <mail@peterfolta.net>
 */

/**
 * go_to_url ( )
 *
 * Redirect browser to page
 *
 * @returns string
 */
go_to_url = function (url)
{
    window.location.href = "/frontend" + url;
};