/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/controllers/administration/user_management/user_management.js
 * Created:			2015-03-09
 * Last modified:	2015-03-09
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "server_maintenance_service_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        function($scope, $rootScope, $http)
        {
            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };
        }
    ]
);