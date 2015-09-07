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
                curr_platforms = ['Twitch', 'Hitbox', 'Dailymotion', 'YouTube Gaming'],
                comp_games = [],
                curr_position = 0,
                curr_count = 0,
                ctr = 0,
                id,
                nwc = function (x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
                compile_games = function () {
                    if (streamers.online) {
                        $.each(streamers.online, function (key, value) {
                            if (!~comp_games.indexOf(value.game) && value.game) {
                                comp_games.push(value.game);
                            }
                        });
                        $.each(streamers.offline, function (key, value) {
                            if (!~comp_games.indexOf(value.game) && value.game) {
                                comp_games.push(value.game);
                            }
                        });
                        comp_games.sort();
                        comp_games.unshift('Playing unknown game', 'All games');
                        $.each(comp_games, function (key, value) {
                            $('#game_dropdown').append('<li id="' + value + '" class="game"><a href="#!">' + value + '</a></li>');
                            document.getElementById(value).addEventListener('click', function () {
                                $.each($('.game_card'), function (key, value2) {
                                    var parent = value2.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement,
                                        game = value2.children[1].innerText.length ? value2.children[1].innerText : value2.children[0].innerText;

                                    parent.style.display = 'none';

                                    if (value === game || value === 'All games') {
                                        parent.style.display = 'block';
                                    }

                                    document.getElementById('trigger_dropdown').innerText = value;
                                });
                            }, false);
                        });
                    }
                    else {
                        setTimeout(compile_games, 500);
                    }
                },
                filter_platform = function () {
                    ctr++;
                    if ($('#c_twitch')[0] && ctr === 2) {
                        $('.filter_platform').click(function () {
                            !~curr_platforms.indexOf(this.value) ? curr_platforms.push(this.value) : curr_platforms.splice(curr_platforms.indexOf(this.value), 1);
                            $.each($('.platform_icon'), function (key, value) {
                                var parent = value.parentNode.parentNode.parentNode.parentNode;
                                parent.style.display = ~curr_platforms.indexOf(value.alt) ? 'block' : 'none';
                            });
                        });
                    }
                    else {
                        setTimeout(filter_platform, 500)
                    }
                },
                process_platform = function (url) {
                    var img;
                    if (typeof url === 'undefined' || ~url.indexOf('twitch')) {
                        return <img className='platform_icon' alt='Twitch' src='images/twicon.png'></img>;
                    }
                    if (~url.indexOf('hitbox')) {
                        img = <img className='platform_icon' alt='Hitbox' src='images/hbicon.png'></img>;
                    }
                    if (~url.indexOf('dailymotion')) {
                        img = <img className='platform_icon' alt='Dailymotion' src='images/dmicon.png'></img>;
                    }
                    if (~url.indexOf('youtube')) {
                        img = <img className='platform_icon' alt='YouTube Gaming' src='images/gyicon.png'></img>;
                    }
                    return img;
                },
                process_stream_preview = function (platform, preview, status) {
                    var bg,
                        img = preview || false;
                        
                    if (!img) {
                        switch(platform) {
                            case 'Hitbox':
                                img = 'images/noprevhb.jpg';
                                break;
                            case 'Dailymotion':
                                img = 'images/noprevdm.jpg';
                                break;
                            case 'Youtube Gaming':
                                img = 'images/noprevgy.jpg';
                                break;
                            default:
                                img = 'images/noprevtw.jpg';
                                break;
                        }
                    }
                    
                    bg = <img className='lazy stream_preview' src={img} alt={status} title={status}/>
                    return bg;
                },
                hide_all = function () {
                    if ($('.online_streamer_column')[0]) {
                        $.each($('.online_streamer_column')[0].parentNode.children, function (key, a) {
                            if (key && key <= 9) {
                                a.style.display = 'block';
                            }
                        });
                    }
                    else {
                        setTimeout(hide_all, 500);
                    }
                },
                show_next_content = function (pos, count) {
                    if (pos / 200 % 1 === 0) {
                        $.each($('.online_streamer_column')[0].parentNode.children, function (key, a) {
                            if (key && key <= (9 + count)) {
                                a.style.display = 'block';
                            }
                        });
                        $.each($('.offline_streamer_column')[0].parentNode.children, function (key, a) {
                            if (key && key <= (9 + count)) {
                                a.style.display = 'block';
                            }
                        });
                    }
                };

            filter_platform();
            compile_games();
            hide_all();

            if (typeof streamers.online === 'undefined') {
                return null;
            }

            $('#loader_img').hide();
            $('#game_filter_dropdown').attr('style', 'display: block');

            $('img.lazy').lazyload({
                event: 'scrollStop',
                threshold : 200
            });

            $(window).scroll(function () {
                if ($(window)[0].scrollY / 200 % 1 === 0) {
                    curr_position += 200;
                    curr_count += 15;
                    show_next_content(curr_position, curr_count);
                }
            });

            return (<div id='inner_streamers'>
                <div className='row'>
                    <div className='filter'>
                        <p>
                            <input className='filter_platform' value='YouTube Gaming' type="checkbox" id="c_youtube_gaming" defaultChecked/>
                            <label htmlFor="c_youtube_gaming">YouTube Gaming</label>
                            <input className='filter_platform' value='Twitch' type="checkbox" id="c_twitch" defaultChecked/>
                            <label htmlFor="c_twitch">Twitch</label>
                            <input className='filter_platform' value='Hitbox' type="checkbox" id="c_hitbox" defaultChecked/>
                            <label htmlFor="c_hitbox">Hitbox</label>
                            <input className='filter_platform' value='Dailymotion' type="checkbox" id="c_dailymotion" defaultChecked/>
                            <label htmlFor="c_dailymotion">Dailymotion</label>
                        </p>
                    </div>
                    { streamers.online.map(function (onstreamer) {
                        return (<div id={onstreamer.url} className='col s12 m6 l4 online_streamer_column' style={{display: 'none'}}>
                                <div className='online_streamer'>
                                    <a href={onstreamer.url} target='_blank'>
                                        <div className='card' alt={onstreamer.status} title={onstreamer.status}>
                                            <div className='card-image'> 
                                                {process_stream_preview(onstreamer.platform, onstreamer.stream_preview, onstreamer.status)}
                                            </div> 
                                            <img className='lazy' className='user_thumb' src={onstreamer.profile_img ? onstreamer.profile_img : 'images/ukuser.png'} alt={onstreamer.dname} title={onstreamer.dname}/> 
                                            <div className='user_info'>
                                                <div className='row'>
                                                    <div className='col s12 m12 l12 status'> {onstreamer.status} </div>
                                                    <div className='col s12 m12 l12 info'>
                                                        {onstreamer.game ? <small className='game_card'>Playing: {onstreamer.game}<br/></small> : <small className='game_card'>Playing unknown game<br/></small>}
                                                        <small>{onstreamer.dname}</small>
                                                        <br/><br/>
                                                        {onstreamer.viewers ? <small><span className='viewers'><i className='fa fa-eye'></i> {nwc(onstreamer.viewers)}</span></small> : ''}
                                                        &nbsp;
                                                        {onstreamer.followers ? <small><span className='followers'><i className='fa fa-users'></i> {nwc(onstreamer.followers)}</span></small> : ''}
                                                        &nbsp;
                                                        <small><span className='indic'>Online</span></small>
                                                        &nbsp;
                                                        {onstreamer.lang ? <small><span className='lang'>{onstreamer.lang}</span></small> : ''}
                                                        &nbsp;
                                                        {onstreamer.mature ? <small><span className='mature'>M</span></small> : ''}
                                                        &nbsp;
                                                        {process_platform(onstreamer.url)}
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
                        return offstreamer.dname ? (<div id={offstreamer.url} className='col s12 m6 l4 offline_streamer_column' style={{display: 'none'}}>
                            <div className='offline_streamer'>
                                <a href={offstreamer.url} target='_blank'>
                                    <div className='card' alt={offstreamer.status} title={offstreamer.status}>
                                        <div className='card-image'> 
                                            {process_stream_preview(offstreamer.platform, offstreamer.stream_preview, offstreamer.status)}
                                        </div> 
                                        <img className='lazy' className='user_thumb' src={offstreamer.profile_img ? offstreamer.profile_img : 'images/ukuser.png'} alt={offstreamer.dname} title={offstreamer.dname}/> 
                                            <div className='user_info'>
                                                <div className='row'>
                                                    <div className='col s12 m12 l12 status'> {offstreamer.status} </div>
                                                    <div className='col s12 m12 l12 info'>
                                                        {offstreamer.game ? <small className='game_card'>Playing: {offstreamer.game}<br/></small> : <small className='game_card'>Playing unknown game<br/></small>}
                                                        <small>{offstreamer.dname}</small>
                                                        <br/><br/>
                                                        {offstreamer.views ? <small><span className='viewers'><i className='fa fa-eye'></i> {nwc(offstreamer.views)}</span></small> : ''}
                                                        &nbsp;
                                                        {offstreamer.followers ? <small><span className='followers'><i className='fa fa-users'></i> {nwc(offstreamer.followers)}</span></small> : ''}
                                                        &nbsp;
                                                        <small><span className='indic'>Offline</span></small>
                                                        &nbsp;
                                                        {offstreamer.lang ? <small><span className='lang'>{offstreamer.lang}</span></small> : ''}
                                                        &nbsp;
                                                        {offstreamer.platform}
                                                        &nbsp;
                                                        {process_platform(offstreamer.url)}
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

