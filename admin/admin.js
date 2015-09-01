(function (htbt) {
    'use strict';

    var session,
        email,
        active_platform = 'all',
        channel = {},

        get_id = function (e, tok) {
            return e.split(tok)[0];
        },

        suc_cb = function (data) {
            toastr.options.positionClass = 'toast-top-left';
            toastr.success(data.message);
        },

        err_cb = function (err) {
            toastr.options.positionClass = 'toast-top-left';
            toastr.error(err.responseText || 'An unexpected error occured');
        },

        /*LFG Categories functions*/

        get_categories = function () {
            React.render(
                <htbt.admin.Loader/>,
                $('#lfg-categories')[0]
            );

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/lfg/categories',

                headers: {'ACCESS-TOKEN': session},

                success: function (data) {
                    var d = {categories: data};

                    React.render(
                        <htbt.admin.Profile data={d}/>,
                        $('#lfg-categories')[0]
                    );

                    $('.tabs').show();
                    $('ul.tabs').tabs();

                    $('.save-category')
                        .click(function () {
                            var id = get_id(this.id, '_save'),
                                sub = $('#' + id + '_sub')[0].value;

                            if (!sub || sub === ' ') {
                                return;
                            }

                            sub = sub[0].toUpperCase() + sub.slice(1);

                            $.ajax({
                                type: 'POST',
                                url: htbt.config.backend + '/lfg/sub_category',

                                headers: {'ACCESS-TOKEN': session},

                                data: {
                                    category_id: id,
                                    sub_category: sub
                                },

                                success: function (data) {
                                    suc_cb(data);
                                    get_categories();
                                },

                                error: function () {
                                    err_cb({responseText: 'Category already exists!'})
                                }
                            });
                        })

                    $('.delete-categories')
                        .click(function () {
                            var interests = $('.interests');

                            if (!interests.is(':checked')) {
                                return err_cb({message: 'Please select category to delete.'});
                            }

                            interests = _(interests)
                                .map(function (e) {
                                    if (e.checked) {
                                        e.parentNode.style.display = 'none';
                                        return get_id(e.id, '_check');
                                    }
                                })
                                .filter(function (e) {
                                    if (e) {
                                        return e;
                                    }
                                })
                                .value()
                                .join(',');

                            $.ajax({
                                type: 'DELETE',
                                url: htbt.config.backend + '/lfg/category',

                                headers: {'ACCESS-TOKEN': session},

                                data: {
                                    category_id: interests,
                                    sub: true
                                },

                                success: suc_cb,
                                error: err_cb
                            });
                        });
                },

                error: err_cb
            });
        },

        /*End of lfg categories*/

        /*LFG Analytics functions*/

        get_category_poll = function () {
            React.render(
                <htbt.admin.Loader />,
                $('#lfg-analytics #lfg-pol')[0]
            );

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/lfg/interest_analytics',

                headers: {'ACCESS-TOKEN': session},
                
                success: function (data) {
                    var table,

                        options = {
                            showRowNumber: true,
                            allowHtml: true,
                            width: '100%',
                            height: '100%'
                        };

                    data = _(data.categories)
                        .map(function (e) {
                            return [
                                '<a target="_blanl" href="#category?id=' + e.sub_category + '">' + e.sub_category +'</a>', 
                                {v: e.total, f: e.total ? e.total.toLocaleString() : '0'},
                                {v: e.search_count, f: e.search_count ? e.search_count.toLocaleString() : '0'}
                            ];
                        })
                        .value();

                    data.unshift([
                        ('string', 'Category'),
                        ('number', 'No. of Interested Users'),
                        ('number', 'No. Searches')
                    ]);
                    data = google.visualization.arrayToDataTable(data);
                    table = new google.visualization.Table($('#lfg-analytics #lfg-pol')[0]);

                    table.draw(data, options);
                },
                
                error: err_cb
            });
        },

        get_platform_statistic = function (page) {
            var data = {
                    page: page,
                    limit: 20
                };

            React.render(
                <htbt.admin.Loader />,
                $('#lfg-pla #lfg-pla-table')[0]
            );

            if (active_platform !== 'all') {
                data.platform = active_platform;
            }

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/lfg/user_analytics',

                headers: {'ACCESS-TOKEN': session},

                data: data,

                success: function (data) {
                    var table,

                        options = {
                            allowHtml: true,
                            width: '100%',
                            height: '100%'
                        };

                    $('#lfg-pla-pagination')
                        .bootpag({
                            total: Math.ceil(data.total / data.limit),
                            page: page,
                            maxVisible: 10,
                            leaps: false,
                            firstLastUse: true
                        })
                        .on('page', function (event, num) {
                            get_platform_statistic(num);
                        });

                    data = _(data.users)
                        .map(function (e) {
                            return [
                                '<img src="' + e.avatar + '" class="circle" style="height:50px;margin-right:10px;" />'
                                    + '<a target="_blank" href="/lfg.html#profile?id=' + e.youtube_id + '">' 
                                    + e.name + '</a>', 
                                {
                                    v: e.total_subs, 
                                    f: e.total_subs.toLocaleString()
                                }
                            ];
                        })
                        .value();

                    if (active_platform === 'all') {
                        data.unshift([('string', 'User'), ('number', 'Combined Subscribers (Youtube|Twitch|Hitbox)')]);
                    }
                    else {
                        data.unshift([('string', 'User'), ('number', 'Subscribers')]);
                    }

                    data = google.visualization.arrayToDataTable(data);
                    table = new google.visualization.Table($('#lfg-analytics #lfg-pla-table')[0]);

                    table.draw(data, options);
                },

                error: err_cb
            });
        },

        get_per_category_analytics = function (page) {
            var category = window.location.href.split('#category?id=')[1];

            React.render(
                <htbt.admin.Loader />,
                $('#pcat-container')[0]
            );

            $('#pcat-title')[0].textContent = 'Users interested in ' + category;

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/lfg/category_analytics',

                headers: {'ACCESS-TOKEN': session},

                data: {
                    page: page,
                    limit: 20,
                    category: category
                },

                success: function (data) {
                    var table,

                        options = {
                            allowHtml: true,
                            width: '100%',
                            height: '100%'
                        };

                    $('#pcat-pagination')
                        .bootpag({
                            total: Math.ceil(data.total / data.limit),
                            page: page,
                            maxVisible: 20,
                            leaps: false,
                            firstLastUse: true
                        })
                        .on('page', function (event, num) {
                            get_per_category_analytics(num);
                        });

                    data = _(data.users)
                        .map(function (e) {
                            return [
                                '<img src="' + e.avatar + '" class="circle" style="height:50px;margin-right:10px;" />'
                                    + '<a target="_blank" href="/lfg.html#profile?id=' + e.youtube_id + '">' 
                                    + e.name + '</a>', 
                                {
                                    v: e.total_subs, 
                                    f: e.total_subs.toLocaleString()
                                }
                            ];
                        })
                        .value();

                    data.unshift([('string', 'User'), ('number', 'Subscribers')]);
                    data = google.visualization.arrayToDataTable(data);
                    table = new google.visualization.Table($('#pcat-container')[0]);

                    table.draw(data, options);
                },

                error: function () {
                    React.render(
                        <htbt.admin.Error data="No users found." />,
                        $('#pcat-container')[0]
                    );
                }
            });
        },

        /*End of lfg analytics*/

        /*Login functions*/

        is_signed_in = function () {
            $('.tabs').show();
            
            React.render(
                <htbt.admin.Loader />,
                $('#lfg-categories')[0]
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
                    <htbt.admin.Login />,
                    $('#login-cont')[0]
                );

                $('#lfg-categories').hide();
                return;
            }

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/crm/user',

                data: {session: session},

                success: set_user,

                error: function (err) {
                    React.render(
                        <htbt.admin.Login />,
                        $('#login-cont')[0]
                    );
                }
            });

            $.ajax({
                type: 'GET',
                url: 'http://api.accounts.freedom.tm/user',

                headers: {'ACCESS-TOKEN': session},

                success: is_admin,

                error: function () {}
            });
        },

        set_user = function (data) {
            function session_destroy () {
                document.cookie = 'hbeat_access_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                location.reload();
            }

            if (!data.items.length) {
                return err_cb();
            }

            channel = data.items[0];

            React.render(
                <htbt.admin.Channel data={channel} />,
                $('#channel-profile')[0]
            );

            React.render(
                <htbt.admin.Logout />,
                $('#login-cont')[0]
            );

            $('#logout')
                .click(function () {
                    $.ajax({
                        type: 'POST',
                        url: 'http://api.accounts.freedom.tm/auth/logout',

                        headers: {'ACCESS-TOKEN': session},

                        success: session_destroy,
                        error: session_destroy
                    });
                });
        },

        is_admin = function (e) {
            email = e.email;

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/admin',

                data: {email: e.email},

                success:get_passkey,

                error: function () {
                    React.render(
                        <htbt.admin.Error data='User has no access to admin panel' />,
                        $('#lfg-categories')[0]
                    );
                }
            });
        },

        get_passkey = function () {
            function get_access (e) {
                var key = $('#access_code')[0].value;
                
                if (!key || key === ' ') {
                    return;
                }

                if (e) {
                    e.preventDefault();
                }

                $('#modal1').closeModal();

                $.ajax({
                    type: 'GET',
                    url: htbt.config.backend + '/admin/get_access',

                    data: {
                        email: email,
                        key: key
                    },

                    success: function () {
                        $('#platform-select').material_select();

                        $('#platform-select')
                            .change(function () {
                                active_platform = this.value;
                                get_platform_statistic(1);
                            });
                            
                        get_categories();
                        get_category_poll();
                        get_platform_statistic(1);
                    },

                    error: function () {
                        React.render(
                            <htbt.admin.Error data='Access Denied' />,
                            $('#lfg-categories')[0]
                        );
                    }
                });
            }

            if (window.location.href.indexOf('/admin/#category') > -1) {
                return get_per_category_analytics(1);
            }

            $('#modal1').openModal();

            $('#submit_access').click(get_access);
            $('#access-form').submit(get_access);
        };

        /*End of login functions*/

    is_signed_in();
})(window.htbt = window.htbt || {});
