/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/user-management.js
 * Created:			2014-10-23
 * Last modified:	2014-10-25
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "userManagementCtrl",
    [
        "$scope",
        function($scope)
        {
            $scope.filter = "";
            $scope.order_predicate = "id";
            $scope.order_reverse = false;

            $scope.users = [
                {"id": 1, "username": "jdoe", "first_name": "Jane", "last_name": "Doe", "email": "jdoe@example.com", "role": "administrator", "status": "active"},
                {"id": 2, "username": "jappleseed", "first_name": "John", "last_name": "Appleseed", "email": "jappleseed@example.com", "role": "administrator", "status": "active"},
                {"id": 3, "username": "msmith", "first_name": "Michelle", "last_name": "Smith", "email": "msmith@example.com", "role": "moderator", "status": "inactive"},
                {"id": 4, "username": "dallison", "first_name": "Daniel", "last_name": "Allison", "email": "dallison@example.com", "role": "moderator", "status": "active"}
            ];
        }
    ]
);