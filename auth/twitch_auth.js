Twitch.init({
    clientId: 'pg40jcdu6to0tk17gs4az88bq8m3q7'
}, function (error, status) {

    //console.log('twitch_login loaded ' + JSON.stringify(status));
    if (error) {
        // error encountered while loading
        console.log(error);
    }
    // the sdk is now loaded
    if (status.authenticated) {

    }
});

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
                    url: 'https://localhost:4433/social_account',
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

