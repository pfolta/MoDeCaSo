<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/model/administration/server_maintenance_service.class.php
 * Created:			2015-03-09
 * Last modified:	2015-03-09
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace model;

use tools\url;

class server_maintenance_service
{

    /**
     * execute ( )
     *
     * Executes the Server Maintenance Service command and returns the output formatted as a string
     *
     * @return string
     */
    public static function execute()
    {
        exec("php ".url::get_physical_path().DIRECTORY_SEPARATOR."server_svc.php", $output);

        return implode($output);
    }

}