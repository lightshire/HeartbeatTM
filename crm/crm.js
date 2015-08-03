(function (htbt) {
    'use strict';

    var session,
        channel = {},
        active_video = null,
        ret_total = 0,
        ret_current = 0,
        all_videos = [],
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
                ? $('#videos .com-container')[0]
                : $('#commenters .com-container')[0];

            React.render(
                <htbt.crm.Loader />,
                container
            );

            $('#commenters .search-container #all-commenters')[0].style.display = search ? '' : 'none';

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
                    if (video_id && !already_checked && !data.commenters.length) {
                        already_checked = true;

                        if (search) {
                            React.render(
                                <div className="center-align">
                                    <htbt.crm.Error data={'No results found.'} />
                                </div>,
                                container
                            );

                            $('#videos .search-container #all-commenters')[0].style.display = search ? '' : 'none';

                            $('#videos #all-commenters')
                                .click(function () {
                                    $('#videos #icon_search')[0].value = '';
                                    get_commenters(1, null, video_id);
                                });

                            return;
                        }

                        return cache_comments(video_id, null);
                    }

                    if (!data.commenters.length) {
                        if (search) {
                            React.render(
                                <div className="center-align">
                                    <htbt.crm.Error data={'No results found.'} />
                                </div>,
                                container
                            );

                            $('#commenters #all-commenters')
                                .click(function () {
                                    $('#commenters #icon_search')[0].value = '';
                                    get_commenters(1);
                                });

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
                                get_videos(null, true);
                                $('#v_tab a').trigger('click');
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

                    render_commenters(data, page);
                },

                error: err_cb,
            });
        },

        cache_comments = function (id, latest) {
            var container = on_video 
                ? $('#videos .com-container')[0] 
                : $('#commenters .container')[0];

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
                    get_stats();
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
                    $('#commenters .com-container')[0]
                );

                bind_commenters(data, page);
                return;
            }

            if (active_video) {
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
                            <htbt.crm.ActiveVideo data={active_video}/>,
                            $('#videos .active-container')[0]
                        );

                        React.render(
                            <htbt.crm.Commenter data={data} />,
                            $('#videos .com-container')[0]
                        );

                        $('#videos .search-container #all-commenters')[0].style.display = data.search ? '' : 'none';

                        $('#back-to-videos')
                            .click(function () {
                                React.render(
                                    <div></div>,
                                    $('#videos .active-container')[0]
                                );
                                active_video = null;
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
            }
        },

        bind_commenters = function (data, page) {
            var container = on_video ? '#videos' : '#commenters';

            $('.collapsible').collapsible({
                accordion : false 
            });

            $(container + ' #commenters-pagination')
                .bootpag({
                    total: Math.ceil(data.total / data.limit),
                    page: page,
                    maxVisible: 10,
                    leaps: false,
                    firstLastUse: true 
                })
                .on('page', function (event, num) {
                    get_commenters(num, data.search, data.video_id);
                });

            $(container + ' #search_commenter')
                .unbind('submit')
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
                            return get_commenters(1, null, data.video_id);
                        }

                        $(container + ' #icon_search')[0].value = '';
                        get_commenters(1, null, null);
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

        get_all_videos = function (data) {
            all_videos = all_videos.concat(data.items);

            if (data.nextPageToken) {
                return get_videos(data.nextPageToken, true);
            }

            retrieve_all();
        },

        retrieve_all = function () {
            var i = 0,
                async = 0,

                retriever = function () {
                    if (!all_videos[i]) {
                        return get_videos();
                    }

                    async = all_videos[i].length;

                    _(all_videos[i++])
                        .forEach(function (e) {
                            var id = e.id.split('_sync')[0];

                            $.ajax({
                                type: 'POST',
                                url: htbt.config.backend + '/crm/cache_comments',

                                data: {
                                    channel_id: channel.id,
                                    video_id: id
                                },

                                success: function () {
                                    $('#retrieve-all-vids .current')[0].textContent = ++ret_current;

                                    if (!--async) {
                                        retriever();
                                    }
                                },

                                error: function () {}
                            });
                        })
                        .commit();
                };

            ret_current = 0;
            $('#retrieve-all-vids .current')[0].textContent = ret_current;
            $('#retrieve-all-vids .total')[0].textContent = all_videos.length;
            
            _($('.sync-vid'))
                .forEach(function (e) {
                    e.classList.add('rotating', 'active');
                })
                .commit();
            
            all_videos = _.chunk(all_videos, 10);
            retriever();
        },

        get_videos = function (page, get_all) {
            React.render(
                <htbt.crm.Loader />,
                $('#videos .com-container')[0]
            );

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/crm/get_videos',

                data: {
                    channel_id: channel.id,
                    next_page: page
                },

                success: function (data) {
                    if (get_all) {
                        get_all_videos(data);
                        return;
                    }

                    render_videos(data);
                },

                error: err_cb
            });
        },

        render_videos = function (data) {
            if (!active_video) {
                React.render(
                    <htbt.crm.RetrieveAll />,
                    $('#videos .active-container')[0]
                );
                $('#videos #retrieve-all-vids')[0].style.display = 'block';
            }

            React.render(
                <htbt.crm.Videos data={data} />,
                $('#videos .com-container')[0]
            );

            $('.prev')
                .click(function () {
                    get_videos(data.prevPageToken);
                });

            $('.next')
                .click(function () {
                    get_videos(data.nextPageToken);
                });

            $('.sync-vid')
                .click(function () {
                    var id = this.id.split('_sync')[0],
                        self = this;

                    if (ret_total === ret_current) {
                        ret_current = ret_total = 0;
                        $('#retrieve-all-vids .current')[0].textContent = ret_current;
                    }

                    self.classList.remove('done');
                    self.textContent = 'loop';
                    this.classList.add('rotating', 'active');

                    $.ajax({
                        type: 'POST',
                        url: htbt.config.backend + '/crm/cache_comments',

                        data: {
                            channel_id: channel.id,
                            video_id: id
                        },

                        success: function () {
                            self.classList.remove('rotating', 'active');
                            self.classList.add('done');
                            self.textContent = 'done';
                        },

                        error: err_cb
                    });
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
                        $('#videos .com-container')[0]
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
                
                error: function () {
                    React.render(
                        <htbt.crm.Error data="No data found" />,
                        $('#stats')[0]
                    );
                }
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
                
                error: function () {
                    React.render(
                        <htbt.crm.Error data="No data found" />,
                        $('#stats_chart')[0]
                    );
                }
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
                        maxValue: '100',
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

            if (data && !data.length) {
                React.render(
                    <htbt.crm.Error data="No data found" />,
                    $('#stats_chart')[0]
                );

                return;
            }

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

                    if (this.id === 's_tab' && $('#comment_timespan')[0]) {
                        get_comments_stats($('#comment_timespan')[0].value);
                    }
                });
        },

        /*End of listeners*/

        /*Login functions*/

        is_signed_in = function () {
            session = window.location.href.split('#access_token=')[1];

            if (session) {
                document.cookie = 'hbeat_access_token=' + session;
            }

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
                url: htbt.config.backend + '/crm/user',

                data: {session: session},

                success: start,

                error: function (err) {
                    React.render(
                        <htbt.lfg.Login />,
                        $('#login-cont')[0]
                    );

                    $('#matchmaking .center-align')[0].style.display = 'none';
                }
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

            React.render(
                <htbt.crm.Search />,
                $('#commenters .search-container')[0]
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

            $('#retrieve-all-vids .btn-small')
                .click(function () {
                    get_videos(null, true);
                });

            get_commenters(1, null, null);
            get_videos(null);
            get_stats();
            add_listeners();
        };

        /*End of login functions*/

    is_signed_in();
})(window.htbt = window.htbt || {});
