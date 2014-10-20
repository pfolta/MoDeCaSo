/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/services/auth.js
 * Created:			2014-10-20
 * Last modified:	2014-10-20
 * Author:			Peter Folta <mail@peterfolta.net>
 */

services.factory(
    "authService",
    [
        "$http",
        function($http)
        {
            return {
                login: function(username, password)
                {
                    console.log("Attempting to log in with username = " + username + " and password = " + password);

                    var response;

                    var $promise = $http.post("/frontend/tpl/footer.tpl", username);
                    $promise.then(function(data)
                    {
                        return data.data;
                    });

                    return response;
                },

                logout: function()
                {
                    return "authService->logout called";
                }
            }
        }
    ]
);