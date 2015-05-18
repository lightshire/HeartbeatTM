riot.tag('hello', '<div class="container"> <div class="title"> <h5>Heartbeat / Twitch Streamers</h5> </div> <div class="streamers"> <div class="row"> <div class="col s12 m6 l4" each="{ onstreamer, i in streamers.online }"> <div id="streamer_{onstreamer._id}" class="online_streamer"> <a href="{onstreamer.url}"> <div class="card" alt="{onstreamer.status}" title="{onstreamer.status}"> <div class="card-image"> <img riot-src="{onstreamer.stream_preview}" alt="{onstreamer.status}" title="{onstreamer.status}"> </div> <img if="{ onstreamer.profile_img }" class="user_thumb" riot-src="{onstreamer.profile_img}" alt="{onstreamer.dname}" title="{onstreamer.dname}"> <img if="{ !onstreamer.profile_img }" class="user_thumb" src="images/ukuser.png" alt="{onstreamer.dname}" title="{onstreamer.dname}"> <div class="user_info"> <div class="row"> <div if="{onstreamer.status}" class="col s12 m12 l12 status"> {limit_chars(onstreamer.status, 20)} </div> <div if="{!onstreamer.status}" class="col s12 m12 l12 status"> &nbsp; </div> <div class="col s12 m12 l12 info"> <small>{onstreamer.dname}</small> <br> <small>Viewers: {onstreamer.viewers}</small> &nbsp; <small><span class="indic">Online</span></small> &nbsp; <small><span class="lang">{onstreamer.brlang}</span></small> </div> </div> </div> </div> </a> </div> </div> <div class="col s12 m6 l4" each="{ offstreamer, i in streamers.offline }"> <div id="streamer_{offstreamer._id}" class="offline_streamer"> <a href="{offstreamer.url}"> <div class="cover"></div> <div class="card" alt="{onstreamer.status}" title="{onstreamer.status}"> <div class="card-image"> <img if="{ offstreamer.stream_preview!=\'offline\' }" riot-src="{onstreamer.stream_preview}" alt="{offstreamer.status}" title="{offstreamer.status}"> <img if="{ offstreamer.stream_preview==\'offline\' }" src="images/noprev.jpg" alt="{offstreamer.status}" title="{offstreamer.status}"> </div> <img if="{ offstreamer.profile_img }" class="user_thumb" riot-src="{offstreamer.profile_img}" alt="{offstreamer.dname}" title="{offstreamer.dname}"> <img if="{ !offstreamer.profile_img }" class="user_thumb" src="images/ukuser.png" alt="{offstreamer.dname}" title="{offstreamer.dname}"> <div class="user_info"> <div class="row"> <div if="{offstreamer.status}" class="col s12 m12 l12 status"> {limit_chars(offstreamer.status, 19)} </div> <div if="{!offstreamer.status}" class="col s12 m12 l12 status"> &nbsp; </div> <div class="col s12 m12 l12 info"> <small>{offstreamer.dname}</small> <br> <small><span class="indico">Offline</span></small> </div> </div> </div> </div> </a> </div> </div> </div> </div> </div>', function(opts) {
    this.streamers;
    get_streamers = function() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', 'http://www.you1tube.com/twitch/get_streamers', false);
        xmlHttp.send(null);
        this.streamers = JSON.parse(xmlHttp.response);
        console.log(this.streamers);
    };
    limit_chars = function(str, limit) {
        var clean = String(str);
        if (clean.length > limit) {
            return clean.substr(0, limit) + '...';
        } else {
            return clean;
        }
    }
    this.get_streamers = get_streamers;
    this.limit_chars = limit_chars;

    this.get_streamers();

    setTimeout(function() {
        this.get_streamers();
    }, 60000);

    
});

