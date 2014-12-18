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
                <li ui-sref-active="active" dropdown ng-show="role() == 'MODERATOR' || role() == 'ADMINISTRATOR'">
                    <a dropdown-toggle><span class="glyphicon glyphicon-th-large"></span> Projects <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a ui-sref="/projects/overview"><span class="glyphicon glyphicon-list"></span> View All Projects</a></li>
                        <li class="divider"></li>
                        <li><a ui-sref="/projects/create_project"><span class="glyphicon glyphicon-plus-sign"></span> Create Project</a></li>
                        <li class="divider"></li>
                        <li ng-repeat="project in projects"><a href="/frontend/projects/{{ project.key }}">{{ project.title }} ({{ project.key }})</a></li>
                    </ul>
                </li>
                <li ui-sref-active="active" dropdown ng-show="role() == 'ADMINISTRATOR'">
                    <a dropdown-toggle><span class="glyphicon glyphicon-wrench"></span> Administration <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a><span class="glyphicon glyphicon-cog"></span> Global Settings</a></li>
                        <li><a ui-sref="/administration/user_management"><span class="glyphicon glyphicon-user"></span> User management</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="navbar-right" id="top-right">
            <ul class="nav navbar-nav">
                <li ui-sref-active="active" dropdown>
                    <a dropdown-toggle><span class="glyphicon glyphicon-question-sign"></span> Help <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a ui-sref="/help"><span class="glyphicon glyphicon-question-sign"></span> Help</a></li>
                        <li class="divider"></li>
                        <li><a ng-click="show_about_dialog()"><span class="glyphicon glyphicon-info-sign"></span> About</a></li>
                    </ul>
                </li>
                <li dropdown>
                    <a dropdown-toggle><span class="glyphicon glyphicon-user"></span> Signed in as <strong>{{ real_name() }} ({{ username() }})</strong> <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a ng-click="show_change_password_dialog()"><span class="glyphicon glyphicon-lock"></span> Change Password</a></li>
                        <li class="divider"></li>
                        <li><a ui-sref="/logout"><span class="glyphicon glyphicon-log-out"></span> Log Out</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>