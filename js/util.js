(function(htbt) {

    'use strict';

    htbt.util = {};

    htbt.util.getVideoId = function getVideoId(url) {
        return url.split('videoId=')[1];
    };

})(window.htbt = window.htbt || {});
