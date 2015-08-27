DM.init({
        apiKey: htbt.config.dailymotion_api_key,
        status: true, // check login status
        cookie: true // enable cookies to allow the server to access the session
    },
    DM.getLoginStatus(function (response) {
        //console.log('dailymotion session ' + JSON.stringify(response));
        if (response.session) {
            this.setState({
                isLoggedIn: true
            });
        }
    })
);

function dailymotion_login() {
    DM.login(function (response) {
        if (response.session) {

            DM.api('/me', {
                fields: ['username', 'email', 'screenname', 'first_name', 'last_name']
            }, function (user) {
                if (user) {
                    $.ajax({
                        //url: 'https://localhost:4433/social_account',
                        url: htbt.config.backend + '/social_account',
                        type: 'POST',
                        data: {
                            email: user.email,
                            access_token: response.session.access_token,
                            profile: JSON.stringify(user),
                            service: 'dailymotion'
                        },
                        success: function (data) {
                            swal('Done');
                        }
                    });
                }
                else {
                    swal('Login Error');
                }
            });
        }
    }, {
        scope: 'userinfo, email'
    });
}

