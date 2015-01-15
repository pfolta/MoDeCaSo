/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/filters/timestamp.js
 * Created:			2014-11-17
 * Last modified:	2015-01-15
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

filters.filter(
    "timestamp",
    [
        function()
        {
            return function(timestamp)
            {
                function add_zero(number)
                {
                    if (number < 10) {
                        return "0" + number;
                    } else {
                        return number;
                    }
                }

                function make_12h(hours)
                {
                    if (hours == 0) {
                        return 12;
                    }

                    if (hours > 12) {
                        return hours - 12;
                    } else {
                        return hours;
                    }
                }

                function get_am_pm(hours)
                {
                    if (hours < 12) {
                        return "AM";
                    } else {
                        return "PM";
                    }
                }

                var date = new Date(timestamp * 1000);

                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hours = date.getHours();
                var min = add_zero(date.getMinutes());
                var secs = add_zero(date.getSeconds());

                var datetime = day + " " + months[month] + " " + year + ", " + make_12h(hours) + ":" + min + ":" + secs + " " + get_am_pm(hours);

                return datetime;
            }
        }
    ]
);