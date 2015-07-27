(function (htbt) {

    'use strict';

    htbt.config = {};

    htbt.config.google_api_key = 'AIzaSyBFAShlZr9tBGQBjtyN_IY9-SbVVn-fMcc';
    htbt.config.extension_id = 'aailiojlhjbichheofhdpcongebcgcgm';
    htbt.config.dailymotion_api_key = 'fb0e94b9cd1d6ca3c69f';
    htbt.config.dailymotion_data = {};

    htbt.env = 'dev';

    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';
        htbt.config.login_url = 'http://api.dev.accounts.freedom.tm:8000/auth';
    }
    else {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';
        htbt.config.login_url = 'http://api.accounts.freedom.tm/auth';
    }

})(window.htbt = window.htbt || {});
