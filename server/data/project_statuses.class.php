<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/data/project_statuses.class.php
 * Created:         2014-11-24
 * Last modified:	2014-11-24
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace data;

class project_statuses
{

    const CREATED = 0;
    const READY = 1;
    const RUNNING = 2;
    const FINISHED = 3;

    public static $values = array(
        0   => "CREATED",
        1   => "READY",
        2   => "RUNNING",
        3   => "FINISHED"
    );

}