<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/data/participant_statuses.class.php
 * Created:			2015-01-14
 * Last modified:	2015-01-14
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace data;

class participant_statuses
{

    const ADDED = 0;
    const NOTIFIED = 1;
    const COMPLETED = 2;
    const REMINDED = 3;
    const TIMEOUT = 4;
    const CANCELED = 5;

    public static $values = array(
        0   => "ADDED",
        1   => "NOTIFIED",
        2   => "COMPLETED",
        3   => "REMINDED",
        4   => "TIMEOUT",
        5   => "CANCELED"
    );

}