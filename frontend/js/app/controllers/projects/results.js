/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/controllers/projects/results.js
 * Created:			2015-05-02
 * Last modified:	2015-05-02
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "project_results_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "key",
        function($scope, $rootScope, $http, session_service, key)
        {
            $scope.key = key;

            $scope.participants_collapse = false;

            $scope.get_participant_status_label_class = function (status)
            {
                switch (status) {
                    case "ADDED":
                        return "label-default";
                    case "NOTIFIED":
                        return "label-primary";
                    case "COMPLETED":
                        return "label-success";
                    case "REMINDED":
                        return "label-warning";
                    case "TIMEOUT":
                    case "CANCELED":
                        return "label-danger";
                }
            };

            $scope.get_seed = function()
            {
                for (var i = 0; i < $scope.participants.length; i++) {
                    if ($scope.participants[i].id == $scope.project.seed) {
                        return $scope.participants[i].first_name + " " + $scope.participants[i].last_name;
                    }
                }
            };

            $scope.load_results = function()
            {
                $http({
                    method:     "get",
                    url:        "/server/projects/get_project/" + $scope.key
                }).then(
                    function(response)
                    {
                        $scope.project                  = response.data.project;
                        $scope.participants             = response.data.participants;
                    }
                );
            };

            $scope.$on(
                "load_results",
                function(event, args)
                {
                    $scope.load_results();
                }
            );

            $rootScope.$broadcast("load_results");
        }
    ]
);