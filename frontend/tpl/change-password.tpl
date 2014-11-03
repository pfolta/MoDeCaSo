<form role="form" name="change_password_form" novalidate ng-controller="mainCtrl">
    <div class="modal-header">
        <button type="button" class="close" ng-click="$close()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Change password
        </h3>
    </div>
    <div class="modal-body">
        <p>
            Change password for user <strong>{{ main.user.username }}</strong>.
        </p>
        <ul>
            <li>Do not use the same password that you use for other online accounts.</li>
            <li>Passwords are case-sensitive. Remember to check your CAPS lock key.</li>
        </ul>
        <div class="form-group" id="change_password_old_password_group" style="padding-top: 20px;">
            <label for="change_password_old_password">Old Password</label>
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" ng-model="change_password.old_password" id="change_password_old_password" placeholder="Old Password" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group" id="change_password_new_password_group">
            <label for="change_password_new_password">New Password</label>
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" ng-model="change_password.new_password" id="change_password_new_password" placeholder="New Password" required tabindex="2" class="form-control">
            </div>
        </div>
        <div class="form-group" id="change_password_confirm_new_password_group">
            <label for="change_password_confirm_new_password">Confirm New Password</label>
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" ng-model="change_password.confirm_new_password" id="change_password_confirm_new_password" placeholder="Confirm New Password" required tabindex="3" class="form-control">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="submit" ng-disabled="change_password_form.$invalid" class="btn btn-primary" tabindex="4"><span class="glyphicon glyphicon-lock"></span> Change Password</button>
        <button type="button" class="btn btn-default" ng-click="$close()" tabindex="5">Cancel</button>
    </div>
</form>