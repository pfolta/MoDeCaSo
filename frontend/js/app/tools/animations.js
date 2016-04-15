/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/tools/animations.js
 * Created:			2014-11-03
 * Last modified:	2014-11-03
 * Author:          Peter Folta <mail@peterfolta.net>
 */

function shake_element(element)
{
    element.addClass("shake").delay(500).queue(function()
    {
        $(this).removeClass("shake").dequeue();
    });
}