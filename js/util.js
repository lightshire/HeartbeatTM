(function(htbt) {

    'use strict';

    htbt.util = {};

    htbt.util.getVideoId = function (url) {
        return url.split('videoId=')[1];
    };

    htbt.util.get_cookie = function (name) {
        var value;

		document.cookie
			.split('; ')
			.forEach(function (cookie) {
				var pair = cookie.split('=');

				if (pair[0] === name) {
					value = pair[1];
				}
			});

		return value;
    };

})(window.htbt = window.htbt || {});
