/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/experiment/experiment.js
 * Created:			2015-03-26
 * Last modified:	2015-04-05
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

            $scope.sortable_options = {
                "cursor":                   "url('/frontend/cur/closedhand.cur'), move",
                "forcePlaceholderSize":     true,
                "opacity":                  0.8,
                "helper":                   "clone",
                "connectWith":              ".sortable",
                "placeholder":              "card-sortable-highlight",
                "scroll":                   false,
                "appendTo":                 "body",
                "start":                    function(e, ui)
                {

                },
                "stop":                     function(e, ui)
                {
                    $scope.unsorted_cards.sort(sort_by("text", false, function(a){return a.toUpperCase()}));

                    for (var i = 0; i < $scope.categories.length; i++) {
                        $scope.categories[i].cards.sort(sort_by("text", false, function (a) {
                            return a.toUpperCase()
                        }));
                    }
                }
            };

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

                        $scope.unsorted_cards.sort(sort_by("text", false, function(a){return a.toUpperCase()}));

                        for (var i = 0; i < $scope.categories.length; i++) {
                            $scope.categories[i].cards.sort(sort_by("text", false, function(a){return a.toUpperCase()}));
                        }

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

            $scope.start_over = function()
            {
                for (var i = 0; i < $scope.categories.length; i++) {
                    for (var j = 0; j < $scope.categories[i].cards.length; j++) {
                        $scope.unsorted_cards.push($scope.categories[i].cards[j]);
                        $scope.unsorted_cards.sort(sort_by("text", false, function(a){return a.toUpperCase()}));
                    }
                }

                $scope.categories = [];
            };

            $scope.add_category = function()
            {
                $scope.add_category_text = null;

                var dialog = $modal.open(
                    {
                        templateUrl:    "/frontend/tpl/experiment/add_category.tpl",
                        scope:          $scope,
                        backdrop:       "static"
                    }
                );

                dialog.result.then(function(text) {
                    if (text) {
                        var category = {
                            "text":     text,
                            "cards":    []
                        };

                        $scope.categories.push(category);
                    }
                });
            };

            $scope.edit_category = function(category)
            {
                $scope.edit_category_text = category;

                var dialog = $modal.open(
                    {
                        templateUrl:    "/frontend/tpl/experiment/edit_category.tpl",
                        scope:          $scope,
                        backdrop:       "static"
                    }
                );

                dialog.result.then(function(text) {
                    if (text) {
                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.categories[i].text == category) {
                                $scope.categories[i].text = text;
                            }
                        }
                    }
                });
            };

            $scope.remove_category = function(category)
            {
                for (var i = 0; i < $scope.categories.length; i++) {
                    if ($scope.categories[i].text == category) {
                        for (var j = 0; j < $scope.categories[i].cards.length; j++) {
                            $scope.unsorted_cards.push($scope.categories[i].cards[j]);
                            $scope.unsorted_cards.sort(sort_by("text", false, function(a){return a.toUpperCase()}));
                        }

                        $scope.categories.splice(i, 1);
                    }
                }
            };

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