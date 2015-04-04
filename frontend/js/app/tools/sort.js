/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/tools/sort.js
 * Created:			2015-04-04
 * Last modified:	2015-04-04
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

/**
 * sort_by ( )
 *
 * Helper function to sort an array of objects with respect to specific property
 *
 * @param field             The property to sort by
 * @param reverse           True if reverse, false otherwise
 * @param primer            Sortable function
 * @returns {Function}
 */
function sort_by(field, reverse, primer)
{
    var key = primer ? function(x) { return primer(x[field]) } : function(x) { return x[field] };
    reverse = !reverse ? 1 : -1;

    return function(a, b)
    {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}