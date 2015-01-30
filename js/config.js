(function(htbt) {

    'use strict';

    htbt.config = {};

    if (htbt.env === 'dev') {
        htbt.config.google_api_key = 'AIzaSyDBNUJQG9PXcGKkmgT4TWtXXQrCychOodI';
        htbt.config.backend = 'https://localhost'
    } else {
        htbt.config.google_api_key = 'AIzaSyDBNUJQG9PXcGKkmgT4TWtXXQrCychOodI';
        htbt.config.backend = 'https://www.you1tube.com'
    }

})(window.htbt = window.htbt || {});
