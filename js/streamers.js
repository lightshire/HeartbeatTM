/** @jsx React.DOM **/
(function (React) {
    'use strict';

    var TwitchHBStreamers = React.createClass({
        getInitialState: function() {
            return {streamers:[]};
        },
        getStreamers: function() {  
            var xmlHttp = new XMLHttpRequest(),
                self = this;
            xmlHttp.open('GET', 'http://www.you1tube.com/twitch/get_streamers', false);
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.status==200) {
                    self.setState({streamers:JSON.parse(xmlHttp.responseText)});
                }
            }
            xmlHttp.send(null);
        },
        componentWillMount: function() {
            this.getStreamers();
        },
        render: function() {
            var streamers = this.state.streamers;
            if (typeof streamers.online === 'undefined') {
                return null;
            }
            return (<div id="inner_streamers">
                <div className="row">
                    { streamers.online.map(function(onstreamer) {
                        return (<div className="col s12 m6 l4">
                                <div className="online_streamer">
                                    <a href={onstreamer.url}>
                                        <div className="card" alt={onstreamer.status} title={onstreamer.status}>
                                            <div className="card-image"> 
                                                <img src={onstreamer.stream_preview ? onstreamer.stream_preview : "images/noprev.jpg"} alt={onstreamer.status} title={onstreamer.status}/>
                                            </div> 
                                            <img className="user_thumb" src={onstreamer.profile_img ? onstreamer.profile_img : "images/ukuser.png"} alt={onstreamer.dname} title={onstreamer.dname}/> 
                                            <div className="user_info">
                                                <div className="row">
                                                    <div className="col s12 m12 l12 status"> {onstreamer.status.length > 15 ? onstreamer.status.substr(0, 15)+'...' : onstreamer.status} </div>
                                                    <div className="col s12 m12 l12 info">
                                                        <small>{onstreamer.dname}</small>
                                                        <br/>
                                                        <small>Viewers: {onstreamer.viewers}</small> &nbsp; <small><span className="indic">Online</span></small> &nbsp; <small><span className="lang">{onstreamer.brlang}</span></small> </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>)
                        })
                    }
                </div>
                <hr/>
                <div className="row">
                    { streamers.offline.map(function(offstreamer) {
                        return (<div className="col s12 m6 l4">
                                <div className="offline_streamer">
                                    <a href={offstreamer.url}>
                                        <div className="card" alt={offstreamer.status} title={offstreamer.status}>
                                            <div className="card-image"> 
                                                <img src={offstreamer.stream_preview="offline" ? "images/noprev.jpg" : offstreamer.stream_preview} alt={offstreamer.status} title={offstreamer.status}/>
                                            </div> 
                                            <img className="user_thumb" src={offstreamer.profile_img ? offstreamer.profile_img : "images/ukuser.png"} alt={offstreamer.dname} title={offstreamer.dname}/> 
                                            <div className="user_info">
                                                <div className="row">
                                                    <div className="col s12 m12 l12 status">{offstreamer.status ? offstreamer.status.length > 15 ? offstreamer.status.substr(0, 15)+'...' : offstreamer.status : 'No status message'}</div>
                                                    <div className="col s12 m12 l12 info">
                                                        <small>{offstreamer.dname}</small>
                                                        <br/>
                                                        <small><span className="indic">Offline</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>);
        },
        componentDidMount: function() {
            setInterval(this.getStreamers, 300000);
        }
    });
    React.render(<TwitchHBStreamers/>, document.getElementById('streamers'));

})(window.React);

