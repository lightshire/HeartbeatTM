OAuth.initialize(htbt.config.instagram_api_key);

function instagram_login () {
	OAuth.redirect('instagram', 'http://www.heartbeat.tm/auth/');

}

OAuth.callback('instagram', function (error, success) { 
  console.log('error ' + error + ' success ' + success);
});