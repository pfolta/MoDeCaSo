<nav class="navbar navbar-default navbar-fixed-top" id="main_navbar" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" ui-sref="/dashboard">
                <img src="/frontend/img/upb-claw.svg" class="header-icon">
                MoDeCaSo
            </a>
        </div>
        <div class="navbar-left">
            <ul class="nav navbar-nav">
                <li ui-sref-active="active"><a ui-sref="/dashboard"><span class="glyphicon glyphicon-dashboard"></span> Dashboard</a></li>
                <li class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-th-large"></span> Projects <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a><span class="glyphicon glyphicon-list"></span> Project Overview</a></li>
                        <li class="divider"></li>
                        <li><a><span class="glyphicon glyphicon-plus-sign"></span> Create New Project</a></li>
                        <li class="divider"></li>
                        <li><a>Project 1</a></li>
                        <li><a>Project 2</a></li>
                        <li><a>Project 3</a></li>
                    </ul>
                </li>
                <li ui-sref-active="active" class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-wrench"></span> Administration <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a><span class="glyphicon glyphicon-cog"></span> Global Settings</a></li>
                        <li><a ui-sref="/administration/user-management"><span class="glyphicon glyphicon-user"></span> User management</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="navbar-right" id="top-right">
            <ul class="nav navbar-nav">
                <li ui-sref-active="active" class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-question-sign"></span> Help <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a ui-sref="/help"><span class="glyphicon glyphicon-question-sign"></span> Help</a></li>
                        <li class="divider"></li>
                        <li><a ng-click="aboutDialog()"><span class="glyphicon glyphicon-info-sign"></span> About</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> Signed in as <strong>{{ main.user.username }}</strong> <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a ng-click="changePasswordDialog()"><span class="glyphicon glyphicon-lock"></span> Change Password</a></li>
                        <li class="divider"></li>
                        <li><a ui-sref="/login"><span class="glyphicon glyphicon-log-out"></span> Log Out</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>