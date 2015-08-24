(function (htbt) {
    'use strict';

    var heartbeat_access_token = htbt.util.get_cookie('heartbeat_access_token'),

        User_Actions_Filter = React.createClass({displayName: "User_Actions_Filter",
            getInitialState: function() {
                return {
                    search: ''
                };
            },

            render: function () {
                var that = this,
                    selected = this.state.selected_action || '';

                return  (
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "input-field col s3"}, 
                            React.createElement("input", {placeholder: "type username...", 
                                id: "username", type: "text", onKeyUp: this.on_username_change}), 
                            React.createElement("label", {for: "username"}, "Search")
                        )
                    )
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

        User_Rewarded_Actions_Filter = React.createClass({displayName: "User_Rewarded_Actions_Filter",
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
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "input-field col s3"}, 
                            React.createElement("input", {ref: "txt_username", placeholder: "type username...", id: "username", 
                                type: "text", onKeyUp: this.on_username_change}), 
                            React.createElement("label", {for: "username"}, "Search")
                        ), 
                        React.createElement("div", {className: "input-field col s5"}, 
                            React.createElement("select", {ref: "ddl_action", className: "browser-default", value: selected, onChange: this.on_action_change}, 
                                React.createElement("option", {value: ""}, "All"), 
                                
                                    _(this.state.actions)
                                        .map(function (action) {
                                            return React.createElement("option", {value: action.action_name}, 
                                                    action.action_title
                                                );
                                        })
                                        .value()
                                
                            ), 
                            React.createElement("label", {className: "active"}, "Action")
                        )
                    )
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

        Rewarded_Actions_Filter = React.createClass({displayName: "Rewarded_Actions_Filter",
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
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "input-field col s5"}, 
                            React.createElement("select", {className: "browser-default", value: selected, onChange: this.on_action_change}, 
                                React.createElement("option", {value: ""}, "All"), 
                                
                                    _(this.state.actions)
                                        .map(function (action) {
                                            return React.createElement("option", {value: action.action_name}, 
                                                    action.action_title
                                                );
                                        })
                                        .value()
                                
                            ), 
                            React.createElement("label", {className: "active"}, "Action")
                        )
                    )
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

            render: function () {
                var that = this;

                return (
                    React.createElement("div", {id: "rewarded_actions"}, 
                        React.createElement("table", {className: "striped"}, 
                            React.createElement("thead", null, 
                                React.createElement("tr", null, 
                                    React.createElement("th", null, "Username"), 
                                    React.createElement("th", null, "Action"), 
                                    React.createElement("th", null, "Rewarded Points"), 
                                    React.createElement("th", null, "Date")
                                )
                            ), 
                            React.createElement("tbody", null, 
                                
                                    _(this.state.data)
                                        .map(function (action) {
                                            return React.createElement("tr", {key: action._id}, 
                                                React.createElement("td", null, React.createElement("a", {onClick: that.on_show_user_details}, action.username), React.createElement("div", null)), 
                                                React.createElement("td", null, 
                                                    React.createElement("div", {className: "action_title"}, 
                                                        React.createElement("a", {onClick: that.on_show_action_details}, 
                                                            action.action_title
                                                        ), 
                                                        React.createElement(htbt.Action_Details, {action: action, data: action.data})
                                                    )
                                                ), 
                                                React.createElement("td", null, action.rewarded_points), 
                                                React.createElement("td", null, action.timestamp)
                                            );
                                        })
                                        .value()
                                
                            )
                        ), 
                        this.render_paging()
                    )
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
                            React.createElement(User_Details, {user: user}),
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
            }
        })),

        Rewarded_Users = React.createClass($.extend({}, htbt.common_grid, {
            data_endpoint: htbt.config.backend + '/reward/rewarded_users',

            render: function () {
                var that = this;

                return (
                    React.createElement("div", {id: "rewarded_actions"}, 
                        React.createElement("table", {className: "striped"}, 
                            React.createElement("thead", null, 
                                React.createElement("tr", null, 
                                    React.createElement("th", null, "Username"), 
                                    React.createElement("th", null, "Rewarded Points"), 
                                    React.createElement("th", null, "Last Update")
                                )
                            ), 
                            React.createElement("tbody", null, 
                                
                                    _(this.state.data)
                                        .map(function (action) {
                                            return React.createElement("tr", {key: action._id}, 
                                                React.createElement("td", null, React.createElement("a", {onClick: that.on_show_user_details}, action.username), React.createElement("div", null)), 
                                                React.createElement("td", null, action.earned_points), 
                                                React.createElement("td", null, action.last_updated)
                                            );
                                        })
                                        .value()
                                
                            )
                        ), 
                        this.render_paging()
                    )
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
            }
        })),

        Rewarded_Actions = React.createClass($.extend({}, htbt.common_grid, {
            data_endpoint: htbt.config.backend + '/rewarded_actions_stats',
            allow_paging: false,

            render: function () {
                var that = this,
                    filter = $.extend({
                            action_name: ''
                        }, this.state.filter)

                return (
                    React.createElement("div", {id: "rewarded_actions"}, 
                        React.createElement("table", {className: "striped"}, 
                            React.createElement("thead", null, 
                                React.createElement("tr", null, 
                                    React.createElement("th", null, "Action"), 
                                    React.createElement("th", null, "Rewarded Points")
                                )
                            ), 
                            React.createElement("tbody", null, 
                                
                                    _(this.state.data)
                                        .map(function (action) {
                                            if (filter.action_name && action._id !== filter.action_name) {
                                                return null;
                                            }

                                            return React.createElement("tr", {key: action._id}, 
                                                React.createElement("td", null, 
                                                    React.createElement("div", {className: "action_title"}, 
                                                        React.createElement("a", {"data-action": action._id, onClick: that.on_view_action_details}, 
                                                            action.action_title
                                                        )
                                                    )
                                                ), 
                                                React.createElement("td", null, action.rewarded_points)
                                            );
                                        })
                                        .value()
                                
                            )
                        )
                    )
                );
            },

            on_view_action_details: function () {
                var a = event.target,
                    action_name = a.getAttribute('data-action');

                this.props.goto_action && this.props.goto_action(action_name);
            }
        })),

        User_Details = React.createClass({displayName: "User_Details",
            on_card_click: function (event) {
                event.stopPropagation();
            },

            render: function () {
                return (
                    React.createElement("div", {className: "user_card action_details card", onClick: this.on_card_click}, 
                        React.createElement("div", {className: "card-content"}, 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: "col s4"}, "Points"), 
                                React.createElement("div", {className: "col s8"}, 
                                    this.props.user.earned_points
                                )
                            ), 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: "col s4"}, "Last update on"), 
                                React.createElement("div", {className: "col s8"}, 
                                    this.props.user.last_updated
                                )
                            )
                        )
                    )
                );
            }
        }),

        Log_out = React.createClass({displayName: "Log_out",
            render: function () {
                return (
                    React.createElement("a", {onClick: this.on_log_out}, "Log out")
                );
            },

            on_log_out: function () {
                document.cookie = 'heartbeat_access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
                location.reload();
            }
        }),

        User_Achivements = React.createClass({displayName: "User_Achivements",
            render: function () {
                return (
                    React.createElement("div", {className: "row"}, 
                        React.createElement("ul", {id: "tab_user_achievement", className: "tabs"}, 
                            React.createElement("li", {className: "tab col s3"}, React.createElement("a", {href: "#tab_users"}, "Rewarded Users")), 
                            React.createElement("li", {className: "tab col s3"}, React.createElement("a", {href: "#tab_actions"}, "Rewarded Actions")), 
                            React.createElement("li", {className: "tab col s3"}, React.createElement("a", {href: "#tab_user_actions"}, "Rewarded Actions Details"))
                        ), 
                        React.createElement("div", {id: "tab_users"}, 
                            React.createElement(User_Actions_Filter, {on_change: this.search_user}), 
                            React.createElement(Rewarded_Users, {ref: 'grid_user', goto_user: this.goto_user})
                        ), 
                        React.createElement("div", {id: "tab_actions"}, 
                            React.createElement(Rewarded_Actions_Filter, {on_change: this.search_action}), 
                            React.createElement(Rewarded_Actions, {ref: 'grid_action', goto_action: this.goto_action})
                        ), 
                        React.createElement("div", {id: "tab_user_actions"}, 
                            React.createElement(User_Rewarded_Actions_Filter, {ref: 'filter_action', on_change: this.search_user_action}), 
                            React.createElement(User_Rewarded_Actions, {ref: 'grid_user_action'})
                        )
                    )
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
                React.createElement(htbt.Login_Section, null),
                $('#main_container')[0]
            );
            return;
        }

        $('#loading').show();
        $.get(htbt.config.backend + '/is_admin', {access_token: heartbeat_access_token})
            .done(function (result) {
                if (result.is_admin) {

                    React.render(
                        React.createElement(User_Achivements, null),
                        $('#main_container')[0]
                    );

                    React.render(
                        React.createElement(Log_out, null),
                        $('#log_out_container')[0]
                    );

                    return;
                }

                React.render(
                    React.createElement(htbt.Error, {message: 'Unauthorized access'}),
                    $('#main_container')[0]
                );
            })
            .always(function () {
                $('#loading').hide();
            });
    }

    start();
})(window.htbt = window.htbt || {});
