/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/main.js
 * Created:			2014-10-19
 * Last modified:	2014-10-19
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "mainCtrl",
    [
        "$scope",
        function($scope)
        {
            $scope.main = {
                loggedin:   false,
                user:       {}
            }
        }
    ]
);