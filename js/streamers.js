/** @jsx React.DOM **/
(function (React) {
    'use strict';

    var TwitchHBStreamers = React.createClass({
        getInitialState: function() {
            return {streamers:[]};
        },
        getStreamers: function() {  
            var self = this;
            $.get('http://www.you1tube.com/twitch/get_streamers').done(function(data) {
                self.setState({streamers:data});
            });
        },
        componentWillMount: function() {
            this.getStreamers();
        },
        render: function() {
            var streamers = this.state.streamers,
                temp_streamers = [],
                id,
                filter_cards = function (e) {
                    id = e.target.id;

                    $.each($('#inner_streamers')[0].children[0].children, function (key, value) {
                        value.style.display = 'block';

                        if (!~value.id.indexOf(id) && key) {
                            value.style.display = 'none';
                        }

                        if (id === 'all') {
                            value.style.display = 'block';
                        }
                    });

                    $.each($('#inner_streamers')[0].children[2].children, function (key, value) {
                        value.style.display = 'block';

                        if (!~value.id.indexOf(id) && key) {
                            value.style.display = 'none';
                        }

                        if (id === 'all') {
                            value.style.display = 'block';
                        }
                    });

                    $.each($('button'), function (key, value) {
                        value.disabled = false;

                        if (value.id === id) {
                            value.disabled = true;
                        }
                    });
                };

            if (typeof streamers.online === 'undefined') {
                return null;
            }
            return (<div id='inner_streamers'>
                <div className='row'>
                    <div className='filter'>
                        <button id='all' className='waves-effect waves-light waves-light white black-text btn' onClick={filter_cards}>All</button>
                        <button id='twitch' className='waves-effect waves-light waves-light deep-purple lighten-2 btn' onClick={filter_cards}>Twitch</button>
                        <button id='hitbox' className='waves-effect waves-light waves-light light-green btn' onClick={filter_cards}>Hitbox</button>
                        <button id='dailymotion' className='waves-effect waves-light waves-light blue lighten-2 btn' onClick={filter_cards}>Dailymotion</button>
                    </div>
                    { streamers.online.map(function (onstreamer) {
                        return (<div id={onstreamer.url} className='col s12 m6 l4'>
                                <div className='online_streamer'>
                                    <a href={onstreamer.url}>
                                        <div className='card' alt={onstreamer.status} title={onstreamer.status}>
                                            <div className='card-image'> 
                                                <img src={onstreamer.stream_preview ? onstreamer.stream_preview : 'images/noprev.jpg'} alt={onstreamer.status} title={onstreamer.status}/>
                                            </div> 
                                            <img className='user_thumb' src={onstreamer.profile_img ? onstreamer.profile_img : 'images/ukuser.png'} alt={onstreamer.dname} title={onstreamer.dname}/> 
                                            <div className='user_info'>
                                                <div className='row'>
                                                    <div className='col s12 m12 l12 status'> {onstreamer.status} </div>
                                                    <div className='col s12 m12 l12 info'>
                                                        {onstreamer.game ? <small className='game'>Playing: {onstreamer.game}<br/></small> : <small>Playing unknown game<br/></small>}
                                                        <small>{onstreamer.dname}</small>
                                                        <br/><br/>
                                                        <small><span className='viewers'><i className='fa fa-eye'></i> {onstreamer.viewers.toLocaleString()}</span></small>
                                                        &nbsp;
                                                        {onstreamer.followers ? <small><span className='followers'><i className='fa fa-users'></i> {onstreamer.followers.toLocaleString()}</span></small> : ''}
                                                        &nbsp;
                                                        <small><span className='indic'>Online</span></small>
                                                        &nbsp;
                                                        {onstreamer.lang ? <small><span className='lang'>{onstreamer.lang}</span></small> : ''}
                                                        &nbsp;
                                                        {onstreamer.mature ? <small><span className='mature'>M</span></small> : ''}
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
                <hr/>
                <div className='row'>
                    {streamers.offline.map(function(offstreamer) {
                        return offstreamer.dname ? (<div id={offstreamer.url} className='col s12 m6 l4'>
                            <div className='offline_streamer'>
                                <a href={offstreamer.url}>
                                    <div className='card' alt={offstreamer.status} title={offstreamer.status}>
                                        <div className='card-image'> 
                                            <img src='images/noprev.jpg' alt={offstreamer.status} title={offstreamer.status}/>
                                        </div> 
                                        <img className='user_thumb' src={offstreamer.profile_img ? offstreamer.profile_img : 'images/ukuser.png'} alt={offstreamer.dname} title={offstreamer.dname}/> 
                                            <div className='user_info'>
                                                <div className='row'>
                                                    <div className='col s12 m12 l12 status'> {offstreamer.status} </div>
                                                    <div className='col s12 m12 l12 info'>
                                                        {offstreamer.game ? <small>Playing: {offstreamer.game}<br/></small> : <small>Playing unknown game<br/></small>}
                                                        <small>{offstreamer.dname}</small>
                                                        <br/><br/>
                                                        <small><span className='viewers'><i className='fa fa-eye'></i> {offstreamer.views.toLocaleString()}</span></small>
                                                        &nbsp;
                                                        {offstreamer.followers ? <small><span className='followers'><i className='fa fa-users'></i> {offstreamer.followers.toLocaleString()}</span></small> : ''}
                                                        &nbsp;
                                                        <small><span className='indic'>Offline</span></small>
                                                        &nbsp;
                                                        {offstreamer.lang ? <small><span className='lang'>{offstreamer.lang}</span></small> : ''}
                                                        &nbsp;
                                                        {offstreamer.mature ? <small><span className='mature'>M</span></small> : ''}
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </a>
                            </div>
                        </div>) : '';
                    })}
                </div>
            </div>);
        },
        componentDidMount: function() {
            setInterval(this.getStreamers, 300000);
        }
    });
    React.render(<TwitchHBStreamers/>, document.getElementById('streamers'));

})(window.React);

