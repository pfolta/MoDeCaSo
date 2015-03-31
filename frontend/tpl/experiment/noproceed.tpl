<div class="modal-header">
    <button id="edit_message_close_button" type="button" class="close" ui-sref="/login" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
    <h3 class="modal-title text-danger">
        Participation not allowed
    </h3>
</div>
<div class="modal-body" style="padding-bottom: 0;">
    <div class="alert" id="edit_message_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
    </div>
    <p>
        Unfortunately, you cannot participate in this experiment. This might be due to a variety of reasons:
    </p>
    <ul>
        <li>Your participation period has timed out.</li>
        <li>You have already completed your participation.</li>
        <li>The experiment has been canceled by the moderator or an administrator.</li>
        <li>You have provided an invalid experiment URL.</li>
    </ul>
    <p>
        Clicking on "Close" will bring you to the login screen.
    </p>
    <p>
        Thank you for your understanding.
    </p>
</div>
<div class="modal-footer">
    <button id="edit_message_submit_button" type="button" class="btn btn-primary" ui-sref="/login" ng-click="$close()">Close</button>
</div>