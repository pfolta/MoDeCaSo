/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/filters/capitalize-words.js
 * Created:			2014-10-25
 * Last modified:	2014-10-25
 * Author:			Peter Folta <mail@peterfolta.net>
 */

filters.filter(
    "capitalizeWords",
    [
        function()
        {
            return function(input)
            {
                return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : "";
            }
        }
    ]
);