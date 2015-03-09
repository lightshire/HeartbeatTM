(function(htbt) {

    'use strict';

    htbt.config = {};

    if (htbt.env === 'dev') {
        htbt.config.google_api_key = 'AIzaSyDBNUJQG9PXcGKkmgT4TWtXXQrCychOodI';
        htbt.config.backend = 'https://localhost'
        htbt.config.twitch_api_key = 'krv1fcnhl2k3wum7tmtcdjyxukwhze9';
    } else {
        htbt.config.google_api_key = 'AIzaSyDBNUJQG9PXcGKkmgT4TWtXXQrCychOodI';
        htbt.config.backend = 'https://www.you1tube.com'
        htbt.config.twitch_api_key = 'krv1fcnhl2k3wum7tmtcdjyxukwhze9';
    }

})(window.htbt = window.htbt || {});
