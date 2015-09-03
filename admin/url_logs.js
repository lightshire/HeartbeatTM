(function (htbt) {
    'use strict';

    var access_token,
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

            access_token = window.location.href.split('#access_token=')[1];

            if (access_token) {
                window.location.href = '#';
                document.cookie = 'hbeat_access_token=' + access_token;
            }

            access_token = document.cookie.split('; ');

            access_token = _.find(access_token, function (e) {
                return ~e.indexOf('hbeat_access_token=');
            });

            if (!access_token) {
                React.render(
                    <htbt.admin.Login />,
                    $('#login-cont')[0]
                );

                $('#url-logs .center-align:eq(0)').hide();
                return;
            }

            access_token = access_token.split('hbeat_access_token=')[1];

            $.ajax({
                type: 'GET',
                url: htbt.config.backend + '/crm/user',
                data: {session: access_token},
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
                headers: {'ACCESS-TOKEN': access_token},
                success: is_admin
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
                        headers: {'ACCESS-TOKEN': access_token},
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
                success: function () {
                    get_url_logs();
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

    is_signed_in();
})(window.htbt = window.htbt || {});
