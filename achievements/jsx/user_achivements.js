(function (htbt) {
    'use strict';

    var heartbeat_access_token = htbt.util.get_cookie('heartbeat_access_token'),

        User_Points = React.createClass({
            getInitialState: function() {
                return {
                    email: '',
                    first_name: '',
                    last_name: '',
                    earned_points: '',
                    last_updated: ''
                };
            },

            componentDidMount: function() {
                var that = this;

                // load user points
                $('#loading').show();
                $.get(
                        htbt.config.backend + '/reward/user_points', 
                        {access_token: heartbeat_access_token}
                    )
                    .done(function (data) {
                        that.setState({
                            email: data.email,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            earned_points: data.earned_points,
                            last_updated: data.last_updated ? moment(data.last_updated).format('DD MMM YYYY HH:mm') : 'never'
                        });
                    })
                    .always(function () {
                        $('#loading').hide();
                    });
            },

            render: function () {
                return (
                    <div id='profile_header'>
                        <h5 className='grey-text text-darken-1'>
                            {this.state.first_name} {this.state.last_name}
                            <a id='log_out' onClick={this.on_log_out}>(Log out)</a>
                        </h5>
                        <div id='profile_details'>
                            <div className='profile_row row'>
                                <div className='col s1 valign-wrapper'>
                                    <i className='valign material-icons'>email</i>
                                </div>
                                <div className='col s6 valign-wrapper'>
                                    <div className='valign'>
                                        <a href={'mailto:' + this.state.email}>{this.state.email}</a>
                                    </div>
                                </div>
                            </div>
                            <div className='profile_row row'>
                                <div className='col s1 valign-wrapper'>
                                    <i className='valign material-icons'>grade</i>
                                </div>
                                <div className='col s6 valign-wrapper'>
                                    <div className='valign'>{this.state.earned_points} points</div>
                                </div>
                            </div>
                            <div className='profile_row row'>
                                <div className='col s1 valign-wrapper'>
                                    <i className='valign material-icons'>today</i>
                                </div>
                                <div className='col s6 valign-wrapper'>
                                    <div className='valign'>Last update on {this.state.last_updated}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            },

            on_log_out: function () {
                document.cookie = 'heartbeat_access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
                location.reload();
            }
        }),

        User_Rewarded_Actions = React.createClass($.extend(htbt.common_grid, {
            data_endpoint: htbt.config.backend + '/reward/user_actions',
            allow_sorting: true,
            columns: [
                {name: 'action_title', title: 'Action', default_sort_direction: 'asc'},
                {name: 'rewarded_points', title: 'Rewarded Points'},
                {name: 'timestamp', title: 'Date'},
            ],

            render: function () {
                var that = this;

                return (
                    <div id='rewarded_actions'>
                        <table className='striped'>
                            <thead>
                                {this.render_columns()}
                            </thead>
                            <tbody>
                                {
                                    _(this.state.data)
                                        .map(function (action) {
                                            return <tr key={action._id}>
                                                <td className={that.state.sort_column === 'action_title' ? 'sorting' : ''}>
                                                    <div className='action_title'>
                                                        <a onClick={that.on_show_action_details}>
                                                            {action.action_title}
                                                        </a>
                                                        <htbt.Action_Details action={action} data={action.data} />
                                                    </div>
                                                </td>
                                                <td className={that.state.sort_column === 'rewarded_points' ? 'sorting' : ''}>
                                                    {action.rewarded_points}
                                                </td>
                                                <td className={that.state.sort_column === 'rewarded_points' ? 'sorting' : ''}>
                                                    {action.timestamp}
                                                </td>
                                            </tr>;
                                        })
                                        .value()
                                }
                            </tbody>
                        </table>
                        {this.render_paging()}
                    </div>
                );
            },

            on_show_action_details: function (event) {
                var a = event.currentTarget,
                    $div = $(a).next();

                event.stopPropagation();
                event.nativeEvent.stopImmediatePropagation();

                $('.action_details').addClass('hide');
                $div.removeClass('hide');

                $(document).one('click', function () {
                    $div.addClass('hide');
                });
            },

            on_load_data: function (result) {
                _(result.items)
                    .forEach(function (item) {
                        item.timestamp = moment(item.timestamp).format('DD MMM YYYY HH:mm');
                    })
                    .commit();
            },

            on_sort: function () {
                this.load_data();
            }
        })),

        Rewarded_Actions_Stats = React.createClass($.extend(htbt.common_grid, {
            data_endpoint: htbt.config.backend + '/user_actions_stats',
            allow_sorting: true,
            columns: [
                {name: 'action_title', title: 'Action', default_sort_direction: 'asc'},
                {name: 'rewarded_points', title: 'Rewarded Points'}
            ],

            render: function () {
                var that = this,
                    filter = $.extend({
                            action_name: ''
                        }, this.state.filter)

                return (
                    <div id='rewarded_actions'>
                        <table className='striped'>
                            <thead>
                                {this.render_columns()}
                            </thead>
                            <tbody>
                                {
                                    _(this.state.data)
                                        .map(function (action) {
                                            return <tr key={action._id}>
                                                <td className={that.state.sort_column === 'action_title' ? 'sorting' : ''}>
                                                    {action.action_title}
                                                </td>
                                                <td className={that.state.sort_column === 'rewarded_points' ? 'sorting' : ''}>
                                                    {action.rewarded_points}
                                                </td>
                                            </tr>;
                                        })
                                        .value()
                                }
                            </tbody>
                        </table>
                    </div>
                );
            },

            on_sort: function () {
                var data = _(this.state.data).sortByOrder(
                    [this.state.sort_column], 
                    [this.state.sort_direction === 'asc']
                );

                this.setState({data: data});
            }
        })),

        User_Achivements = React.createClass({
            render: function () {
                return (
                    <div>
                        <User_Points />
                        <div className='row'>
                            <ul id='tab_user_achievement' className='tabs'>
                                <li className='tab col s3'><a href='#tab_users'>Rewarded Actions</a></li>
                                <li className='tab col s3'><a href='#tab_actions'>Summary</a></li>
                            </ul>
                            <div id='tab_users'>
                                <User_Rewarded_Actions />
                            </div>
                            <div id='tab_actions'>
                                <Rewarded_Actions_Stats />
                            </div>
                        </div>
                    </div>
                );
            },

            componentDidMount: function() {
                $('#tab_user_achievement').tabs();
            }
        });

    function start () {
        if (!heartbeat_access_token) {
            React.render(
                <htbt.Login_Section />,
                $('#main_container')[0]
            );
            return;
        }

        React.render(
            <User_Achivements />,
            $('#main_container')[0]
        );
    }

    start();
})(window.htbt = window.htbt || {});
