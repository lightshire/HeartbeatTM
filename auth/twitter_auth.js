function twitter_login() {
    request_token();
}

function request_token() {
    $.ajax({
        type: "POST",
        url: 'https://api.twitter.com/1.1/',
        headers: {
            Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
            oauth_consumer_key: "bgAVUSdm5CQJOVBwXBHZoPIsb",
            oauth_nonce: "http%3A%2F%4d69fe02b40a7ed24db2b8ba76602aab.com%3A3005%2Ftwitter%2Fprocess_callback",
            oauth_signature: "L7E9ZAcFLDD4XKyRsxzriVEwnV4",
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: "1435635311",
            oauth_version: "1.0",
            oauth_callback: 'http://www.heartbeat.tm/auth/'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'OAuth');
        },
        dataType: 'jsonp',
        success: function (data, textStatus, jqXHR) {
            console.log('data ' + JSON.stringify(data));
            console.log('data1 ' + JSON.stringify(textStatus));
            console.log('data2 ' + JSON.stringify(jqXHR));
        },
        error: function (xhr, status, error) {
            console.log('err ' + JSON.stringify(xhr));
            console.log('err1 ' + JSON.stringify(status));
            console.log('err2 ' + JSON.stringify(error));
        }
    });
}

document.getElementById('digits-sdk')
    .onload = function () {
        Digits.init({
            consumerKey: 'yourConsumerKey'
        });
    };

