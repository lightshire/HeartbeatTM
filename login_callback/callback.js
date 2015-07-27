(function (htbt) {
    'use strict';

    var heartbeat_access_token = htbt.util.parse_qs().access_token,
    	state = htbt.util.parse_qs().state;

    if (heartbeat_access_token) {
		document.cookie = 'heartbeat_access_token=' + heartbeat_access_token;
		document.getElementById('login_info').style.display = 'block';
	}

	if (state) {
		location.href = state;
	}
})(window.htbt = window.htbt || {});
