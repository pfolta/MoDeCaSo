<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/model/administration/server_maintenance_service.class.php
 * Created:			2015-03-09
 * Last modified:	2015-05-02
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace model;

use tools\url;

class server_maintenance_service
{

    /**
     * run ( )
     *
     * Runs the Server Maintenance Service command and returns the output formatted as a string
     *
     * @return string
     */
    public static function run()
    {
        exec("php ".url::get_physical_path().DIRECTORY_SEPARATOR."server_svc.php", $output);

        return implode("\n", $output);
    }

}