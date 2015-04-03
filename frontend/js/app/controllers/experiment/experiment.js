/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/experiment/experiment.js
 * Created:			2015-03-26
 * Last modified:	2015-04-03
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "experiment_controller",
    [
        "$scope",
        "$http",
        "$modal",
        "project_key",
        "uuid",
        function($scope, $http, $modal, project_key, uuid)
        {
            $scope.project_key = project_key;
            $scope.uuid = uuid;

            $http({
                method:     "get",
                url:        "/server/experiment/" + $scope.project_key + "/init/" + $scope.uuid
            }).then(
                function(response)
                {
                    if (response.data.proceed) {
                        $scope.message          = response.data.message.replace(/\n/gi, "<br>");
                        $scope.categories       = response.data.categories;
                        $scope.unsorted_cards   = response.data.unsorted_cards;

                        $scope.welcome = $modal.open(
                            {
                                templateUrl:    "/frontend/tpl/experiment/welcome.tpl",
                                scope:          $scope,
                                backdrop:       "static"
                            }
                        );
                    } else {
                        $modal.open(
                            {
                                templateUrl:    "/frontend/tpl/experiment/noproceed.tpl",
                                backdrop:       "static"
                            }
                        );
                    }
                }
            );

            $scope.do_not_participate = function()
            {
                $http({
                    method:     "get",
                    url:        "/server/experiment/" + $scope.project_key + "/do_not_participate/" + $scope.uuid
                }).then(
                    function(response)
                    {
                        $scope.welcome.close();

                        $modal.open(
                            {
                                templateUrl:    "/frontend/tpl/experiment/do_not_participate.tpl",
                                backdrop:       "static"
                            }
                        );
                    }
                );
            };
        }
    ]
);