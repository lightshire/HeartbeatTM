(function (htbt) {
    'use strict';

    var heartbeat_access_token = htbt.util.get_cookie('heartbeat_access_token'),

        User_Actions_Filter = React.createClass({
            getInitialState: function() {
                return {
                    search: ''
                };
            },

            render: function () {
                var that = this,
                    selected = this.state.selected_action || '';

                return  (
                    <div className='row'>
                        <div className='input-field col s3'>
                            <input id='username' type='text' onKeyUp={this.on_username_change} />
                            <label for='username'>Search</label>
                        </div>
                    </div>
                );
            },

            on_username_change: function (evt) {
                var that = this,
                    value = evt.target.value;

                clearTimeout(this.search_timeout);
                this.search_timeout = setTimeout(function () {
                    that.setState({search: value}, that.trigger_change);
                }, 1000);
            },

            trigger_change: function () {
                if (this.props.on_change) {
                    this.props.on_change({
                        username: this.state.search
                    });
                }
            }
        }),

        User_Rewarded_Actions_Filter = React.createClass({
            getInitialState: function() {
                return {
                    search: '',
                    selected_action: null,
                    actions: []
                };
            },

            componentDidMount: function() {
                this.load_rewards();
            },

            render: function () {
                var that = this,
                    selected = this.state.selected_action || '';

                return  (
                    <div className='row'>
                        <div className='input-field col s3'>
                            <input ref='txt_username' id='username' type='text' onKeyUp={this.on_username_change} />
                            <label for='username'>Search</label>
                        </div>
                        <div className='input-field col s5'>
                            <select ref='ddl_action' className='browser-default' value={selected} onChange={this.on_action_change}>
                                <option value=''>All</option>
                                {
                                    _(this.state.actions)
                                        .map(function (action) {
                                            return <option value={action.action_name}>
                                                    {action.action_title}
                                                </option>;
                                        })
                                        .value()
                                }
                            </select>
                            <label className='active'>Action</label>
                        </div>
                    </div>
                );
            },

            on_username_change: function (evt) {
                var that = this,
                    value = evt.target.value;

                clearTimeout(this.search_timeout);
                this.search_timeout = setTimeout(function () {
                    that.setState({search: value}, that.trigger_change);
                }, 1000);
            },

            on_action_change: function (evt) {
                this.setState({selected_action: evt.target.value}, this.trigger_change);
            },

            trigger_change: function () {
                if (this.props.on_change) {
                    this.props.on_change({
                        username: this.state.search,
                        action_name: this.state.selected_action
                    });
                }
            },

            load_rewards: function () {
                var that = this;

                $.get(htbt.config.backend + '/rewards')
                    .done(function (result) {
                        that.setState({
                            actions: result,
                            selected_action: ''
                        });
                    });
            },

            update_filter: function (filter) {
                var search = (filter && filter.username) || '',
                    action_name = (filter && filter.action_name) || '';

                this.refs.txt_username.getDOMNode().value = search;
                this.refs.ddl_action.getDOMNode().value = action_name;
                this.setState({
                    search: search,
                    selected_action: action_name,
                }, this.trigger_change);
            }
        }),

        Rewarded_Actions_Filter = React.createClass({
            getInitialState: function() {
                return {
                    selected_action: null,
                    actions: []
                };
            },

            componentDidMount: function() {
                this.load_rewards();
            },

            render: function () {
                var that = this,
                    selected = this.state.selected_action || '';

                return  (
                    <div className='row'>
                        <div className='input-field col s5'>
                            <select className='browser-default' value={selected} onChange={this.on_action_change}>
                                <option value=''>All</option>
                                {
                                    _(this.state.actions)
                                        .map(function (action) {
                                            return <option value={action.action_name}>
                                                    {action.action_title}
                                                </option>;
                                        })
                                        .value()
                                }
                            </select>
                            <label className='active'>Action</label>
                        </div>
                    </div>
                );
            },

            on_action_change: function (evt) {
                this.setState({selected_action: evt.target.value}, this.trigger_change);
            },

            trigger_change: function () {
                if (this.props.on_change) {
                    this.props.on_change({
                        username: this.state.search,
                        action_name: this.state.selected_action
                    });
                }
            },

            load_rewards: function () {
                var that = this;

                $.get(htbt.config.backend + '/rewards')
                    .done(function (result) {
                        that.setState({
                            actions: result,
                            selected_action: ''
                        });
                    });
            }
        }),

        User_Rewarded_Actions = React.createClass($.extend({}, htbt.common_grid, {
            data_endpoint: htbt.config.backend + '/reward/rewarded_actions',
            allow_sorting: true,
            columns: [
                {name: 'username', title: 'Username', default_sort_direction: 'asc'},
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
                                                <td className={that.state.sort_column === 'username' ? 'sorting' : ''}>
                                                    <a onClick={that.on_show_user_details}>{action.username}</a><div></div>
                                                </td>
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
                                                <td className={that.state.sort_column === 'timestamp' ? 'sorting' : ''}>
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

            on_show_user_details: function (event) {
                var a = event.currentTarget,
                    username = a.innerText,
                    $div = $(a).next(),
                    that = this;

                $('#loading').show();
                $.get(
                        htbt.config.backend + '/reward/user_points', 
                        {
                            access_token: heartbeat_access_token,
                            username: username
                        }
                    )
                    .done(function (data) {
                        var user = {
                                earned_points: data.earned_points,
                                last_updated: data.last_updated ? moment(data.last_updated).format('DD MMM YYYY HH:mm') : 'never'
                            };

                        React.render(
                            <User_Details user={user} />,
                            $div[0]
                        );

                        $(document).one('click', function () {
                            $('.user_card').remove();
                        });
                    })
                    .always(function () {
                        $('#loading').hide();
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

        Rewarded_Users = React.createClass($.extend({}, htbt.common_grid, {
            data_endpoint: htbt.config.backend + '/reward/rewarded_users',
            allow_sorting: true,
            columns: [
                {name: 'username', title: 'Username', default_sort_direction: 'asc'},
                {name: 'earned_points', title: 'Rewarded Points'},
                {name: 'last_updated', title: 'Date'}
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
                                                <td className={that.state.sort_column === 'username' ? 'sorting' : ''}>
                                                    <a onClick={that.on_show_user_details}>{action.username}</a>
                                                    <div></div>
                                                </td>
                                                <td className={that.state.sort_column === 'earned_points' ? 'sorting' : ''}>
                                                    {action.earned_points}
                                                </td>
                                                <td className={that.state.sort_column === 'last_updated' ? 'sorting' : ''}>
                                                    {action.last_updated}
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

            on_show_user_details: function (event) {
                var a = event.currentTarget,
                    username = a.innerText;

                this.props.goto_user && this.props.goto_user(username);
            },

            on_load_data: function (result) {
                _(result.items)
                    .forEach(function (item) {
                        item.last_updated = moment(item.last_updated).format('DD MMM YYYY HH:mm');
                    })
                    .commit();
            },

            on_sort: function () {
                this.load_data();
            }
        })),

        Rewarded_Actions = React.createClass($.extend({}, htbt.common_grid, {
            data_endpoint: htbt.config.backend + '/rewarded_actions_stats',
            allow_paging: false,
            allow_sorting: true,
            columns: [
                {name: 'action_title', title: 'Action', default_sort_direction: 'asc'},
                {name: 'rewarded_points', title: 'Rewarded Points'}
            ],

            render: function () {
                var that = this,
                    filter = $.extend({action_name: ''}, this.state.filter);

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
                                            if (filter.action_name && action._id !== filter.action_name) {
                                                return null;
                                            }

                                            return <tr key={action._id}>
                                                <td className={that.state.sort_column === 'action_title' ? 'sorting' : ''}>
                                                    <div className='action_title'>
                                                        <a data-action={action._id} onClick={that.on_view_action_details}>
                                                            {action.action_title}
                                                        </a>
                                                    </div>
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

            on_view_action_details: function () {
                var a = event.target,
                    action_name = a.getAttribute('data-action');

                this.props.goto_action && this.props.goto_action(action_name);
            },

            on_sort: function () {
                var data = _(this.state.data).sortByOrder(
                    [this.state.sort_column], 
                    [this.state.sort_direction === 'asc']
                );

                this.setState({data: data});
            }
        })),

        User_Details = React.createClass({
            on_card_click: function (event) {
                event.stopPropagation();
            },

            render: function () {
                return (
                    <div className='user_card action_details card' onClick={this.on_card_click}>
                        <div className='card-content'>
                            <div className='row'>
                                <div className='col s4'>Points</div>
                                <div className='col s8'>
                                    {this.props.user.earned_points}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s4'>Last update on</div>
                                <div className='col s8'>
                                    {this.props.user.last_updated}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }),

        Log_out = React.createClass({
            render: function () {
                return (
                    <a onClick={this.on_log_out}>Log out</a>
                );
            },

            on_log_out: function () {
                document.cookie = 'heartbeat_access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
                location.reload();
            }
        }),

        User_Achivements = React.createClass({
            render: function () {
                return (
                    <div className='row'>
                        <ul id='tab_user_achievement' className='tabs'>
                            <li className='tab col s3'><a href='#tab_users'>Rewarded Users</a></li>
                            <li className='tab col s3'><a href='#tab_actions'>Rewarded Actions</a></li>
                            <li className='tab col s3'><a href='#tab_user_actions'>Rewarded Actions Details</a></li>
                        </ul>
                        <div id='tab_users'>
                            <User_Actions_Filter on_change={this.search_user} />
                            <Rewarded_Users ref={'grid_user'} goto_user={this.goto_user}  />
                        </div>
                        <div id='tab_actions'>
                            <Rewarded_Actions_Filter on_change={this.search_action} />
                            <Rewarded_Actions ref={'grid_action'} goto_action={this.goto_action} />
                        </div>
                        <div id='tab_user_actions'>
                            <User_Rewarded_Actions_Filter ref={'filter_action'} on_change={this.search_user_action} />
                            <User_Rewarded_Actions ref={'grid_user_action'} />
                        </div>
                    </div>
                );
            },

            search_user: function (filter) {
                this.refs.grid_user.search(filter);
            },

            search_action: function (filter) {
                this.refs.grid_action.search(filter);
            },

            search_user_action: function (filter) {
                this.refs.grid_user_action.search(filter);
            },

            goto_user: function (username) {
                this.refs.filter_action.update_filter({username: username});
                $('ul.tabs').tabs('select_tab', 'tab_user_actions');
            },

            goto_action: function (action_name) {
                this.refs.filter_action.update_filter({action_name: action_name});
                $('ul.tabs').tabs('select_tab', 'tab_user_actions');
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

        $('#loading').show();
        $.get(htbt.config.backend + '/is_admin', {access_token: heartbeat_access_token})
            .done(function (result) {
                if (result.is_admin) {

                    React.render(
                        <User_Achivements />,
                        $('#main_container')[0]
                    );

                    React.render(
                        <Log_out />,
                        $('#log_out_container')[0]
                    );

                    return;
                }

                React.render(
                    <htbt.Error message={'Unauthorized access'} />,
                    $('#main_container')[0]
                );
            })
            .always(function () {
                $('#loading').hide();
            });
    }

    start();
})(window.htbt = window.htbt || {});
