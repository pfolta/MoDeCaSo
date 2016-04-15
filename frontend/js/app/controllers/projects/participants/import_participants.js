/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/controllers/projects/participants/import_participants.js
 * Created:         2015-01-13
 * Last modified:	2015-01-13
 * Author:          Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "import_participants_controller",
    [
        "$rootScope",
        "$scope",
        "$http",
        "$upload",
        "session_service",
        "project_key",
        function($rootScope, $scope, $http, $upload, session_service, project_key)
        {
            $scope.project_key = project_key;

            $scope.flash = {
                show:       false,
                type:       null,
                message:    null
            };

            $scope.progressbar = {
                progress:   0,
                type:       null
            };

            $scope.import_participants = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#import_participants_submit_button").prop("disabled", true);
                $("#import_participants_cancel_button").prop("disabled", true);

                $scope.progressbar.progress = 0;
                $scope.progressbar.type     = null;

                $upload.upload({
                    method:             "post",
                    url:                "/server/projects/" + $scope.project_key + "/participants/import_participants",
                    headers:            {
                        "X-API-Key":    session_service.get("api_key")
                    },
                    file:               $scope.file,
                    fileFormDataName:   "import_file"
                }).progress(
                    function(event)
                    {
                        $scope.progressbar.progress = parseInt(100.0 * event.loaded / event.total);
                    }
                ).success(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#import_participants_submit_button").prop("disabled", false);
                        $("#import_participants_cancel_button").prop("disabled", false);

                        if (response.msg == "participants_imported") {
                            $scope.flash.show = true;
                            $scope.flash.type = "alert-success";
                            $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The file has been successfully imported.";

                            /*
                             * Change progress bar color to green
                             */
                            $scope.progressbar.type = "success";

                            /*
                             * Disable submit button and change Cancel button to show "Close" instead
                             */
                            $("#import_participants_submit_button").prop("disabled", true);
                            $("#import_participants_cancel_button").html("Close");

                            $rootScope.$broadcast("load_project");
                        } else {
                            $scope.flash.show = true;
                            $scope.flash.type = "alert-danger";
                            $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The file could not be imported.";

                            /*
                             * Change progress bar color to red
                             */
                            $scope.progressbar.type = "danger";

                            shake_element($("#import_participants_flash"));
                        }
                    }
                ).error(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#import_participants_submit_button").prop("disabled", false);
                        $("#import_participants_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The file could not be imported.";

                        /*
                         * Change progress bar color to red
                         */
                        $scope.progressbar.type = "danger";

                        shake_element($("#import_participants_flash"));
                    }
                );
            }
        }
    ]
);