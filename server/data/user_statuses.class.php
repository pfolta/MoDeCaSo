<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /server/data/user_statuses.class.php
 * Created:         2014-11-24
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace data;

class user_statuses
{

    const INACTIVE = 0;
    const ACTIVE = 1;

    public static $values = array(
        0   => "INACTIVE",
        1   => "ACTIVE"
    );

}