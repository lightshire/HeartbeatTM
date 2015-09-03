function statusChangeCallback(response) {
    if (response.status === 'connected') {
        check_login();
    }
    else if (response.status === 'not_authorized') {
        document.getElementById('fb-status').innerHTML = 'Please log into this app.';
    }
    else {
        document.getElementById('fb-status').innerHTML = 'Please log into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: htbt.config.facebook_app_id,
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.3' // use version 2.3
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};


(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fb_login() {
    FB.login(function (response) {
        if (response.authResponse) {
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function (response) {
                user_email = response.email; //get user email  
                $.ajax({
                    url: htbt.config.backend + '/social_account',
                    type: 'POST',
                    data: {
                        email: response.email,
                        access_token: access_token,
                        profile: JSON.stringify(response),
                        service: 'facebook'
                    },
                    success: function (data) {
                        swal('Done');
                    }
                });
            });
        }
    }, {
        scope: 'public_profile,email'
    });
}

function check_login() {
    FB.api('/me', function (response) {
        document.getElementById('fb-status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    });
}

