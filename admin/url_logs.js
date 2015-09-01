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

        /*Login functions*/

        is_signed_in = function () {
            $('.tabs').show();
            
            React.render(
                <htbt.admin.Loader />,
                $('#url-logs .match-container')[0]
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

                $('#url-logs .center-align')[0].style.display = 'none';
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
                        $('#url-logs .match-container')[0]
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

                        get_url_logs();
                    },

                    error: function () {
                        React.render(
                            <htbt.admin.Error data='Access Denied' />,
                            $('#url-logs .match-container')[0]
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
