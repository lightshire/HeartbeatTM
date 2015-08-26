(function (htbt) {
    'use strict';

    var heartbeat_access_token = htbt.util.get_cookie('heartbeat_access_token');

    htbt.action_details = {
        add_a_good_comment: React.createClass({displayName: "add_a_good_comment",
            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Comment"), 
                            React.createElement("div", {className: "col s10"}, this.props.data.comment_text)
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Video"), 
                            React.createElement("div", {className: "col s10"}, 
                                React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
                                    this.props.data.video_id}, this.props.data.video_id
                                )
                            )
                        )
                    )
                );
            }
        }),

        fully_watch_a_video: React.createClass({displayName: "fully_watch_a_video",
            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Video"), 
                            React.createElement("div", {className: "col s10"}, 
                                React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
                                    this.props.data.video_id}, this.props.data.video_id
                                )
                            )
                        )
                    )
                );
            }
        }),

        discover_new_feature: React.createClass({displayName: "discover_new_feature",
            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Feature"), 
                            React.createElement("div", {className: "col s10"}, this.props.data.feature_name)
                        )
                    )
                );
            }
        }),

        listen_music_player: React.createClass({displayName: "listen_music_player",
            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "From"), 
                            React.createElement("div", {className: "col s10"}, 
                                moment(this.props.data.from_time).format('DD MMM YYYY HH:mm')
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "To"), 
                            React.createElement("div", {className: "col s10"}, 
                                moment(this.props.data.to_time).format('DD MMM YYYY HH:mm')
                            )
                        )
                    )
                );
            }
        }),

        tag_video: React.createClass({displayName: "tag_video",
            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Tag"), 
                            React.createElement("div", {className: "col s10"}, this.props.data.tag_name)
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Video"), 
                            React.createElement("div", {className: "col s10"}, 
                                React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
                                    this.props.data.video_id}, this.props.data.video_id
                                )
                            )
                        )
                    )
                );
            }
        }),

        untag_video: React.createClass({displayName: "untag_video",
            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Tag"), 
                            React.createElement("div", {className: "col s10"}, this.props.data.tag_name)
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Video"), 
                            React.createElement("div", {className: "col s10"}, 
                                React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
                                    this.props.data.video_id}, this.props.data.video_id
                                )
                            )
                        )
                    )
                );
            }
        }),

        discover_new_channel: React.createClass({displayName: "discover_new_channel",
            render: function () {
                var link = '',
                    website = (this.props.data.website || '')
                        .replace('www.', '')
                        .replace('https://', '')
                        .replace('http://', '')
                        .toLowerCase();

                switch (website) {
                    case 'hitbox.tv':
                        link = 'http://www.hitbox.tv/' + this.props.data.username;
                        website = 'http://www.hitbox.tv';
                        break;
                    case 'youtube.com':
                        link = 'https://www.youtube.com/channel/' + this.props.data.channel_id;
                        website = 'https://www.youtube.com';
                        break;
                    case 'twitch.tv':
                        link = 'http://www.twitch.tv/' + this.props.data.channel_id;
                        website = 'http://www.twitch.tv';
                        break;
                }

                if (!~link.indexOf('http')){
                    link = 'http://' + link;
                }
            
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Channel"), 
                            React.createElement("div", {className: "col s10"}, 
                                React.createElement("a", {href: link}, this.props.data.channel_id)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Platform"), 
                            React.createElement("div", {className: "col s10"}, 
                                React.createElement("a", {href: website}, website)
                            )
                        )
                    )
                );
            }
        }),

        subscribe_a_channel: React.createClass({displayName: "subscribe_a_channel",
            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Channel"), 
                            React.createElement("div", {className: "col s10"}, 
                                React.createElement("a", {href: 'https://www.youtube.com/channel/' + 
                                    this.props.data.channel_id}, this.props.data.channel_id
                                )
                            )
                        )
                    )
                );
            }
        }),

        unsubscribe_a_channel: React.createClass({displayName: "unsubscribe_a_channel",
            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Channel"), 
                            React.createElement("div", {className: "col s10"}, 
                                React.createElement("a", {href: 'https://www.youtube.com/channel/' + 
                                    this.props.data.channel_id}, this.props.data.channel_id
                                )
                            )
                        )
                    )
                );
            }
        }),

        copy_annotations: React.createClass({displayName: "copy_annotations",
            render: function () {
                var video_ids = this.props.data.video_ids;

                if (typeof(video_ids) === 'string') {
                    video_ids = video_ids.split(',');
                }

                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Source"), 
                            React.createElement("div", {className: "col s10"}, 
                                React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
                                    this.props.data.src_video_id}, this.props.data.src_video_id
                                )
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Videos"), 
                            React.createElement("div", {className: "col s10"}, 
                                
                                    _(video_ids)
                                        .map(function (video_id) {
                                            return React.createElement("a", {className: "inline_video", 
                                                        href: 'https://www.youtube.com/watch?v=' + video_id}, 
                                                        video_id
                                                    );
                                        })
                                        .value()
                                
                            )
                        )
                    )
                );
            }
        }),

        use_videobar: React.createClass({displayName: "use_videobar",
            render: function () {
                var video_ids = this.props.data.video_ids;

                if (typeof(video_ids) === 'string') {
                    video_ids = video_ids.split(',');
                }

                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col s2"}, "Videos"), 
                            React.createElement("div", {className: "col s10"}, 
                                
                                    _(video_ids)
                                        .map(function (video_id) {
                                            return React.createElement("a", {className: "inline_video", 
                                                        href: 'https://www.youtube.com/watch?v=' + video_id}, 
                                                        video_id
                                                    );
                                        })
                                        .value()
                                
                            )
                        )
                    )
                );
            }
        })
    };

    htbt.Action_Details = React.createClass({displayName: "Action_Details",
        on_card_click: function (event) {
            event.stopPropagation();
        },

        render: function () {
            var elem = htbt.action_details[this.props.action.action_name];

            if (elem) {
                elem = React.createElement(elem, { data: this.props.data });
            }

            return (
                React.createElement('div', {
                        className: 'action_details card hide',
                        onClick: this.on_card_click
                    }, 
                    React.createElement('div', {className: 'card-content'}, 
                        elem || 'No information to display'
                    )
                )
            );
        }
    });

    htbt.Login_Section = React.createClass({displayName: "Login_Section",
        render: function () {
            return (
                React.createElement("div", {className: "row center"}, 
                    React.createElement("br", null), 
                    React.createElement("br", null), 
                    React.createElement("a", {
                        id: "login", 
                        href: htbt.config.login_url + '?service=heartbeat'
                            + '&response_type=code&roles=profile,email,partner'
                            + '&redirect_uri=' + encodeURIComponent(location.origin + '/login_callback.html')
                            + '&state=' + encodeURIComponent(location.href.split('#')[0]), 
                        className: "waves-effect waves-light red darken-2 btn-large"}, 
                        React.createElement("i", {className: "mdi-social-person left"}), 
                        "Login"
                    )
                 )
            );
        }
    });

    htbt.Error = React.createClass({displayName: "Error",
        render: function () {
            return (
                React.createElement("div", {className: "error_message"}, 
                    this.props.message
                 )
            );
        }
    });

    htbt.common_grid = {
        min_page: 1,
        max_page: 1,
        page_size: 10,
        allow_paging: true,

        getInitialState: function() {
            return {
                data: [],
                current_page: 0,
                total_pages: 0,
                filter: {}
            };
        },

        componentDidMount: function() {
            this.load_data(0);
        },

        change_page: function (page) {
            if (page === this.state.current_page) {
                return;
            }

            this.setState({
                current_page: page
            });

            this.load_data(page);
        },

        on_prev_page: function () {
            var current_page = this.state.current_page > 1
                    ? this.state.current_page - 1
                    : 0;

            this.change_page(current_page);
        },

        on_next_page: function () {
            var current_page = this.state.current_page < this.state.total_pages - 1
                    ? this.state.current_page + 1
                    : this.state.total_pages - 1;

            this.change_page(current_page);
        },

        on_goto_page: function (event) {
            var a = event.currentTarget,
                current_page = parseInt(a.innerText) - 1;

            this.change_page(current_page);
        },

        render: function () {},

        render_paging: function () {
            var that = this,
                step = 5,
                current_page = this.state.current_page + 1,
                pages = [];

            if (current_page === this.min_page ||
                current_page === this.max_page) {
                this.min_page = Math.max(current_page - step, 1);
                this.max_page = Math.min(current_page + step, this.state.total_pages);
            }

            for(var i = this.min_page; i <= this.max_page; i++) {
                pages.push(i);
            }

            return React.createElement("div", {className: "center-align"}, 
                React.createElement("ul", {id: "data_pager", className: "pagination"}, 
                    React.createElement("li", {onClick: this.on_prev_page, className: this.state.current_page ? 'waves-effect' : 'disabled'}, 
                        React.createElement("a", null, React.createElement("i", {className: "material-icons"}, "chevron_left"))
                    ), 
                    
                        _(pages)
                            .map(function (page) {
                                var class_name = that.state.current_page === (page-1) ? 'active' : 'waves-effect';
                                return React.createElement("li", {onClick: that.on_goto_page, className: class_name}, React.createElement("a", null, page));
                            })
                            .value(), 
                    
                    React.createElement("li", {onClick: this.on_next_page, 
                        className: this.state.current_page + 1 < this.state.total_pages ? 'waves-effect' : 'disabled'}, 
                        React.createElement("a", null, React.createElement("i", {className: "material-icons"}, "chevron_right"))
                    )
                )
            );
        },

        load_data: function (current_page) {
            var that = this,
                skip = this.allow_paging ? (current_page || 0) * this.page_size: undefined,
                counter = this.loading || 0,
                filter = $.extend({
                        access_token: heartbeat_access_token,
                        skip: skip,
                        limit: this.page_size
                    }, this.state.filter);

                this.loading = ++counter;

                that.on_filter && that.on_filter(filter);

                $('#loading').show();
                $.get(this.data_endpoint, filter)
                    .done(function (result) {
                        var total_pages = 0;

                        if (counter !== that.loading) {
                            return;
                        }

                        that.on_load_data && that.on_load_data(result);

                        if (!that.allow_paging) {
                            that.setState({data: result.items});
                            return;
                        }

                        total_pages = Math.floor(result.total / that.page_size) +
                            (result.total % that.page_size ? 1 : 0);

                        that.setState({
                            data: result.items,
                            total_pages: total_pages
                        });
                    })
                    .always(function () {
                        $('#loading').hide();
                    });
        },

        search: function (filter) {
            this.setState({filter: filter}, this.load_data);
        }
    };

})(window.htbt = window.htbt || {});
