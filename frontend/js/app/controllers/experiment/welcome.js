/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/experiment/welcome.js
 * Created:			2015-03-26
 * Last modified:	2015-03-26
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "experiment_welcome_controller",
    [
        "$scope",
        "project_key",
        "uuid",
        function($scope, project_key, uuid)
        {
            $scope.project_key = project_key;
            $scope.uuid = uuid;

            $scope.load_message = function()
            {
                $scope.message = null;

                $http({
                    method:     "get",
                    url:        "/server/projects/" + $scope.project_key + "/messages/get_welcome_message/" + $scope.uuid
                }).then(
                    function(response)
                    {
                        $scope.flash.show = false;

                        $scope.message = response.data.message;
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error loading message.";

                        shake_element($("#edit_message_flash"));
                    }
                );
            }
        }
    ]
);