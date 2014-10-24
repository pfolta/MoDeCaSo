/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/user-management.js
 * Created:			2014-10-23
 * Last modified:	2014-10-24
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "userManagementCtrl",
    [
        "$scope",
        function($scope)
        {
            $scope.users = [
                {"id": 1, "username": "jdoe", "firstname": "Jane", "lastname": "Doe"},
                {"id": 2, "username": "jappleseed", "firstname": "John", "lastname": "Appleseed"},
                {"id": 3, "username": "msmith", "firstname": "Michelle", "lastname": "Smith"}
            ];
        }
    ]
);