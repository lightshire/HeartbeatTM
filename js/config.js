(function(htbt) {

    'use strict';

    htbt.config = {};

    htbt.config.google_api_key = 'AIzaSyDBNUJQG9PXcGKkmgT4TWtXXQrCychOodI';
    htbt.config.extension_id = 'iwbv72elcu5o8zog635dvppt905xxkq';

    if (htbt.env === 'dev') {
        htbt.config.backend = 'http://localhost:8001'
        htbt.config.twitch_api_key = 'iwbv72elcu5o8zog635dvppt905xxkq';
    } else {
        htbt.config.backend = 'http://localhost:8001'
        htbt.config.twitch_api_key = 'iwbv72elcu5o8zog635dvppt905xxkq';
    }

})(window.htbt = window.htbt || {});
