(function(document, htbt, chrome, window, swal) {
    'use strict';

    htbt.auth = {};

    function signinCallback(authResult) {
        if (authResult.status.signed_in) {
            document.getElementById('signinButton').setAttribute('style', 'display: none');

            $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/channels',
                type: 'GET',
                data: {
                    part: 'id,snippet',
                    access_token: authResult.access_token,
                    mine: true
                },
                success: function(data) {
                    chrome.runtime.sendMessage(htbt.config.extension_id, {
                        channels: data.items
                    });

                    swal('All good! You can close this window now...');
                }
            });
        } else {
            // Update the app to reflect a signed out user
            // Possible error values:
            //   "user_signed_out" - User is signed-out
            //   "access_denied" - User denied access to your app
            //   "immediate_failed" - Could not automatically log in the user
            // console.log('Sign-in state: ' + authResult['error']);
        }
    }

    window.signinCallback = signinCallback; // so that signing button can see


})(window.document, window.htbt = window.htbt || {}, window.chrome, window, window.swal);
