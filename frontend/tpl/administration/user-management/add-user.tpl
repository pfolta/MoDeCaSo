<form role="form" name="add_user_form" novalidate ng-controller="mainCtrl" class="form-horizontal">
    <div class="modal-header">
        <button type="button" class="close" ng-click="$close()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Add an account
        </h3>
    </div>
    <div class="modal-body">
        <p>
            Create a new user account.
        </p>
        <div class="form-group" id="add_user_username_group" style="padding-top: 20px;">
            <label for="add_user_username" class="col-sm-4 control-label">Username</label>
            <div class="input-group col-sm-8" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="change_password.old_password" id="add_user_username" placeholder="Username" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_user_firstName_group">
            <label for="add_user_firstName" class="col-sm-4 control-label">First Name</label>
            <div class="input-group col-sm-8" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="change_password.old_password" id="add_user_firstName" placeholder="First Name" required tabindex="2" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_user_lastName_group">
            <label for="add_user_lastName" class="col-sm-4 control-label">Last Name</label>
            <div class="input-group col-sm-8" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="change_password.old_password" id="add_user_lastName" placeholder="Last Name" required tabindex="3" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_user_email_group">
            <label for="add_user_email" class="col-sm-4 control-label">Email address</label>
            <div class="input-group col-sm-8" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
                <input type="text" ng-model="change_password.old_password" id="add_user_email" placeholder="Email address" required tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group" id="change_password_new_password_group">
            <label for="change_password_new_password" class="col-sm-4 control-label">Password</label>
            <div class="input-group col-sm-8" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" ng-model="change_password.new_password" id="change_password_new_password" placeholder="Password" required tabindex="2" class="form-control">
            </div>
        </div>
        <div class="form-group" id="change_password_confirm_new_password_group">
            <label for="change_password_confirm_new_password" class="col-sm-4 control-label">Confirm Password</label>
            <div class="input-group col-sm-8" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" ng-model="change_password.confirm_new_password" id="change_password_confirm_new_password" placeholder="Confirm Password" required tabindex="3" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_user_role_group">
            <label for="add_user_role" class="col-sm-4 control-label">Role</label>
            <div class="input-group col-sm-8" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <select class="form-control">
                    <option>Administrator</option>
                    <option>Moderator</option>
                </select>
            </div>
        </div>
        <div class="form-group" id="add_user_status_group">
            <label for="add_user_status" class="col-sm-4 control-label">Status</label>
            <div class="input-group col-sm-8" style="padding-right: 15px;">
                <div class="btn-group">
                    <label class="btn btn-success text-uppercase" ng-model="radioModel" btn-radio="'active'">Active</label>
                    <label class="btn btn-default text-uppercase" ng-model="radioModel" btn-radio="'inactive'">Inactive</label>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="submit" ng-disabled="add_user_form.$invalid" class="btn btn-primary" tabindex="4"><span class="glyphicon glyphicon-plus-sign"></span> Add User</button>
        <button type="button" class="btn btn-default" ng-click="$close()" tabindex="5">Cancel</button>
    </div>
</form>