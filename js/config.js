(function (htbt) {

    'use strict';

    htbt.config = {};

    htbt.config.google_api_key = 'AIzaSyBFAShlZr9tBGQBjtyN_IY9-SbVVn-fMcc';
    htbt.config.extension_id = 'aailiojlhjbichheofhdpcongebcgcgm';
    htbt.config.dailymotion_api_key = 'fb0e94b9cd1d6ca3c69f';
    htbt.config.dailymotion_data = {};

    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';

        htbt.config.twitch_gamestats_client_id = '7y00q297x91rp2nmbrsf3sntcj63wp5';
        htbt.config.dailymotion_gamestats_api_key = '5e43dacb88da06c35f66';
    }
    else {
        htbt.config.backend = 'https://www.you1tube.com';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';

        htbt.config.twitch_gamestats_client_id = '7c74rmw82v4f5rply265xgjmcnw44ns';
        htbt.config.dailymotion_gamestats_api_key = 'ff47060536763c4c1db5';
    }

})(window.htbt = window.htbt || {});
