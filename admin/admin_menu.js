(function (htbt) {
    'use strict';

    var access_token,
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

        /*Login functions*/

        is_signed_in = function () {
            React.render(
                <htbt.admin.Loader />,
                $('#admin-menu')[0]
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

                $('#nav-links').hide();
                $('#admin-menu').hide();
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
                    React.render(
                        <htbt.admin.Error data='Welcome to Heartbeat Administrator Panel!' />,
                        $('#admin-menu')[0]
                    );                },
                error: function () {
                    $('#nav-links').hide();
                    React.render(
                        <htbt.admin.Error data='User has no access to admin panel' />,
                        $('#admin-menu')[0]
                    );
                }
            });
        };

        /*End of login functions*/

    is_signed_in();
})(window.htbt = window.htbt || {});
