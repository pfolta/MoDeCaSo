/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/services/auth.js
 * Created:			2014-10-20
 * Last modified:	2014-10-27
 * Author:			Peter Folta <mail@peterfolta.net>
 */

services.factory(
    "authService",
    [
        "$http",
        "sessionService",
        function($http, sessionService)
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
                    
                    if (username == "dev" && password == "dev") {
                        sessionService.set("loggedin", true);
                        sessionService.set("username", username);

                        return true;
                    }

                    return false;
                },

                logout: function()
                {
                    return "authService->logout called";
                },

                is_authenticated: function(request_permission)
                {
                    if (sessionService.get("loggedin")) {
                        return true;
                    }

                    if (request_permission == "/frontend/login") {
                        return true;
                    }

                    return false;
                }
            }
        }
    ]
);