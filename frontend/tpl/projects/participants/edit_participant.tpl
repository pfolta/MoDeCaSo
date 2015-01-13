<form role="form" name="edit_participant_form" ng-submit="edit_participant()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="edit_participant_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Edit Participant
        </h3>
    </div>
    <div class="modal-body">
        <div class="alert" id="edit_participant_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p>
            Change the details of an existing participant.
        </p>
        <div class="form-group" id="edit_participant_first_name_group" style="padding-top: 20px;">
            <label for="edit_participant_first_name" class="col-sm-3 control-label">Text</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="participant.first_name" id="edit_participant_first_name" placeholder="First Name" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group" id="edit_participant_last_name_group">
            <label for="edit_participant_last_name" class="col-sm-3 control-label">Last Name</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="participant.last_name" id="edit_participant_last_name" placeholder="Last Name" required autofocus tabindex="2" class="form-control">
            </div>
        </div>
        <div class="form-group" id="edit_participant_email_group">
            <label for="edit_participant_email" class="col-sm-3 control-label">Email Address</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
                <input type="email" ng-model="participant.email" id="edit_participant_email" placeholder="Email Address" required autofocus tabindex="3" class="form-control">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="edit_participant_submit_button" type="submit" ng-disabled="edit_participant_form.$invalid" class="btn btn-warning" tabindex="4"><span class="glyphicon glyphicon-edit"></span> Edit Participant</button>
        <button id="edit_participant_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="5">Cancel</button>
    </div>
</form>