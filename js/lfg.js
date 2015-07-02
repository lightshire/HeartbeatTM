(function (htbt) {
    'use strict';

    var session,
        channel = {},
        active_video,
        on_video = false,
        already_checked = false,

        get_id = function (e, tok) {
            return e.id.split(tok)[0];
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
                        <htbt.lfg.Login />,
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

                        headers: {
                            'ACCESS-TOKEN': session
                        },

                        success: function () {
                            location.reload();
                        },

                        error: err_cb
                    });
                });
        };

        /*End of login functions*/

    is_signed_in();
})(window.htbt = window.htbt || {});
