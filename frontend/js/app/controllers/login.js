/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/login.js
 * Created:			2014-10-19
 * Last modified:	2014-10-19
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "loginCtrl",
    [
        "$scope",
        function($scope)
        {
            $scope.login = function()
            {
                if ($scope.login.username == "dev" && $scope.login.password == "dev") {


                    window.location.hash = "/dashboard";
                } else {
                    /*
                     * Shake login form
                     */
                    $("#login_form").addClass("shake").delay(500).queue(function()
                    {
                        $(this).removeClass("shake").dequeue();
                    });

                    /*
                     * Add error class to input fields
                     */
                    $("#login_username_group").toggleClass("has-error", true);
                    $("#login_password_group").toggleClass("has-error", true);
                }
            }
        }
    ]
);