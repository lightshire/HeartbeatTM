OAuth.initialize(htbt.config.instagram_api_key);

function instagram_login () {
	OAuth.redirect('instagram', 'http://localhost:7676/auth/');

}

OAuth.callback('instagram', function (error, success) { 
  // See the result below
  console.log('error ' + error + ' success ' + success);
});