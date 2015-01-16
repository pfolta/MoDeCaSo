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
        <div class="panel-heading pointer collapsible" ng-click="settings_collapse = !settings_collapse">
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
        <div class="panel-heading pointer collapsible" ng-click="messages_collapse = !messages_collapse">
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
        <div class="panel-heading pointer collapsible" ng-click="participants_collapse = !participants_collapse">
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
                    Seed Participant: <span class="text-info"><span class="glyphicon glyphicon-user"></span> {{ participants[0].first_name }} {{ participants[0].last_name }}</span>
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
                    <button class="btn btn-default btn-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!cards_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="cards_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="cards_collapse">
            <div class="form-group" style="padding-bottom: 50px; ">
                <div class="pull-left" style="width: 55%;">
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
                <div class="pull-left text-center" style="width: 2%; padding-top: 7px;">
                    <span class="glyphicon glyphicon-zoom-out"></span>
                </div>
                <div class="pull-left" style="height: 33px; width: 10%; padding-top: 7px;">
                    <input type="range" id="card_zoom" ng-disabled="!card_view" ng-model="card_zoom" min="0.1" max="2.5" step="0.1" tooltip="Zoom ({{ card_zoom_percent }}%)" tooltip-append-to-body="true">
                </div>
                <div class="pull-left text-center" style="width: 2%; padding-top: 7px;">
                    <span class="glyphicon glyphicon-zoom-in"></span>
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