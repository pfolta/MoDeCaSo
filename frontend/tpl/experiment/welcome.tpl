<div class="modal-header">
    <h3 class="modal-title">
        Welcome!
    </h3>
</div>
<div class="modal-body" style="padding-bottom: 0;">
    <div class="alert" id="edit_message_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
    </div>
    <p ng-bind-html="html_save(message)"></p>
</div>
<div class="modal-footer">
    <button id="edit_message_submit_button" type="button" class="btn btn-success"><span class="glyphicon glyphicon-play"></span> Start</button>
    <button id="edit_message_cancel_button" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-ban-circle"></span> Do Not Participate</button>
</div>