<h1>
    User management
</h1>
<div class="form-group">
    <label for="filter">Filter</label>
    <div class="input-group">
        <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
        <input type="text" ng-model="filter" placeholder="Filter" class="form-control">
    </div>
</div>
<table class="table table-striped">
    <thead>
        <tr>
            <th>
                #
            </th>
            <th>
                Username
            </th>
            <th>
                First Name
            </th>
            <th>
                Last Name
            </th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="user in users | filter:filter">
            <td>
                {{ user.id }}
            </td>
            <td>
                {{ user.username }}
            </td>
            <td>
                {{ user.firstname }}
            </td>
            <td>
                {{ user.lastname }}
            </td>
        </tr>
    </tbody>
</table>