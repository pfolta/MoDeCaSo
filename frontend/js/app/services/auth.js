/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/services/auth.js
 * Created:			2014-10-20
 * Last modified:	2014-11-05
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
                    return $http({
                        method: "post",
                        url:    "/server/auth/login",
                        data:   {
                            username:   username,
                            password:   password
                        }
                    }).then(handle_response, handle_response);

                    function handle_response(response)
                    {
                        var data = response.data;

                        if (!data.error && data.msg == "login_successful") {
                            sessionService.set("loggedin", true);
                            sessionService.set("username", username);

                            return true;
                        } else {
                            return false;
                        }
                    }
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