/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/main.js
 * Created:			2014-10-18
 * Last modified:	2014-10-20
 * Author:			Peter Folta <mail@peterfolta.net>
 */

var services = angular.module(
    "services",
    [
    ]
);

var controllers = angular.module(
    "controllers",
    [
    ]
);

var webapp = angular.module(
    "webapp",
    [
        "services",
        "controllers",
        "ui.router",
        "ngAnimate"
    ]
);