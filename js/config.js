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

    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://www.you1tube.dev';
        htbt.config.twitch_api_key = 'iwbv72elcu5o8zog635dvppt905xxkq';
    }
    else {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'iwbv72elcu5o8zog635dvppt905xxkq';
    }
    
    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';

        htbt.config.twitch_gamestats_client_id = '7y00q297x91rp2nmbrsf3sntcj63wp5';
        htbt.config.dailymotion_gamestats_api_key = '5e43dacb88da06c35f66';

        htbt.config.login_url = 'http://api.dev.accounts.freedom.tm:8000/auth';
    }
    else {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';

        htbt.config.twitch_gamestats_client_id = '7c74rmw82v4f5rply265xgjmcnw44ns';
        htbt.config.dailymotion_gamestats_api_key = 'ff47060536763c4c1db5';

        htbt.config.login_url = 'http://api.accounts.freedom.tm/auth';
    }

    // for dev local - remove it when use live server
    htbt.config.backend = 'https://localhost:4433';
    htbt.config.auth_page = 'http://localhost:7676/auth/';
})(window.htbt = window.htbt || {});
