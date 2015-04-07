/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/experiment/experiment.js
 * Created:			2015-03-26
 * Last modified:	2015-04-07
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

            $scope.dirty = false;

            $scope.$watch(
                function()
                {
                    return $scope.dirty;
                },

                function(dirty)
                {
                    if (dirty) {
                        show_unload_prompt = true;
                    } else {
                        show_unload_prompt = false;
                    }
                }
            );

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

                    $scope.dirty = true;
                }
            };

            $http({
                method:     "get",
                url:        "/server/experiment/" + $scope.project_key + "/init/" + $scope.uuid
            }).then(
                function(response)
                {
                    if (response.data.proceed) {
                        $scope.project          = response.data.project;
                        $scope.message          = response.data.message.replace(/\n/gi, "<br>");
                        $scope.categories       = response.data.categories;
                        $scope.unsorted_cards   = response.data.unsorted_cards;

                        $scope.unsorted_cards.sort(sort_by("text", false, function(a){return a.toUpperCase()}));

                        for (var i = 0; i < $scope.categories.length; i++) {
                            $scope.categories[i].cards.sort(sort_by("text", false, function(a){return a.toUpperCase()}));
                        }

                        $scope.dirty = false;

                        $scope.show_welcome_message();
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
                var categories = $scope.categories.length;

                for (var i = 0; i < categories; i++) {
                    $scope.remove_category($scope.categories[0].text);
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
                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.categories[i].text == text) {
                                toaster.danger("Error", "This category already exists.", false);
                                hide_toast(3000);

                                return;
                            }
                        }

                        var category = {
                            "text":     text,
                            "cards":    []
                        };

                        $scope.categories.push(category);

                        $scope.dirty = true;
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
                            if ($scope.categories[i].text == text) {
                                if ($scope.categories[i].text == text) {
                                    toaster.danger("Error", "This category already exists.", false);
                                    hide_toast(3000);

                                    return;
                                }
                            }
                        }

                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.categories[i].text == category) {
                                $scope.categories[i].text = text;
                            }
                        }

                        $scope.dirty = true;
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

                $scope.dirty = true;
            };

            $scope.do_not_participate = function()
            {
                $http({
                    method:     "get",
                    url:        "/server/experiment/" + $scope.project_key + "/do_not_participate/" + $scope.uuid
                }).then(
                    function(response)
                    {
                        $scope.dirty = false;

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

            $scope.save = function()
            {
                $http({
                    method:     "post",
                    url:        "/server/experiment/" + $scope.project_key + "/save/" + $scope.uuid,
                    data:       {
                        data:     $scope.categories
                    }
                }).then(
                    function(response)
                    {
                        $scope.dirty = false;
                    }
                );
            };

            $scope.save_and_submit = function()
            {
                $http({
                    method:     "post",
                    url:        "/server/experiment/" + $scope.project_key + "/save_and_submit/" + $scope.uuid,
                    data:       {
                        data:     $scope.categories
                    }
                }).then(
                    function(response)
                    {
                        alert("Save and submit completed.");
                    }
                );
            };

            $scope.show_welcome_message = function()
            {
                $scope.welcome = $modal.open(
                    {
                        templateUrl:    "/frontend/tpl/experiment/welcome.tpl",
                        scope:          $scope,
                        backdrop:       "static"
                    }
                );
            };
        }
    ]
);