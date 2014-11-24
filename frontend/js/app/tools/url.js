/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/tools/url.js
 * Created:			2014-11-24
 * Last modified:	2014-11-24
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
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