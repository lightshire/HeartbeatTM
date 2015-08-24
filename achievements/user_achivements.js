(function (htbt) {
    'use strict';

    var heartbeat_access_token = htbt.util.get_cookie('heartbeat_access_token'),

        User_Points = React.createClass({displayName: "User_Points",
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
                    React.createElement("div", {id: "profile_header"}, 
                        React.createElement("h5", {className: "grey-text text-darken-1"}, 
                            this.state.first_name, " ", this.state.last_name, 
                            React.createElement("a", {id: "log_out", onClick: this.on_log_out}, "(Log out)")
                        ), 
                        React.createElement("div", {id: "profile_details"}, 
                            React.createElement("div", {className: "profile_row row"}, 
                                React.createElement("div", {className: "col s1 valign-wrapper"}, 
                                    React.createElement("i", {className: "valign material-icons"}, "email")
                                ), 
                                React.createElement("div", {className: "col s6 valign-wrapper"}, 
                                    React.createElement("div", {className: "valign"}, 
                                        React.createElement("a", {href: 'mailto:' + this.state.email}, this.state.email)
                                    )
                                )
                            ), 
                            React.createElement("div", {className: "profile_row row"}, 
                                React.createElement("div", {className: "col s1 valign-wrapper"}, 
                                    React.createElement("i", {className: "valign material-icons"}, "grade")
                                ), 
                                React.createElement("div", {className: "col s6 valign-wrapper"}, 
                                    React.createElement("div", {className: "valign"}, this.state.earned_points, " points")
                                )
                            ), 
                            React.createElement("div", {className: "profile_row row"}, 
                                React.createElement("div", {className: "col s1 valign-wrapper"}, 
                                    React.createElement("i", {className: "valign material-icons"}, "today")
                                ), 
                                React.createElement("div", {className: "col s6 valign-wrapper"}, 
                                    React.createElement("div", {className: "valign"}, "Last update on ", this.state.last_updated)
                                )
                            )
                        )
                    )
                );
            },

            on_log_out: function () {
                document.cookie = 'heartbeat_access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
                location.reload();
            }
        }),

        User_Rewarded_Actions = React.createClass($.extend(htbt.common_grid, {
            data_endpoint: htbt.config.backend + '/reward/user_actions',

            render: function () {
                var that = this;

                return (
                    React.createElement("div", {id: "rewarded_actions"}, 
                        React.createElement("table", {className: "striped"}, 
                            React.createElement("thead", null, 
                                React.createElement("tr", null, 
                                    React.createElement("th", null, "Action"), 
                                    React.createElement("th", null, "Rewarded Points"), 
                                    React.createElement("th", null, "Date")
                                )
                            ), 
                            React.createElement("tbody", null, 
                                
                                    _(this.state.data)
                                        .map(function (action) {
                                            return React.createElement("tr", {key: action._id}, 
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

            on_load_data: function (result) {
                _(result.items)
                    .forEach(function (item) {
                        item.timestamp = moment(item.timestamp).format('DD MMM YYYY HH:mm');
                    })
                    .commit();
            }
        })),

        Rewarded_Actions_Stats = React.createClass($.extend(htbt.common_grid, {
            data_endpoint: htbt.config.backend + '/user_actions_stats',

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
                                            return React.createElement("tr", {key: action._id}, 
                                                React.createElement("td", null, action.action_title), 
                                                React.createElement("td", null, action.rewarded_points)
                                            );
                                        })
                                        .value()
                                
                            )
                        )
                    )
                );
            }
        })),

        User_Achivements = React.createClass({displayName: "User_Achivements",
            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement(User_Points, null), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("ul", {id: "tab_user_achievement", className: "tabs"}, 
                                React.createElement("li", {className: "tab col s3"}, React.createElement("a", {href: "#tab_users"}, "Rewarded Actions")), 
                                React.createElement("li", {className: "tab col s3"}, React.createElement("a", {href: "#tab_actions"}, "Summary"))
                            ), 
                            React.createElement("div", {id: "tab_users"}, 
                                React.createElement(User_Rewarded_Actions, null)
                            ), 
                            React.createElement("div", {id: "tab_actions"}, 
                                React.createElement(Rewarded_Actions_Stats, null)
                            )
                        )
                    )
                );
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

        React.render(
            React.createElement(User_Achivements, null),
            $('#main_container')[0]
        );
    }

    start();
})(window.htbt = window.htbt || {});
