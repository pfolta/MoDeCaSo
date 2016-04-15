/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/controllers/experiment/participant_results.js
 * Created:         2015-05-02
 * Last modified:	2015-05-02
 * Author:          Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "participant_results_controller",
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

            $scope.categories = [];

            $scope.$watch(
                function()
                {
                    return $scope.categories.length;
                },

                function(value)
                {
                    $(".category-wrapper").css("min-width", (value * 239) + "px");
                }
            );

            $scope.get_tooltip_class = function (tooltip)
            {
                if (!tooltip) {
                    return "dontshow";
                }
            };

            $http({
                method:     "get",
                url:        "/server/projects/participant_results/" + $scope.project_key + "/" + $scope.uuid
            }).then(
                function(response)
                {
                    $scope.participant      = response.data.participant;
                    $scope.categories       = response.data.categories;

                    for (var i = 0; i < $scope.categories.length; i++) {
                        $scope.categories[i].cards.sort(sort_by("text", false, function(a){return a.toUpperCase()}));
                    }
                }
            );
        }
    ]
);