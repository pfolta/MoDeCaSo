<div class="page">
    <h1>
        Project Results for {{ project.key }}
    </h1>

    <div class="form-group" style="padding-bottom: 50px; ">
        <div class="pull-right">
            <a ui-sref="/projects/overview" class="btn btn-default"><span class="glyphicon glyphicon-list"></span> View All Projects</a>
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading pointer collapsible" ng-click="participants_collapse = !participants_collapse">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-user upb-blue"></span> Participant Results
                <span class="pull-right">
                    <button class="btn btn-default btn-circle-xs">
                        <span class="glyphicon glyphicon-chevron-up" ng-show="!participants_collapse"></span>
                        <span class="glyphicon glyphicon-chevron-down" ng-show="participants_collapse"></span>
                    </button>
                </span>
            </h3>
        </div>
        <div class="panel-body" collapse="participants_collapse">
            <div style="padding-bottom: 25px;">
                <h4>
                    Seed Participant: <span class="upb-blue"><span class="glyphicon glyphicon-user"></span> {{ get_seed() }}</span>
                </h4>
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
                <tbody>
                <tr ng-repeat="participant in participants">
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
                            <a ng-disabled="participant.status != 'COMPLETED'" href="/frontend/projects/participant_results/{{ project.key }}/{{ participant.id }}" class="btn btn-info"><span class="glyphicon glyphicon-eye-open"></span> View Model</a>
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
</div>