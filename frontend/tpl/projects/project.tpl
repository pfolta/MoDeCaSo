<div class="page">
    <h1>
        Project Details for {{ project.key }}
    </h1>

    <div class="alert" id="project_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert"></div>

    <div class="form-group" style="padding-bottom: 50px; ">
        <div class="pull-left" style="width: 80%;">
            <a class="btn btn-success" ng-click="start_project()" ng-disabled="project.status != 'READY'"><span class="glyphicon glyphicon-play"></span> Start Project</a>
            <a class="btn btn-info" ng-disabled="project.status != 'FINISHED'"><span class="glyphicon glyphicon-info-sign"></span> View Results</a>
            <a ng-click="load_project();" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span> Reload</a>
        </div>
        <div class="pull-right">
            <a ui-sref="/projects/overview" class="btn btn-default"><span class="glyphicon glyphicon-list"></span> View All Projects</a>
        </div>
    </div>

    <div class="alert alert-dismissable" ng-show="status_flash.show" ng-class="status_flash.type" ng-bind-html="html_save(status_flash.message)" role="alert"></div>

    <div class="panel panel-default">
        <div class="panel-heading pointer collapsible" ng-click="settings_collapse = !settings_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-cog upb-blue"></span> Project Settings
                <span class="pull-right">
                    <button class="btn btn-default btn-circle-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!settings_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="settings_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="settings_collapse">
            <div class="form-group" style="padding-bottom: 50px; ">
                <div class="pull-left" style="width: 75%;">
                    <div class="btn-group">
                        <button class="btn btn-primary" ng-click="save_settings()" ng-disabled="!settings_dirty"><span class="glyphicon glyphicon-floppy-disk"></span> Save Changes</button>
                        <button class="btn btn-default" ng-click="load_project()" ng-disabled="!settings_dirty"><span class="glyphicon glyphicon-share-alt rotate"></span> Revert Changes</button>
                    </div>
                </div>
            </div>
            <div class="alert alert-info" ng-show="settings_dirty">
                <span class="glyphicon glyphicon-info-sign"></span> Please click on <strong>Save Changes</strong> to save any changes you made to the project's settings.
            </div>
            <form class="form-horizontal">
                <div class="form-group" id="add_card_text_group">
                    <label for="add_card_text" class="col-sm-4 control-label">Time to complete participation</label>
                    <div class="input-group col-sm-2" style="float: left; padding-right: 10px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        <select class="form-control" id="settings_completion_days" ng-model="settings_completion_days" ng-change="settings_dirty = true;" required>
                            <option value="0">00</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <span class="input-group-addon">days</span>
                    </div>
                    <div class="input-group col-sm-2" style="float: left; padding-right: 10px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        <select class="form-control" id="settings_completion_hrs" ng-model="settings_completion_hrs" ng-change="settings_dirty = true;" required>
                            <option value="0">00</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                        <span class="input-group-addon">hrs</span>
                    </div>
                    <div class="input-group col-sm-2" style="float: left; padding-right: 10px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        <select class="form-control" id="settings_completion_mins" ng-model="settings_completion_mins" ng-change="settings_dirty = true;" required>
                            <option value="0">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                        <span class="input-group-addon">mins</span>
                    </div>
                </div>
                <div class="form-group" id="add_card_text_group">
                    <label for="add_card_text" class="col-sm-4 control-label">Time passed before reminding email</label>
                    <div class="input-group col-sm-2" style="float: left; padding-right: 10px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        <select class="form-control" id="settings_reminder_days" ng-model="settings_reminder_days" ng-change="settings_dirty = true;" required>
                            <option value="0">00</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <span class="input-group-addon">days</span>
                    </div>
                    <div class="input-group col-sm-2" style="float: left; padding-right: 10px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        <select class="form-control" id="settings_reminder_hrs" ng-model="settings_reminder_hrs" ng-change="settings_dirty = true;" required>
                            <option value="0">00</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                        <span class="input-group-addon">hrs</span>
                    </div>
                    <div class="input-group col-sm-2" style="float: left; padding-right: 10px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        <select class="form-control" id="settings_reminder_mins" ng-model="settings_reminder_mins" ng-change="settings_dirty = true;" required>
                            <option value="0">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                        <span class="input-group-addon">mins</span>
                    </div>
                </div>
            </form>
        </div>
        <div collapse="settings_collapse">
            <table class="table" style="margin: 0;">
                <tbody>
                <tr>
                    <th scope="row" style="width: 20%;">
                        Project Lead
                    </th>
                    <td style="width: 70%;">
                        <span class="upb-blue"><strong><span class="glyphicon glyphicon-user"></span> {{ project.lead }}</strong></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Project Created
                    </th>
                    <td>
                        {{ project.created | timestamp }}
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Project Last modified
                    </th>
                    <td>
                        {{ project.last_modified | timestamp }}
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Project Started
                    </th>
                    <td>
                        {{ project.started | timestamp }}
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Project Completed
                    </th>
                    <td>
                        {{ project.completed | timestamp }}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading pointer collapsible" ng-click="messages_collapse = !messages_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-comment upb-blue"></span> Messages
                <span class="pull-right">
                    <button class="btn btn-default btn-circle-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!messages_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="messages_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="messages_collapse">
            <div class="row">
                <div class="col-md-4 message">
                    <h4>
                        Email invitation
                        <span class="pull-right">
                            <a href="/frontend/projects/{{ project.key }}/edit_message/email_invitation" class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                        </span>
                    </h4>
                    <p>
                        {{ messages['email_invitation']['message'] }}
                    </p>
                </div>
                <div class="col-md-4 message">
                    <h4>
                        Email invitation for Seed Participant
                        <span class="pull-right">
                            <a href="/frontend/projects/{{ project.key }}/edit_message/sp_email_invitation" class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                        </span>
                    </h4>
                    <p>
                        {{ messages['sp_email_invitation']['message'] }}
                    </p>
                </div>
                <div class="col-md-4 message">
                    <h4>
                        Welcome Message
                        <span class="pull-right">
                            <a href="/frontend/projects/{{ project.key }}/edit_message/welcome_message" class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                        </span>
                    </h4>
                    <p>
                        {{ messages['welcome_message']['message'] }}
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 message">
                    <h4>
                        Welcome Message for Seed Participant
                        <span class="pull-right">
                            <a href="/frontend/projects/{{ project.key }}/edit_message/sp_welcome_message" class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                        </span>
                    </h4>
                    <p>
                        {{ messages['sp_welcome_message']['message'] }}
                    </p>
                </div>
                <div class="col-md-4 message">
                    <h4>
                        Email Reminder
                        <span class="pull-right">
                            <a href="/frontend/projects/{{ project.key }}/edit_message/email_reminder" class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                        </span>
                    </h4>
                    <p>
                        {{ messages['email_reminder']['message'] }}
                    </p>
                </div>
                <div class="col-md-4 message">
                    <h4>
                        Email Timeout Notification
                        <span class="pull-right">
                            <a href="/frontend/projects/{{ project.key }}/edit_message/email_timeout" class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                        </span>
                    </h4>
                    <p>
                        {{ messages['email_timeout']['message'] }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading pointer collapsible" ng-click="participants_collapse = !participants_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-user upb-blue"></span> Participants
                <span class="pull-right">
                    <button class="btn btn-default btn-circle-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!participants_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="participants_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="participants_collapse">
            <div class="form-group" style="padding-bottom: 50px; ">
                <div class="pull-left" style="width: 75%;">
                    <a href="/frontend/projects/{{ project.key }}/add_participant" class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign"></span> Add Participant</a>
                    <div class="btn-group">
                        <a href="/frontend/projects/{{ project.key }}/import_participants" class="btn btn-default"><span class="glyphicon glyphicon-floppy-open"></span> Import Participants</a>
                        <a href="/server/projects/{{ project.key }}/participants/export_participants?api_key={{ api_key() }}" class="btn btn-default" ng-disabled="participants.length == 0" target="download_iframe"><span class="glyphicon glyphicon-floppy-save"></span> Export Participants</a>
                    </div>
                    <a href="/frontend/projects/{{ project.key }}/delete_all_participants" class="btn btn-danger" ng-disabled="participants.length == 0"><span class="glyphicon glyphicon-trash"></span> Delete All Participants</a>
                </div>
                <div class="pull-right text-right" style="width: 25%;">
                    <div class="btn-group">
                        <button class="btn btn-primary" ng-disabled="!participants_order_changed" ng-click="participants_save_order()"><span class="glyphicon glyphicon-floppy-disk"></span> Save Order</button>
                        <button class="btn btn-default" ng-disabled="!participants_order_changed" ng-click="load_project()"><span class="glyphicon glyphicon-share-alt rotate"></span> Revert Order</button>
                    </div>
                </div>
            </div>
            <div style="padding-bottom: 25px;">
                <h4>
                    Seed Participant: <span class="upb-blue"><span class="glyphicon glyphicon-user"></span> {{ participants[0].first_name }} {{ participants[0].last_name }}</span>
                </h4>
            </div>
            <div class="alert alert-info" ng-show="participants_order_changed">
                <span class="glyphicon glyphicon-info-sign"></span> Please click on <strong>Save Order</strong> to save any changes you made to the order of the participants.
            </div>
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th style="width: 5%;">
                            Order
                        </th>
                        <th style="width: 20%;">
                            First Name
                        </th>
                        <th style="width: 20%;">
                            Last Name
                        </th>
                        <th style="width: 30%;">
                            Email Address
                        </th>
                        <th style="width: 15%;">
                            Status
                        </th>
                        <th style="width: 10%;">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody ui-sortable="sortable_options" ng-model="participants">
                    <tr ng-repeat="participant in participants" class="grab">
                        <td class="text-center text-primary">
                            <strong>{{ participant.order }}</strong>
                        </td>
                        <td>
                            <strong>{{ participant.first_name }}</strong>
                        </td>
                        <td>
                            <strong>{{ participant.last_name }}</strong>
                        </td>
                        <td>
                            {{ participant.email }}
                        </td>
                        <td>
                            <span class="label text-uppercase" ng-class="get_participant_status_label_class(participant.status);">{{ participant.status }}</span>
                        </td>
                        <td class="text-center">
                            <div class="btn-group btn-group-sm">
                                <a href="/frontend/projects/{{ project.key }}/edit_participant/{{ participant.id }}" class="btn btn-warning" tooltip="Edit Participant" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                                <a href="/frontend/projects/{{ project.key }}/delete_participant/{{ participant.id }}" class="btn btn-danger" tooltip="Delete Participant" tooltip-append-to-body="true"><span class="glyphicon glyphicon-trash"></span></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="text-right">
                {{ participants.length }} {{ participants.length == 1 ? "Participant" : "Participants" }}
            </p>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading pointer collapsible" ng-click="cards_collapse = !cards_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-credit-card upb-blue"></span> Cards
                <span class="pull-right">
                    <button class="btn btn-default btn-circle-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!cards_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="cards_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="cards_collapse">
            <div class="form-group" style="padding-bottom: 50px; ">
                <div class="pull-left" style="width: 51%;">
                    <a href="/frontend/projects/{{ project.key }}/add_card" class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign"></span> Add Card</a>
                    <div class="btn-group">
                        <a href="/frontend/projects/{{ project.key }}/import_cards" class="btn btn-default"><span class="glyphicon glyphicon-floppy-open"></span> Import Cards</a>
                        <a href="/server/projects/{{ project.key }}/cards/export_cards?api_key={{ api_key() }}" ng-disabled="cards.length == 0" class="btn btn-default" target="download_iframe"><span class="glyphicon glyphicon-floppy-save"></span> Export Cards</a>
                    </div>
                    <a href="/frontend/projects/{{ project.key }}/delete_all_cards" ng-disabled="cards.length == 0" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span> Delete All Cards</a>
                </div>
                <div class="pull-left text-center" style="width: 10%;">
                    <div class="btn-group">
                        <button class="btn btn-default" ng-model="card_view" btn-radio="1" tooltip="Card View" tooltip-append-to-body="true"><span class="glyphicon glyphicon-th-large"></span></button>
                        <button class="btn btn-default" ng-model="card_view" btn-radio="0" tooltip="List View" tooltip-append-to-body="true"><span class="glyphicon glyphicon-list"></span></button>
                    </div>
                </div>
                <div class="pull-left text-center" style="width: 4%; padding-top: 7px;">
                    {{ card_zoom_percent }}%
                </div>
                <div class="pull-left text-center" style="width: 2%; padding-top: 7px;">
                    <a class="btn btn-default btn-circle-xs" ng-click="adjust_card_zoom(-0.1)" ng-disabled="!card_view" tooltip="Zoom out" tooltip-append-to-body="true"><span class="glyphicon glyphicon-minus"></span></a>
                </div>
                <div class="pull-left" style="height: 33px; width: 10%; padding-top: 7px;">
                    <input type="range" id="card_zoom" ng-disabled="!card_view" ng-model="card_zoom" min="0.1" max="2.5" step="0.1" tooltip="Zoom ({{ card_zoom_percent }}%)" tooltip-append-to-body="true">
                </div>
                <div class="pull-left text-center" style="width: 2%; padding-top: 7px;">
                    <a class="btn btn-default btn-circle-xs" ng-click="adjust_card_zoom(0.1)" ng-disabled="!card_view" tooltip="Zoom in" tooltip-append-to-body="true"><span class="glyphicon glyphicon-plus"></span></a>
                </div>
                <div class="pull-right" style="width: 20%;">
                    <div class="input-group">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
                        <input type="text" ng-model="cards_filter" placeholder="Filter" class="form-control">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" ng-click="cards_filter=null" ng-disabled="!cards_filter"><span aria-hidden="true">&times;</span><span class="sr-only">Clear</span></button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="card-container" ng-repeat="card in cards_filtered = (cards | filter:cards_filter)" ng-show="card_view">
                <div class="card">
                    <div class="btn-group btn-group-sm card-controls">
                        <button ng-disabled="!card.tooltip" class="btn btn-info" popover="{{ card.tooltip }}" popover-title="{{ card.text }}" popover-placement="top" popover-append-to-body="true"><span class="glyphicon glyphicon-question-sign"></span></button>
                        <a href="/frontend/projects/{{ project.key }}/edit_card/{{ card.id }}" class="btn btn-warning" tooltip="Edit Card" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                        <a href="/frontend/projects/{{ project.key }}/delete_card/{{ card.id }}" class="btn btn-danger" tooltip="Delete Card" tooltip-append-to-body="true"><span class="glyphicon glyphicon-trash"></span></a>
                    </div>
                    <div class="card-text">
                        {{ card.text }}
                    </div>
                </div>
            </div>
            <table class="table table-striped table-bordered" ng-show="!card_view">
                <thead>
                <tr>
                    <th style="width: 30%;">
                        Card Text
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="cards_order_predicate = 'text'; cards_order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="cards_order_predicate = 'text'; cards_order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 40%;">
                        Card Tooltip
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="cards_order_predicate = 'tooltip'; cards_order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="cards_order_predicate = 'tooltip'; cards_order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 20%;">
                        Created
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="cards_order_predicate = 'created'; cards_order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="cards_order_predicate = 'created'; cards_order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 10%;">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr ng-repeat="card in cards_filteres = (cards | filter:cards_filter | orderBy:cards_order_predicate:cards_order_reverse)">
                    <td>
                        <strong>{{ card.text }}</strong>
                    </td>
                    <td>
                        {{ card.tooltip }}
                    </td>
                    <td>
                        {{ card.created | timestamp }}
                    </td>
                    <td class="text-center">
                        <div class="btn-group btn-group-sm">
                            <a href="/frontend/projects/{{ project.key }}/edit_card/{{ card.id }}" class="btn btn-warning" tooltip="Edit Card" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                            <a href="/frontend/projects/{{ project.key }}/delete_card/{{ card.id }}" class="btn btn-danger" tooltip="Delete Card" tooltip-append-to-body="true"><span class="glyphicon glyphicon-trash"></span></a>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <p class="text-right" style="clear: both;">
                {{ cards_filtered.length }} {{ cards_filtered.length == 1 ? "Card" : "Cards" }}
            </p>
        </div>
    </div>
</div>