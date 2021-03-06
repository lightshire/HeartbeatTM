(function (htbt) {
    'use strict';

    var email,
        session,
        profile,
        categories,
        channel = {},
        no_profile = true,
        match_binded = false,

        get_id = function (e, tok) {
            return e.split(tok)[0];
        },

        suc_cb = function (data) {
            toastr.options.positionClass = 'toast-top-left';
            toastr.success(data.message);
        },

        err_cb = function (err) {
            toastr.options.positionClass = 'toast-top-left';
            toastr.error(err.message || 'An unexpected error occured');
        },

        /*Matchmaking Functions*/

        get_users = function (page, search, search_by, favorite) {
            var data, url;

            React.render(
                <htbt.lfg.Loader />,
                $('#matchmaking .match-container')[0]
            );

            url = favorite ? '/lfg/favorite_users' : '/lfg/users';

            if (favorite) {
                data = {
                    channel_id: channel.id,
                    limit: 10,
                    page: page,
                };
            }
            else {
                data = {
                    channel_id: channel.id,
                    limit: 10,
                    page: page,
                    search: search,
                    by_name: search_by
                };
            }

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + url,

                headers: {'ACCESS-TOKEN': session},

                data: data,

                success: function (data) {
                    render_users(data, page, search, search_by, favorite);
                },

                error: function () {
                    render_error_users(search, favorite);
                }
            });
        },

        render_users = function (data, page, search, search_by, favorite) {
            var autocomplete = [];
                    
            _(categories)
                .forEach(function (e) {
                    autocomplete = autocomplete.concat(_.pluck(e.sub_categories, 'sub_category'));
                })
                .commit();

            React.render(
                <htbt.lfg.Matchmaking data={data}/>,
                $('#matchmaking .match-container')[0]
            );

            React.render(
                <htbt.lfg.Search data={data}/>,
                $('#matchmaking .search-container')[0]
            );

            if (!favorite && !search) {
                React.render(
                    <a href="#!" className="view-all">View Favorites</a>,
                    $('.match-view-all')[0]
                );

                $('#matchmaking .view-all')
                    .unbind()
                    .click(function () {
                        get_users(1, null, 0, true);
                        $('.search-input-container')[0].style.display = 'none';
                    });
            }

            if ((search && search !== ' ') || favorite) {
                React.render(
                    <a href="#!" className="view-all">View all</a>,
                    $('.match-view-all')[0]
                );

                $('#matchmaking .view-all')
                    .unbind()
                    .click(function () {
                        get_users(1, null, 0);
                        $('#search')[0].value = '';
                        $('.search-input-container')[0].style.display = 'block';
                    });
            }

            $('#by-name')
                .unbind('click')
                .click(function () {
                    $('#search').autocomplete({source: []});
                });

            $('#by-interest')
                .unbind('click')
                .click(function () {
                    $('#search').autocomplete({source: autocomplete});
                });

            $('#matchmaking-pagination')
                .bootpag({
                    total: Math.ceil(data.total / data.limit),
                    page: page,
                    maxVisible: 10,
                    leaps: false,
                    firstLastUse: true
                })
                .on('page', function (event, num) {
                    get_users(num, search, search_by, favorite);
                });

            $('#search-match')
                .unbind()
                .submit(function (event) {
                    var search_input = $('#search')[0].value,
                        search_by_input = $('#by-name')[0].checked ? 1 : 0;

                    event.preventDefault();
                    get_users(1, search_input, search_by_input);
                });

            bind_favorite_buttons();
        },

        render_error_users = function (search, favorite) {
            React.render(
                <htbt.lfg.Error data="No users found."/>,
                $('#matchmaking .match-container')[0]
            );

            if ((search && search !== ' ')) {
                React.render(
                    <a href="#!" className="view-all">View all</a>,
                    $('.match-view-all')[0]
                );

                $('#matchmaking .view-all')
                    .click(function () {
                        get_users(1, null, 0);
                        $('#search')[0].value = '';

                        if (favorite) {
                            $('.search-input-container')[0].style.display = 'none';
                        }
                        else {
                            $('.search-input-container')[0].style.display = 'block';
                        }
                    });
            }
        },

        mark_as_favorite = function (id) {
            $.ajax({
                type: 'POST',
                url: htbt.config.backend + '/lfg/favorite',

                data: {
                    youtube_id: channel.id,
                    favorite: id
                },

                success: function () {},
                error: err_cb
            });
        },

        /*End of matchmaking functions*/

        /*User Functions*/

        get_categories = function () {
            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/lfg/categories',

                headers: {'ACCESS-TOKEN': session},

                success: function (data) {
                    categories = data;
                    get_user(channel.id);

                    React.render(
                        <htbt.lfg.ModifiedSearch data={categories}/>,
                        $('#msearch .msearch-container')[0]
                    );

                    bind_modified_search();
                },

                error: err_cb
            });
        },

        bind_modified_search = function () {
            $('#msearch-btn')
                .click(function () {
                    var interests = $('.msearch-interests');

                    if (!interests.is(':checked')) {
                        return err_cb({message: 'Please select/check interests.'});
                    }

                    interests = _(interests)
                        .map(function (e) {
                            if (e.checked) {
                                return e.getAttribute('data');
                            }
                        })
                        .filter(function (e) {
                            if (e) {
                                return e;
                            }
                        })
                        .value()
                        .join(',');

                    modified_search(interests, 1);

                    React.render(
                        <htbt.lfg.Loader/>,
                        $('#msearch .msearch-container')[0]
                    );
                });
        },

        modified_search = function (interests, page) {
            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/lfg/search',

                headers: {'ACCESS-TOKEN': session},

                data: {
                    channel_id: channel.id,
                    limit: 10,
                    page: page,
                    search: interests
                },

                success: function (data) {
                    React.render(
                        <a href="#!" className="view-searchlist">View search list</a>,
                        $('#msearch .show-msearchlist')[0]
                    );

                    $('#msearch .view-searchlist')
                        .unbind('click')
                        .click(function () {
                            React.render(
                                <htbt.lfg.ModifiedSearch data={categories}/>,
                                $('#msearch .msearch-container')[0]
                            );

                            bind_modified_search();
                        });

                    React.render(
                        <htbt.lfg.Matchmaking data={data}/>,
                        $('#msearch .msearch-container')[0]
                    );

                    $('#msearch #matchmaking-pagination')
                        .bootpag({
                            total: Math.ceil(data.total / data.limit),
                            page: page,
                            maxVisible: 10,
                            leaps: false,
                            firstLastUse: true
                        })
                        .on('page', function (event, num) {
                            React.render(
                                <htbt.lfg.Loader/>,
                                $('#msearch .msearch-container')[0]
                            );
                            modified_search(interests, num);
                        });
                },

                error: function () {
                    React.render(
                        <htbt.lfg.Error data="No results found."/>,
                        $('#msearch')[0]
                    );
                }
            });
        },

        get_user = function (youtube_id) {
            if (!youtube_id) {
                return;
            }

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/lfg/user',

                data: {
                    own_id: channel.id,
                    user_id: youtube_id,
                    type: 'youtube'
                },

                success: render_details,

                error: function (err) {
                    var data = {categories: categories};

                    if (youtube_id === channel.id) {
                        $.ajax({
                            type: 'GET',
                            url: 'http://api.accounts.freedom.tm/user',

                            headers: {'ACCESS-TOKEN': session},

                            success: function (e) {
                                email = e.email;
                            },

                            error: function () {}
                        });

                        React.render(
                            <htbt.lfg.Profile data={data}/>,
                            $('#profile')[0]
                        );

                        if (profile) {
                            $('#pro-a').trigger('click');
                        }

                        bind_profile_buttons();
                        return;
                    }
                    
                    React.render(
                        <htbt.lfg.Error data="User not found"/>,
                        $('#matchmaking .match-container')[0]
                    );
                }
            });
        },

        render_details = function (data) {
            if (data.youtube_id === channel.id) {
                no_profile = false;
                data.categories = categories;

                data.about_me = data.about_me.replace('<br/>', '\r\n');

                React.render(
                    <htbt.lfg.Profile data={data}/>,
                    $('#profile')[0]
                );

                bind_profile_buttons();
                return;
            }

            React.render(
                <htbt.lfg.View data={data}/>,
                $('#matchmaking .match-container')[0]
            );

            $('.view-all')
                .click(function () {
                    get_users(1);
                });

            $('.view-email')
                .click(function () {
                    this.textContent = this.getAttribute('data-email');
                });

            bind_favorite_buttons();
        },

        bind_profile_buttons = function () {
            var e = $('#profile ul.tabs');
            e.tabs();
            e[0].lastChild.style.left = '0';
            e[0].lastChild.style.right = '67%';

            $('#save-profile')
                .click(function () {
                    var data,
                        interests = $('.interests'),
                        about = $('#about')[0].value;

                    if (!about || about === ' ') {
                        $('#about_label').addClass('err-input');
                        $('#about').addClass('err-input');

                        $('#about').keyup(function () {
                            if (this.value && this.value !== ' ') {
                                $('#about_label').removeClass('err-input');
                                $('#about').removeClass('err-input');
                            }
                        });

                        err_cb({responseText: 'Please fill out about me field.'});

                        return;
                    }

                    if (!interests.is(':checked')) {
                        $('#interests-title').addClass('err-input');

                        $('.interests').click(function () {
                            $('#interests-title').removeClass('err-input');
                        })

                        err_cb({message: 'Please select/check your interests.'});

                        return;
                    }

                    interests = _(interests)
                        .map(function (e) {
                            if (e.checked) {
                                return e.getAttribute('data');
                            }
                        })
                        .filter(function (e) {
                            if (e) {
                                return e;
                            }
                        })
                        .value()
                        .join(',');

                    data = {
                        email: email,
                        about_me: about,
                        interests: interests,
                        youtube_id: channel.id,
                        twitch_id: $('#twitch_id')[0].value || ' ',
                        hitbox_id: $('#hitbox_id')[0].value || ' ',
                        is_looking: $('#looking')[0].checked ? 'Yes' : 'No' 
                    };

                    if (no_profile) {
                        return register(data);
                    }

                    update_user(data);
                });
        },

        bind_favorite_buttons = function () {
            $('.favorite').click(function () {
                var id = get_id(this.id, '_fave');

                if (this.classList.contains('active')) {
                    this.className = 'favorite material-icons';
                }
                else {
                    this.className = 'active favorite material-icons';
                }

                mark_as_favorite(id);
            });
        },

        update_user = function (data) {
            $.ajax({
                type: 'PUT',
                url: htbt.config.backend + '/lfg/user',
                headers: {'ACCESS-TOKEN': session},
                data: data,
                success: suc_cb,
                error: err_cb
            });
        },

        register = function (data) {
            $.ajax({
                type: 'POST',
                url: htbt.config.backend + '/lfg/user',
                data: data,
                success: function () {
                    window.location.reload();
                },
                error: err_cb
            });
        },

        /*End of user functions*/

        /*Login functions*/

        is_signed_in = function () {
            React.render(
                <htbt.lfg.Loader />,
                $('#matchmaking .match-container')[0]
            );

            session = window.location.href.split('#access_token=')[1];

            if (session) {
                window.location.href = '#';
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
                    <htbt.lfg.Login />,
                    $('#login-cont')[0]
                );

                $('#matchmaking .center-align')[0].style.display = 'none';
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
            function session_destroy () {
                document.cookie = 'hbeat_access_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                location.reload();
            }

            profile = window.location.href.split('#profile?id=')[1];

            if (!data.items.length) {
                return err_cb();
            }

            channel = data.items[0];

            React.render(
                <htbt.lfg.Channel data={channel} />,
                $('#channel-profile')[0]
            );

            React.render(
                <htbt.lfg.Logout />,
                $('#login-cont')[0]
            );

            $('#logout')
                .click(function () {
                    $.ajax({
                        type: 'POST',
                        url: 'http://api.accounts.freedom.tm/auth/logout',
                        success: session_destroy,
                        error: session_destroy
                    });
                });

            get_categories();

            if (profile) {
                return get_user(profile);
            }

            get_users(1);
        };

        /*End of login functions*/

    is_signed_in();
})(window.htbt = window.htbt || {});
