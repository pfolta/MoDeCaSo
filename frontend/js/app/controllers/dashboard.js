/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/dashboard.js
 * Created:			2015-01-15
 * Last modified:	2015-01-15
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "dashboard_controller",
    [
        "$scope",
        "$rootScope",
        "session_service",
        function($scope, $rootScope, session_service)
        {
            $scope.session_information_collapse = true;

            $scope.logged_in_since              = session_service.get("api_key_granted");
            $scope.last_login_at                = session_service.get("last_login_at");
            $scope.last_login_from_ip           = session_service.get("last_login_from_ip");
            $scope.last_login_from_hostname     = session_service.get("last_login_from_hostname");
            $scope.last_login_from_application  = session_service.get("last_login_from_application");
        }
    ]
);