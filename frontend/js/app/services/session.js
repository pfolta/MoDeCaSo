/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/services/session.js
 * Created:			2014-10-20
 * Last modified:	2014-11-12
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

services.factory(
    "session_service",
    [
        function()
        {
            return {
                /**
                 * set ( )
                 *
                 * Sets a (key, value) pair to the local session storage
                 *
                 * @param key   The key of the variable
                 * @param value The value of the variable
                 * @returns {*}
                 */
                set: function(key, value)
                {
                    return sessionStorage.setItem(key, value);
                },

                /**
                 * get ( )
                 *
                 * Returns the value of a (key, value) pair stored in the local session storage
                 *
                 * @param key   The key used for lookup
                 * @returns {*}
                 */
                get: function(key)
                {
                    return sessionStorage.getItem(key);
                },

                /**
                 * unset ( )
                 *
                 * Removes a (key, value) pair from the local session storage
                 *
                 * @param key   The key used for lookup
                 * @returns {*}
                 */
                unset: function(key)
                {
                    return sessionStorage.removeItem(key);
                }
            }
        }
    ]
);