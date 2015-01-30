(function (htbt) {
	if (window.location.href.indexOf('heartbeat.dev') > 0) {
		htbt.env = 'dev';
	} else {
		htbt.env = 'prod';
	}
})(window.htbt = window.htbt || {});