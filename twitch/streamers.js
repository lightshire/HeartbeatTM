angular.module('streamersApp', [])
    .controller('streamersCtrl', function () {
        var twitch = this;
        twitch.streamers;
        console.log(twitch);
        twitch.get_streamers = function () {
            $.get(htbt.config.backend + '/twitch/get_streamers', function (data) {
                twitch.streamers = data;
            });
        };

        twitch.get_streamers();

    });

