/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/experiment/experiment.js
 * Created:			2015-03-26
 * Last modified:	2015-03-26
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "experiment_controller",
    [
        "$scope",
        "$modal",
        function($scope, $modal)
        {
            $modal.open(
                {
                    templateUrl:    "/frontend/tpl/experiment/welcome.tpl",
                    backdrop:       "static"
                }
            );
        }
    ]
);