(function(htbt) {

    'use strict';

    htbt.config = {};

    htbt.config.google_api_key = 'AIzaSyDBNUJQG9PXcGKkmgT4TWtXXQrCychOodI';
    htbt.config.extension_id = 'ebaadnocffajifhmknjjofnbkidamnlc';

    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://www.you1tube.dev'
        htbt.config.twitch_api_key = 'krv1fcnhl2k3wum7tmtcdjyxukwhze9';
    } else {
        htbt.config.backend = 'https://www.you1tube.com'
        htbt.config.twitch_api_key = 'krv1fcnhl2k3wum7tmtcdjyxukwhze9';
    }

})(window.htbt = window.htbt || {});
