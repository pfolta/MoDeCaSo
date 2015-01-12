<div class="page">
    <h1>
        Project Details for {{ project.key }}
    </h1>
    <div class="alert" id="project_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert"></div>
    <div class="form-group" style="padding-bottom: 50px; ">
        <div class="pull-left" style="width: 80%;">
            <a class="btn btn-success" disabled><span class="glyphicon glyphicon-play"></span> Run Project</a>
            <a ng-click="load_project();" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span> Reload</a>
        </div>
        <div class="pull-right">
            <a ui-sref="/projects/overview" class="btn btn-default"><span class="glyphicon glyphicon-list"></span> View All Projects</a>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading pointer" ng-click="settings_collapse = !settings_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-cog upb-blue"></span> Project Settings
                <span class="pull-right">
                    <button class="btn btn-default btn-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!settings_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="settings_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="settings_collapse">

        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading pointer" ng-click="messages_collapse = !messages_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-comment upb-blue"></span> Messages
                <span class="pull-right">
                    <button class="btn btn-default btn-xs">
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
                            <button class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></button>
                        </span>
                    </h4>
                    <p>
                        {{ project.email_invitation }}
                    </p>
                </div>
                <div class="col-md-4 message">
                    <h4>
                        Email invitation for Seed Participant
                        <span class="pull-right">
                            <button class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></button>
                        </span>
                    </h4>
                    <p>
                        {{ project.sp_email_invitation }}
                    </p>
                </div>
                <div class="col-md-4 message">
                    <h4>
                        Welcome Message
                        <span class="pull-right">
                            <button class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></button>
                        </span>
                    </h4>
                    <p>
                        {{ project.welcome_message }}
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 message">
                    <h4>
                        Welcome Message for Seed Participant
                        <span class="pull-right">
                            <button class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></button>
                        </span>
                    </h4>
                    <p>
                        {{ project.sp_welcome_message }}
                    </p>
                </div>
                <div class="col-md-4 message">
                    <h4>
                        Email Reminder
                        <span class="pull-right">
                            <button class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></button>
                        </span>
                    </h4>
                    <p>
                        {{ project.email_reminder }}
                    </p>
                </div>
                <div class="col-md-4 message">
                    <h4>
                        Email Timeout Notification
                        <span class="pull-right">
                            <button class="btn btn-xs btn-warning" tooltip="Edit Text" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></button>
                        </span>
                    </h4>
                    <p>
                        {{ project.email_timeout }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading pointer" ng-click="participants_collapse = !participants_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-user upb-blue"></span> Participants
                <span class="pull-right">
                    <button class="btn btn-default btn-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!participants_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="participants_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="participants_collapse">
            <div class="form-group" style="padding-bottom: 50px; ">
                <div class="pull-left" style="width: 80%;">
                    <a class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign"></span> Add Participant</a>
                    <a class="btn btn-default"><span class="glyphicon glyphicon-user"></span> Seed Participant</a>
                    <div class="btn-group">
                        <a class="btn btn-default"><span class="glyphicon glyphicon-import"></span> Import Participants</a>
                        <a class="btn btn-default"><span class="glyphicon glyphicon-export"></span> Export Participants</a>
                    </div>
                    <a class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span> Delete All Participants</a>
                </div>
                <div class="pull-right" style="width: 20%;">
                    <div class="input-group">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
                        <input type="text" ng-model="participants_filter" placeholder="Filter" class="form-control">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" ng-click="participants_filter=null" ng-disabled="!participants_filter"><span aria-hidden="true">&times;</span><span class="sr-only">Clear</span></button>
                        </span>
                    </div>
                </div>
            </div>
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
                        <th style="width: 22%;">
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
                            E-Mail
                            <div class="btn-group btn-group-xs pull-right">
                                <button type="button" class="btn btn-default" ng-click="order_predicate = 'email'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                                <button type="button" class="btn btn-default" ng-click="order_predicate = 'email'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                            </div>
                        </th>
                        <th style="width: 10%;">
                            Status
                            <div class="btn-group btn-group-xs pull-right">
                                <button type="button" class="btn btn-default" ng-click="order_predicate = 'status'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                                <button type="button" class="btn btn-default" ng-click="order_predicate = 'status'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                            </div>
                        </th>
                        <th style="width: 11%;">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="participant in participants_filtered = (participants | filter:participants_filter | orderBy:order_predicate:order_reverse)">
                        <td class="text-right">
                            {{ participant.id }}
                        </td>
                        <td>
                            <strong>{{ participant.first_name }}</strong>
                        </td>
                        <td>
                            {{ participant.last_name }}
                        </td>
                        <td>
                            {{ participant.email }}
                        </td>
                        <td>
                            <span class="label text-uppercase" ng-class="get_label_class(project.status);">{{ project.status }}</span>
                        </td>
                        <td class="text-center">
                            <div class="btn-group btn-group-sm">
                                <a href="/frontend/projects/edit_project/{{ project.key }}" class="btn btn-warning" tooltip="Edit Project" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                                <a href="/frontend/projects/delete_project/{{ project.key }}" class="btn btn-danger" tooltip="Delete Project" tooltip-append-to-body="true"><span class="glyphicon glyphicon-trash"></span></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="text-right">
                {{ participants_filtered.length }} {{ participants_filtered.length == 1 ? "Participant" : "Participants" }}
            </p>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading pointer" ng-click="cards_collapse = !cards_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-credit-card upb-blue"></span> Cards
                <span class="pull-right">
                    <button class="btn btn-default btn-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!cards_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="cards_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="cards_collapse">
            <div class="form-group" style="padding-bottom: 50px; ">
                <div class="pull-left" style="width: 69%;">
                    <a href="/frontend/projects/{{ project.key }}/add_card" class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign"></span> Add Card</a>
                    <div class="btn-group">
                        <a href="/frontend/projects/{{ project.key }}/import_cards" class="btn btn-default"><span class="glyphicon glyphicon-floppy-open"></span> Import Cards</a>
                        <a href="/server/projects/{{ project.key }}/cards/export_cards?api_key={{ api_key() }}" ng-disabled="cards.length == 0" class="btn btn-default" target="download_iframe"><span class="glyphicon glyphicon-floppy-save"></span> Export Cards</a>
                    </div>
                    <a href="/frontend/projects/{{ project.key }}/delete_all_cards" ng-disabled="cards.length == 0" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span> Delete All Cards</a>
                </div>
                <div class="pull-left" style="height: 33px; width: 10%; padding-top: 7px;">
                    <input type="range" id="card_zoom" ng-model="card_zoom" min="0.1" max="2.5" step="0.1" tooltip="Zoom ({{ card_zoom_percent }}%)" tooltip-append-to-body="true">
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
            <div class="card-container" ng-repeat="card in cards_filtered = (cards | filter:cards_filter)">
                <div class="card">
                    <div class="btn-group btn-group-sm card-controls">
                        <button ng-show="card.tooltip" class="btn btn-info" popover="{{ card.tooltip }}" popover-title="{{ card.text }}" popover-placement="top" popover-append-to-body="true"><span class="glyphicon glyphicon-question-sign"></span></button>
                        <a href="/frontend/projects/{{ project.key }}/edit_card/{{ card.id }}" class="btn btn-warning" tooltip="Edit Card" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></a>
                        <a href="/frontend/projects/{{ project.key }}/delete_card/{{ card.id }}" class="btn btn-danger" tooltip="Delete Card" tooltip-append-to-body="true"><span class="glyphicon glyphicon-trash"></span></a>
                    </div>
                    <div class="card-text">
                        {{ card.text }}
                    </div>
                </div>
            </div>
            <p class="text-right" style="clear: both;">
                {{ cards_filtered.length }} {{ cards_filtered.length == 1 ? "Card" : "Cards" }}
            </p>
        </div>
    </div>
</div>