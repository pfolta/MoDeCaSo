<h1>
    User management
</h1>
<div class="form-group" style="padding-bottom: 50px;">
    <div class="pull-left">
        <a ui-sref="/administration/user-management/add-user" class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span> Add User</a>
    </div>
    <div class="pull-right">
        <div class="input-group">
            <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
            <input type="text" ng-model="filter" placeholder="Filter" class="form-control">
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
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'id'; orderReverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'id'; orderReverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                </div>
            </th>
            <th style="width: 15%;">
                Username
                <div class="btn-group btn-group-xs pull-right">
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'username'; orderReverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'username'; orderReverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                </div>
            </th>
            <th style="width: 15%;">
                First Name
                <div class="btn-group btn-group-xs pull-right">
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'firstName'; orderReverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'firstName'; orderReverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                </div>
            </th>
            <th style="width: 15%;">
                Last Name
                <div class="btn-group btn-group-xs pull-right">
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'lastName'; orderReverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'lastName'; orderReverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                </div>
            </th>
            <th style="width: 20%;">
                Email
                <div class="btn-group btn-group-xs pull-right">
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'email'; orderReverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'email'; orderReverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                </div>
            </th>
            <th style="width: 10%;">
                Role
                <div class="btn-group btn-group-xs pull-right">
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'role'; orderReverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'role'; orderReverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                </div>
            </th>
            <th style="width: 10%;">
                Status
                <div class="btn-group btn-group-xs pull-right">
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'status'; orderReverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                    <button type="button" class="btn btn-default" ng-click="orderPredicate = 'status'; orderReverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                </div>
            </th>
            <th style="width: 8%;">
                Actions
            </th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="user in users | filter:filter | orderBy:orderPredicate:orderReverse">
            <td class="text-right">
                {{ user.id }}
            </td>
            <td>
                <strong>{{ user.username }}</strong>
            </td>
            <td>
                {{ user.firstName }}
            </td>
            <td>
                {{ user.lastName }}
            </td>
            <td>
                {{ user.email }}
            </td>
            <td>
                {{ user.role | capitalizeWords }}
            </td>
            <td>
                <span class="label" ng-class="{ 'label-success': user.status == 'active', 'label-default': user.status == 'inactive' }">{{ user.status | uppercase }}</span>
            </td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-warning" title="Edit User"><span class="glyphicon glyphicon-edit"></span></button>
                    <button type="button" class="btn btn-danger" title="Delete User"><span class="glyphicon glyphicon-trash"></span></button>
                </div>
            </td>
        </tr>
    </tbody>
</table>
</div>