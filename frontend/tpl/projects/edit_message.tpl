<form role="form" name="edit_message_form" ng-submit="edit_message()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="edit_message_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Edit message
        </h3>
    </div>
    <div class="modal-body" style="padding-bottom: 0;">
        <div class="alert" id="edit_message_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p ng-show="message.type == 'email_invitation'">
            This message will be sent via email to all participants <strong>except the seed participant</strong>. It should include information about the recipient being invited to participate in a Modified Delphi Card Sorting Experiment as well as information about the tasks to complete and how to participate.
        </p>
        <p ng-show="message.type == 'sp_email_invitation'">
            This message will be sent via email to the <strong>seed participant</strong> only. It should include information about the recipient being invited to participate in a Modified Delphi Card Sorting Experiment as well as information about the tasks to complete and how to participate.
        </p>
        <p ng-show="message.type == 'welcome_message'">
            This message will be displayed to all participants <strong>except the seed participant</strong> upon starting participation. It should again include instructions how to participate in the experiment and moreover how to interact with the user interface.
        </p>
        <p ng-show="message.type == 'sp_welcome_message'">
            This message will be displayed to the <strong>seed participant</strong> only upon starting participation. It should again include instructions how to participate in the experiment and moreover how to interact with the user interface.
        </p>
        <p ng-show="message.type == 'email_reminder'">
            This message will be sent via email to <strong>all participants</strong> as a reminder of their invitation to participate. It will only be sent if the participation has not been completed at the configured date and time.
        </p>
        <p ng-show="message.type == 'email_timeout'">
            This message will be sent via email to <strong>all participants</strong> if their participation time slot has expired and further participation is no longer possible.
        </p>
        <p>
            You can find a list of available variables below. To use a variable, type (or copy) it into the text field exactly as written (including the starting and trailing <strong>%</strong> sign).
        </p>
        <p ng-show="message.type == 'welcome_message' || message.type == 'sp_welcome_message'">
            You can use <strong>HTML markup</strong>, such as &lt;strong&gt;&lt;/strong&gt; to style the message.
        </p>
        <div class="form-group" id="edit_message_message_group" style="padding: 20px 0;">
            <label for="edit_message_message" class="col-sm-2 control-label">Message</label>
            <div class="input-group col-sm-10" style="padding-right: 15px;">
                <span class="input-group-addon" style="vertical-align: top;"><span class="glyphicon glyphicon-comment"></span></span>
                <textarea class="form-control" rows="10" ng-model="message.message" required style="resize: vertical;"></textarea>
            </div>
        </div>
    </div>
    <div>
        <table class="table" style="margin: 0;">
            <tbody>
                <tr>
                    <th scope="row" style="width: 40%;">
                        Last modified
                    </th>
                    <td style="width: 60%;">
                        {{ message.last_modified | timestamp }}
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <code>%first_name%</code>
                    </th>
                    <td>
                        The recipient's first name
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <code>%last_name%</code>
                    </th>
                    <td>
                        The recipient's last name
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <code>%completion_timestamp%</code>
                    </th>
                    <td>
                        Date and time when participation has to be completed
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <code>%experiment_link%</code>
                    </th>
                    <td>
                        Individual tokenized link for participant
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="modal-footer">
        <button id="edit_message_submit_button" type="submit" ng-disabled="edit_message_form.$invalid" class="btn btn-warning" tabindex="7"><span class="glyphicon glyphicon-edit"></span> Edit Message</button>
        <button id="edit_message_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="8">Cancel</button>
    </div>
</form>