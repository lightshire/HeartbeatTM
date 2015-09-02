$( window ).load(function() {
	var access_token;

	if (parse_qs().access_token) {
		access_token = parse_qs().access_token;
		$.ajax({
	      type: "GET",
	      dataType: "jsonp",
	      cache: false,
	      url: "https://api.instagram.com/v1/users/self/?access_token=" + access_token,
	      success: function(data) {
	        	send_data(data, access_token);
	        }
	    });
	}
});

function instagram_login () {
	var url = 'https://api.instagram.com/oauth/authorize/?client_id=' + htbt.config.instagram_api_key +'&redirect_uri='+ htbt.config.auth_page + '/auth.html' +'&response_type=token';
	window.location.href = url;
}

function send_data (data, access_token) {
	profile = data.data;

	$.ajax({
        url: htbt.config.backend + '/social_account',
        type: 'POST',
        data: {
            email: 'notsupport',
            access_token: access_token,
            profile: JSON.stringify(profile),
            service: 'instagram'
        },
        success: function (data) {
            window.location.href = htbt.config.auth_page;
        }
    });
}

function parse_qs(url) {
    var obj = {};

    if (!url) {
        url = window.location.href;
    }

    url.slice(url.indexOf('#') + 1)
        .split('&')
        .forEach(function (a) {
            if (a) {
                a = a.split('=');
                obj[a[0]] = decodeURIComponent(a.slice(1).join('='));
            }
        });

    return obj;
};