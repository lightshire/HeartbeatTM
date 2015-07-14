(function (htbt) {
    'use strict';

    var session,
        channel = {},
        active_video,
        on_video = false,
        already_checked = false,

        get_id = function (e, type) {
            return e.id.split('_' + type)[0];
        },

        suc_cb = function (data) {
            toastr.options.positionClass = 'toast-top-left';
            toastr.success(data.message);
        },

        err_cb = function (err) {
            toastr.options.positionClass = 'toast-top-left';
            toastr.error(err.responseText || 'An unexpected error occured');
        },

        /*Commenters tab functions*/

        get_commenters = function (page, search, video_id) {
            var container = on_video 
                ? $('#videos')[0]
                : $('#commenters')[0];

            React.render(
                <htbt.crm.Loader />,
                container
            );

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/crm/get_commenters',
                
                data: {
                    channel_id: channel.id,
                    video_id: video_id,
                    page: page,
                    search: search || '',
                    limit: 20
                },
                
                success: function (data) {
                    render_commenters(data, page);
                },

                error: function (err) {
                    if (video_id && !already_checked) {
                        already_checked = true;

                        if (search) {
                            React.render(
                                <div className="center-align">
                                    <htbt.crm.Error data={'No results found. Returning to commenters.'} />
                                </div>,
                                container
                            );

                            setTimeout(function () {
                                get_commenters(1, null, video_id);
                            }, 3000);

                            return;
                        }

                        return cache_comments(video_id, null);
                    }

                    if (err.status === 404) {
                        if (search) {
                            React.render(
                                <div className="center-align">
                                    <htbt.crm.Error data={'No results found. Returning to commenters.'} />
                                </div>,
                                container
                            );

                            setTimeout(function () {
                                get_commenters(1, null, video_id);
                            }, 3000);


                            return;
                        }

                        if (video_id && already_checked) {
                            React.render(
                                <div className="center-align">
                                    <htbt.crm.Error data={'No commenters found. Returning to video list.'} />
                                </div>,
                                container
                            );

                            already_checked = false;

                            setTimeout(function () {
                                get_videos();
                            }, 3000);

                            return;
                        }

                        React.render(
                            <div className="center-align">
                                <htbt.crm.NoCommenters />
                            </div>,
                            container
                        );

                        $('#retrieve-all')
                            .click(function () {
                                cache_comments(null, null);
                            });

                        $('#retrieve-certain')
                            .click(function () {
                                $('#retrieve-modal').openModal();
                            });

                        $('#retrieve')
                            .click(function () {
                                cache_comments(null, $('#video-count').val());
                            });

                        return;
                    }

                    err_cb(err);
                }
            });
        },

        cache_comments = function (id, latest) {
            var container = on_video 
                ? $('#videos')[0] 
                : $('#commenters')[0];

            React.render(
                <div>
                    <htbt.crm.Retrieving />
                    <htbt.crm.Loader />
                </div>,
                container
            );

            $.ajax({
                type: 'POST',
                url: htbt.config.backend + '/crm/cache_comments',

                data: {
                    channel_id: channel.id,
                    video_id: id,
                    latest: latest
                },

                success: function () {
                    get_commenters(1, null, id);
                },

                error: function (err) {
                    if (err.status === 403) {
                        React.render(
                            <div className="center-align">
                                <htbt.crm.Error data={'Comments are disabled. Returning to video list.'} />
                            </div>,
                            container
                        );

                        setTimeout(function () {
                            get_videos();
                        }, 3000);

                        return;
                    }

                    err_cb(err);
                }
            });
        },

        render_commenters = function (data, page) {
            already_checked = false;

            if (!on_video) {
                React.render(
                    <htbt.crm.Commenter data={data} />,
                    $('#commenters')[0]
                );

                bind_commenters(data, page);
                return;
            }

            $.ajax({
                type: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/videos',

                data: {
                    id: active_video.id,
                    key: htbt.config.google_api_key,
                    part: 'statistics'
                },

                success: function (result) {
                    if (!result.items.length) {
                        active_video.statistics.viewCount = 0;
                        active_video.statistics.commentCount = 0;
                        active_video.statistics.likeCount = 0;
                        active_video.statistics.dislikeCount = 0;
                    }

                    if (result.items[0].statistics) {
                        active_video.statistics = result.items[0].statistics;
                    }

                    React.render(
                        <div>
                            <htbt.crm.ActiveVideo data={active_video}/>
                            <htbt.crm.Commenter data={data} />
                        </div>,
                        $('#videos')[0]
                    );

                    $('#back-to-videos')
                        .click(function () {
                            get_videos();
                        });

                    $('.sync')
                        .click(function () {
                            cache_comments(this.id, null);
                        });

                    bind_commenters(data, page);
                },

                error: err_cb
            });
        },

        bind_commenters = function (data, page) {
            var container = on_video ? '#videos' : '#commenters';

            $('.collapsible').collapsible({
                accordion : false 
            });

            $(container + ' #commenters-pagination')
                .bootpag({
                    total: ~~(data.total / data.limit),
                    page: page,
                    maxVisible: 10,
                    leaps: false,
                    firstLastUse: true 
                })
                .on('page', function (event, num) {
                    get_commenters(num, data.search, data.video_id);
                });

            $(container + ' #search_commenter')
                .submit(function (e) {
                    e.preventDefault();
                    get_commenters(1, $(container + ' #icon_search').val(), data.video_id);
                });

            $(container + ' .status')
                .click(function () {
                    var type = this.className.indexOf('block') === -1 
                            ? 'favorite' 
                            : 'block',
                        
                        status = type === 'favorite' ? 'Favorite' : 'Blocked',
                        active = this.className.indexOf('active') === -1,
                        id = get_id(this, type),

                        ban = id + '_block',
                        fav = id + '_favorite';

                    $('.' + fav).attr('class', 'favorite status ' + fav);
                    $('.' + ban).attr('class', 'block status ' + ban);

                    status = active ? status : 'No Status';

                    if (status === 'Favorite') {
                        $('.' + fav).attr('class', 'favorite status active ' + fav);
                    }

                    if (status === 'Blocked') {
                        $('.' + ban).attr('class', 'block status active ' + ban);
                    }

                    update_commenter({
                        channel_id: channel.id,
                        author_id: id,
                        status: status
                    });
                });

            $(container + ' .save')
                .click(function () {
                    var container = on_video ? '#videos' : '#commenters',
                        id = get_id(this, 'save'),
                        notes = $(container + ' #' + id + '_notes').val();
                    
                    update_commenter({
                        channel_id: channel.id,
                        author_id: id,
                        notes: notes === '' ? ' ' : notes
                    });

                    $('.' + id + '_notes').val(notes);
                });

            if (data.search) {
                $(container + ' #all-commenters')
                    .click(function () {
                        if (on_video) {
                            get_commenters(1, null, null);
                        }

                        get_commenters(1, null, data.video_id);
                    });
            }
        },

        update_commenter = function (data) {
            $.ajax({
                type: 'PUT',
                url: htbt.config.backend + '/crm/commenter',

                data: data,

                success: suc_cb,
                error: err_cb
            });
        },

        /*End of commenters tab*/

        /*Videos tab functions*/

        get_videos = function (page) {
            React.render(
                <htbt.crm.Loader />,
                $('#videos')[0]
            );

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/crm/get_videos',

                data: {
                    channel_id: channel.id,
                    next_page: page
                },

                success: render_videos,
                error: err_cb
            });
        },

        render_videos = function (data) {
            React.render(
                <htbt.crm.Videos data={data} />,
                $('#videos')[0]
            );

            $('.prev')
                .click(function () {
                    get_videos(data.prevPageToken);
                });

            $('.next')
                .click(function () {
                    get_videos(data.nextPageToken);
                });

            $('.video')
                .click(function () {
                    var obj,
                        id = this.id.split('_video')[0];

                    active_video = _.find(data.items, {id: id});

                    React.render(
                        <div>
                            <htbt.crm.Retrieving />
                            <htbt.crm.Loader />
                        </div>,
                        $('#videos')[0]
                    );

                    get_commenters(1, null, id);
                });
        },

        /*End of Videos tab*/

        /*Stats tab functions*/

        get_stats = function () {
            React.render(
                <htbt.crm.Loader />,
                $('#stats')[0]
            );

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/crm/get_stats',

                data: {
                    channel_id: channel.id,
                },

                success: render_stats,
                error: err_cb
            });
        },

        render_stats = function (data) {
            React.render(
                <htbt.crm.Stats data={data} />,
                $('#stats')[0]
            );

            $('#comment_timespan').material_select();

            $('#comment_timespan').change(function () {
                get_comments_stats(this.value);
            });
        },

        get_comments_stats = function (duration) {
            React.render(
                <htbt.crm.Loader />,
                $('#stats_chart')[0]
            );

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/crm/comments',

                data: {
                    channel_id: channel.id,
                    duration: duration
                },

                success: render_stats_chart,
                error: err_cb
            });
        },

        render_stats_chart = function (data) {
            var options = {
                    title: 'Ammount of Comments Over Time',
                    orientation: 'vertical',
                    chartArea: {
                        top: 0
                    },
                    height: data.length * 50,
                    vAxis: { 
                        showTextEvery: 1,
                        textPosition: 'out',
                        slantedText: true,
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    hAxis: { 
                        maxValue: '150',
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    tooltip: {
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    legend: { position: 'none' }
                },
                chart;

            chart = new google.visualization.LineChart($('#stats_chart')[0]);

            data = _(data)
                .map(function (e) {
                    return [e.published_at, e.count]
                }).value();

            data.unshift(['Dates', 'Comments']);
            data = google.visualization.arrayToDataTable(data);
            chart.draw(data, options);
        },

        /*Listeners*/
        
        add_listeners = function () {
            $('.tab')
                .click(function () {
                    on_video = this.id === 'v_tab' ? true : false;

                    if (this.id === 's_tab') {
                        get_comments_stats($('#comment_timespan')[0].value);
                    }
                });
        },

        /*End of listeners*/

        /*Login functions*/

        is_signed_in = function () {
            session = document.cookie.split('; ');

            _(session)
                .forEach(function (e) {
                    if (e.indexOf('hbeat_access_token=') > -1) {
                        session = e.split('hbeat_access_token=')[1];
                        return;
                    }
                })
                .commit();

            if (typeof(session) !== 'string') {
                React.render(
                    <htbt.crm.Login />,
                    $('#login-cont')[0]
                );

                return;
            }

            $.ajax({
                type: 'GET',
                url: 'http://api.accounts.freedom.tm/user/google_access_token',

                headers: {
                    'ACCESS-TOKEN': session
                },

                success: get_channel,

                error: function (err) {
                    React.render(
                        <htbt.crm.Login />,
                        $('#login-cont')[0]
                    );
                }
        });
        },

        get_channel = function (data) {
            $.ajax({
                type: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/channels',

                data: {
                    part: 'id,snippet',
                    mine: true
                },

                headers: {
                    'Authorization': 'Bearer ' + data.google_access_token
                },

                success: start,
                error: err_cb
            });
        },

        start = function (data) {
            if (!data.items.length) {
                return err_cb();
            }

            channel = data.items[0];

            React.render(
                <htbt.crm.Channel data={channel} />,
                $('#channel-profile')[0]
            );

            React.render(
                <htbt.crm.Logout />,
                $('#login-cont')[0]
            );

            $('#logout')
                .click(function () {
                    $.ajax({
                        type: 'POST',
                        url: 'http://api.accounts.freedom.tm/auth/logout',

                        headers: {
                            'ACCESS-TOKEN': session
                        },

                        success: function () {
                            location.reload();
                        },

                        error: function () {
                            location.reload();
                        }
                    });
                });

            get_commenters(1, null, null);
            get_videos(null);
            get_stats();
            add_listeners();
        };

        /*End of login functions*/

    is_signed_in();
})(window.htbt = window.htbt || {});
