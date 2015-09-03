(function (htbt) {

    'use strict';

    htbt.config = {};

    htbt.config.google_api_key = 'AIzaSyBFAShlZr9tBGQBjtyN_IY9-SbVVn-fMcc';
    htbt.config.extension_id = 'aailiojlhjbichheofhdpcongebcgcgm';
    htbt.config.dailymotion_api_key = 'fb0e94b9cd1d6ca3c69f';
    htbt.config.facebook_app_id = '789564111159166';
    htbt.config.twitter_api_key = 'bgAVUSdm5CQJOVBwXBHZoPIsb';
    htbt.config.dailymotion_data = {};
    htbt.config.twitch_dev_api_key = 'pg40jcdu6to0tk17gs4az88bq8m3q7';
    htbt.config.instagram_api_key = 'bf4496692aa246c08c9b0991659b2d23';
    htbt.config.auth_page = 'http://www.heartbeat.tm/auth/';

    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://localhost';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';

        htbt.config.twitch_gamestats_client_id = 'fsjhxlps80c5wby8mffv0hvlau2fdu2';
        htbt.config.dailymotion_gamestats_api_key = '5e43dacb88da06c35f66';

        htbt.config.login_url = 'http://api.dev.accounts.freedom.tm:8000/auth';
    }
    else {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';

        htbt.config.twitch_gamestats_client_id = 'fsjhxlps80c5wby8mffv0hvlau2fdu2';
        htbt.config.dailymotion_gamestats_api_key = 'ff47060536763c4c1db5';

        htbt.config.login_url = 'http://api.accounts.freedom.tm/auth';
    }

})(window.htbt = window.htbt || {});
