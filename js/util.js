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

    htbt.util.parse_qs = function (url) {
        var obj = {};

        if (!url) {
            url = location.search;
        }

        url.slice(url.indexOf('?') + 1)
            .split('&')
            .forEach(function (a) {
                if (a) {
                    a = a.split('=');
                    obj[a[0]] = decodeURIComponent(a.slice(1).join('='));
                }
            });

        return obj;
    };

})(window.htbt = window.htbt || {});
