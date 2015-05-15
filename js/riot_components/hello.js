riot.tag('hello', '<div class="container"> <div class="title"> <h5>Heartbeat / Twitch Streamers</h5> </div> <div class="streamers"> <div class="row"> <div class="col s4" each="{ onstreamer, i in streamers.online }"> <div id="streamer_{onstreamer._id}" class="online_streamer"> <a href="{onstreamer.url}"> <div class="card"> <div class="card-image"> <img riot-src="{onstreamer.stream_preview}" alt="{onstreamer.status}" title="{onstreamer.status}"> </div> <div class="user_img"> <img if="{ onstreamer.profile_img }" class="user_thumb" riot-src="{onstreamer.profile_img}" alt="{onstreamer.dname}" title="{onstreamer.dname}"> <img if="{ !onstreamer.profile_img }" class="user_thumb" src="images/ukuser.png" alt="{onstreamer.dname}" title="{onstreamer.dname}"> </div> <div class="user_info"> <div class="row"> <div class="col s12"> {onstreamer.status} </div> <div class="col s5"> {onstreamer.dname} </div> <div class="col s5"> <small>V: <span>{onstreamer.viewers}</span></small> </div> <div class="col s2"> <span class="badge">{onstreamer.brlang}</span> </div> </div> </div> </div> </a> </div> </div> <div class="col s4" each="{ offstreamer, i in streamers.offline }"> <div id="streamer_{offstreamer._id}" class="offline_streamer"> <a href="{offstreamer.url}"> <div class="cover"></div> <div class="card"> <div class="card-image"> <img if="{ offstreamer.stream_preview!=\'offline\' }" riot-src="{onstreamer.stream_preview}" alt="{offstreamer.status}" title="{offstreamer.status}"> <img if="{ offstreamer.stream_preview==\'offline\' }" src="images/noprev.jpg" alt="{offstreamer.status}" title="{offstreamer.status}"> </div> <div class="user_img"> <img if="{ offstreamer.profile_img }" class="user_thumb" riot-src="{offstreamer.profile_img}" alt="{offstreamer.dname}" title="{offstreamer.dname}"> <img if="{ !offstreamer.profile_img }" class="user_thumb" src="images/ukuser.png" alt="{offstreamer.dname}" title="{offstreamer.dname}"> </div> <div class="user_info"> <div class="row"> <div class="col s12"> {offstreamer.status} </div> <div class="col s5"> {offstreamer.dname} </div> </div> </div> </div> </a> </div> </div> </div> </div> </div>', function(opts) {
    this.streamers;
    this.get_streamers = function() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', 'http://www.you1tube.com/twitch/get_streamers', false);
        xmlHttp.send(null);
        this.streamers = JSON.parse(xmlHttp.response);
        console.log(this.streamers);
    };
    this.get_streamers();

    setTimeout(function() {
        this.get_streamers();
    }, 60000);

    
});

