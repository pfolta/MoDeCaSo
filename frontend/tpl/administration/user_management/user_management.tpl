<div class="page">
    <h1>
    User management
    </h1>
    <div class="alert" id="user_management_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
    </div>
    <div class="form-group" style="padding-bottom: 50px; ">
        <div class="pull-left" style="width: 80%;">
            <a ui-sref="/administration/user_management/add_user" class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign"></span> Add User</a>
            <a ng-click="load_users();" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span> Reload</a>
        </div>
        <div class="pull-right" style="width: 20%;">
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
                <input type="text" ng-model="filter" placeholder="Filter" class="form-control">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" ng-click="filter=null" ng-disabled="!filter"><span aria-hidden="true">&times;</span><span class="sr-only">Clear</span></button>
                </span>
            </div>
        </div>
    </div>
    <div class="table-responsive" style="clear: both;">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th style="width: 7%;">
                        ID
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'id'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'id'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 15%;">
                        Username
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'username'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'username'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 15%;">
                        First Name
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'first_name'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'first_name'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 15%;">
                        Last Name
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'last_name'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'last_name'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 20%;">
                        Email
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'email'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'email'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 10%;">
                        Role
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'role'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'role'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 10%;">
                        Status
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'status'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'status'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 8%;">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="user in users | filter:filter | orderBy:order_predicate:order_reverse">
                    <td class="text-right">
                        {{ user.id }}
                    </td>
                    <td>
                        <strong>{{ user.username }}</strong>
                    </td>
                    <td>
                        {{ user.first_name }}
                    </td>
                    <td>
                        {{ user.last_name }}
                    </td>
                    <td>
                        {{ user.email }}
                    </td>
                    <td class="text-capitalize">
                        {{ user.role | lowercase }}
                    </td>
                    <td>
                        <span class="label text-uppercase" ng-class="get_label_class(user.status);">{{ user.status }}</span>
                    </td>
                    <td class="text-center">
                        <div class="btn-group btn-group-sm">
                            <a href="/frontend/administration/user_management/edit_user/{{ user.username }}" class="btn btn-warning" tooltip="Edit User" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                            <a href="/frontend/administration/user_management/delete_user/{{ user.username }}" class="btn btn-danger" tooltip="Delete User" tooltip-append-to-body="true"><span class="glyphicon glyphicon-trash"></span></a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="text-right">
            {{ users.length }} {{ users.length == 1 ? "User" : "Users" }}
        </p>
    </div>
</div>