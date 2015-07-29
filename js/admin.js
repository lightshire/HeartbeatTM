(function (htbt) {
    'use strict';

    var session,
        email,
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

        /*URL Logs functions*/

        get_url_logs = function () {
            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/url_logs',

                success: function (data) {
                    var table,

                        options = {
                            showRowNumber: true,
                            allowHtml: true,
                            width: '100%',
                            height: '100%'
                        };

                    data = _(data)
                        .map(function (e) {
                            return [e.url, {v: e.count, f: e.count.toLocaleString()}];
                        })
                        .value();

                    data.unshift([('string', 'URL'), ('number', 'Visits')]);
                    data = google.visualization.arrayToDataTable(data);
                    table = new google.visualization.Table($('#url-logs .match-container')[0]);

                    table.draw(data, options);
                },

                error: function () {
                    React.render(
                        <htbt.admin.Error data='Unable to retrieve url logs' />,
                        $('#url-logs .match-container')[0]
                    );
                }
            });
        },

        /*End of url logs*/

        /*LFG Categories functions*/

        get_categories = function () {
            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/lfg/categories',

                success: function (data) {
                    var i = 0,
                        cont = $('#lfg-categories')[0],
                        d = {categories: data};
                    React.render(
                        <htbt.admin.Profile data={d}/>,
                        cont
                    );
                    $('.tabs').show();
                    $('ul.tabs').tabs();

                    cont = cont.children[0];
                },

                error: err_cb
            });
        },

        /*End of lfg categories*/

        /*Login functions*/

        start = function () {
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

                    data: {key: md5(key)},

                    success: is_signed_in,

                    error: function () {
                        React.render(
                            <htbt.admin.Error data='Access Denied' />,
                            $('#url-logs .match-container')[0]
                        );
                    }
                });
            }

            $('#modal1').openModal();

            $('#submit_access').click(get_access);
            $('#access-form').submit(get_access);
        },

        is_signed_in = function () {
            $('.tabs').show();
            
            React.render(
                <htbt.admin.Loader />,
                $('#url-logs .match-container')[0]
            );

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
                    <htbt.admin.Login />,
                    $('#login-cont')[0]
                );

                $('#url-logs .center-align')[0].style.display = 'none';
                return;
            }

            $.ajax({
                type: 'GET',
                url: 'http://api.accounts.freedom.tm/user/google_access_token',

                headers: {'ACCESS-TOKEN': session},

                success: get_channel,

                error: function (err) {
                    React.render(
                        <htbt.admin.Login />,
                        $('#login-cont')[0]
                    );

                    $('#url-logs .center-align')[0].style.display = 'none';
                }
            });
        },

        get_channel = function (data) {
            if (!~window.location.href.indexOf('profile')) {
                window.location.href = '#';
            }

            $.ajax({
                type: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/channels',

                data: {
                    part: 'id,snippet',
                    mine: true
                },

                headers: {'Authorization': 'Bearer ' + data.google_access_token},

                success: set_user,
                error: err_cb
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
            var profile = window.location.href.split('#profile?id=')[1];

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

                        success: function () {
                            location.reload();
                        },

                        error: err_cb
                    });
                });
        },

        is_admin = function (e) {
            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/admin',

                data: {email: e.email},

                success: function () {
                    get_url_logs();
                    get_categories();
                },

                error: function () {
                    React.render(
                        <htbt.admin.Error data='User has no access to admin panel' />,
                        $('#url-logs .match-container')[0]
                    );
                }
            });
        };

        /*End of login functions*/

    start();
})(window.htbt = window.htbt || {});
