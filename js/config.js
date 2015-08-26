(function (htbt) {

    'use strict';

    htbt.config = {};

    htbt.config.google_api_key = 'AIzaSyBFAShlZr9tBGQBjtyN_IY9-SbVVn-fMcc';
    htbt.config.extension_id = 'aailiojlhjbichheofhdpcongebcgcgm';
    htbt.config.dailymotion_api_key = 'fb0e94b9cd1d6ca3c69f';
    htbt.config.dailymotion_data = {};

    if (htbt.env === 'dev') {
        htbt.config.backend = 'https://localhost';
        htbt.config.twitch_api_key = 'ejhmzlu5zwlldjajydsc6ijmoiqq1pw';

        htbt.config.twitch_gamestats_client_id = 'j0sczt79255jt72i5jfdvjl7brqz0j2';
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

})(window.htbt = window.htbt || {});
