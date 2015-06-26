(function (htbt) {

    'use strict';

    htbt.config = {};

    htbt.config.google_api_key = 'AIzaSyBFAShlZr9tBGQBjtyN_IY9-SbVVn-fMcc';
    htbt.config.extension_id = 'iwbv72elcu5o8zog635dvppt905xxkq';

    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://www.you1tube.dev';
        htbt.config.twitch_api_key = 'iwbv72elcu5o8zog635dvppt905xxkq';
    }
    else {
        htbt.config.backend = 'http://www.you1tube.com';
        htbt.config.twitch_api_key = 'iwbv72elcu5o8zog635dvppt905xxkq';
    }

})(window.htbt = window.htbt || {});

