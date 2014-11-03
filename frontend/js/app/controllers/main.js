/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/main.js
 * Created:			2014-10-19
 * Last modified:	2014-10-27
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "mainCtrl",
    [
        "$scope",
        "sessionService",
        "$sce",
        "$modal",
        function($scope, sessionService, $sce, $modal)
        {
            $scope.main = {
                loggedin:   sessionService.get("loggedin"),
                user:       {
                    username:   sessionService.get("username")
                }
            };

            $scope.change_password = function()
            {
                var username = $scope.main.user.username;
                var old_password = $scope.change_password.old_password;
                var new_password = $scope.change_password.new_password;
                var confirm_new_password = $scope.change_password.confirm_new_password;

                alert("Change Password Event Fired:\n\nUsername: " + username + "\nOld Password: " + old_password + "\nNew Password: " + new_password + "\nConfirm New Password: " + confirm_new_password);

                $scope.$close();
            }

            $scope.html_save = function(text)
            {
                return $sce.trustAsHtml(text);
            };

            $scope.show_change_password_dialog = function()
            {
                $modal.open(
                    {
                        templateUrl:    "/frontend/tpl/change-password.tpl",
                        backdrop:       "static"
                    }
                );
            }

            $scope.show_about_dialog = function()
            {
                $modal.open(
                    {
                        templateUrl:    "/frontend/tpl/about.tpl",
                        backdrop:       "static",
                        size:           "lg"
                    }
                );
            }
        }
    ]
);