<div class="page">
    <h1>Welcome to MoDeCaSo, {{ real_name() }}!</h1>

    <p>
        MoDeCaSo, <strong>Mo</strong>dified <strong>De</strong>lphi <strong>Ca</strong>rd <strong>So</strong>rting, is a web application to conduct Card Sorting Experiments based on the Modified Delphi Method.
    </p>

    <div class="panel panel-default">
        <div class="panel-heading pointer collapsible" ng-click="session_information_collapse = !session_information_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-info-sign upb-blue"></span> Session Information
                <span class="pull-right">
                    <button class="btn btn-default btn-circle-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!session_information_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="session_information_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="session_information_collapse">
            <p>
                Information about the current session
            </p>
        </div>
        <div collapse="session_information_collapse">
            <table class="table" style="margin: 0;">
                <tbody>
                <tr>
                    <th scope="row" style="width: 20%;">
                        Logged in since
                    </th>
                    <td style="width: 70%;">
                        {{ logged_in_since | timestamp }}
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Last login
                    </th>
                    <td>
                        {{ last_login | timestamp }}
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Last login from IP
                    </th>
                    <td>
                        {{ last_login_from_ip }}
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Last login from Hostname
                    </th>
                    <td>
                        {{ last_login_from_hostname }}
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Last login from Application
                    </th>
                    <td>
                        {{ last_login_from_application }}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>