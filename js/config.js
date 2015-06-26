(function (htbt) {

    'use strict';

    htbt.config = {};

    htbt.config.google_api_key = 'AIzaSyDBNUJQG9PXcGKkmgT4TWtXXQrCychOodI';
    htbt.config.extension_id = 'iwbv72elcu5o8zog635dvppt905xxkq';
    htbt.config.dailymotion_api_key = 'fb0e94b9cd1d6ca3c69f';
    htbt.config.dailymotion_data = {};
    //htbt.config.backend = 'https://localhost:4433'

    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://www.you1tube.dev';
        htbt.config.twitch_api_key = 'iwbv72elcu5o8zog635dvppt905xxkq';
    }
    else {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'iwbv72elcu5o8zog635dvppt905xxkq';
    }

})(window.htbt = window.htbt || {})
