/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/tools/animations.js
 * Created:			2014-11-03
 * Last modified:	2014-11-03
 * Author:			Peter Folta <mail@peterfolta.net>
 */

function shake_element(element)
{
    element.addClass("shake").delay(500).queue(function()
    {
        $(this).removeClass("shake").dequeue();
    });
}