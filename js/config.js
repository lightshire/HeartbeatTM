(function (htbt) {

    'use strict';

    htbt.config = {};

    htbt.config.google_api_key = 'AIzaSyDBNUJQG9PXcGKkmgT4TWtXXQrCychOodI';
    htbt.config.extension_id = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';
    htbt.config.dailymotion_api_key = 'fb0e94b9cd1d6ca3c69f';
    htbt.config.dailymotion_data = {};
    //htbt.config.backend = 'https://localhost:4433'

    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://www.you1tube.dev';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';
    }
    else {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';
    }

})(window.htbt = window.htbt || {})
