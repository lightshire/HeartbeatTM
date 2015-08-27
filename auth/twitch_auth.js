Twitch.init({
    clientId: htbt.config.twitch_dev_api_key
}, function (error, status) {});

function twitch_login() {
    Twitch.login({
        scope: ['user_read', 'channel_read']
    });
}

Twitch.getStatus(function (err, status) {

    if (status.authenticated) {
        Twitch.api({
            method: 'user'
        }, function (error, user) {
            if (user) {
                $.ajax({
                    url: htbt.config.backend + '/social_account',
                    type: 'POST',
                    data: {
                        email: user.email,
                        access_token: status.token,
                        profile: JSON.stringify(user),
                        service: 'twitch'
                    },
                    success: function (data) {
                        swal('Done');
                    }
                });
            }

            if (error) {
                swal('Login Error');
            }
        });
    }
});

