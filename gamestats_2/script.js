/** @jsx React.DOM **/
(function (React, htbt) {
    'use strict';

    var Fields = React.createClass({
        render: function() {
            return (<div>
                        <div className="title">
                            <h4>
                                <img id='hb-logo' src='https://s3.amazonaws.com/heartbeat.asset/logo.png?2' />
                                Heartbeat Game Stats 2
                            </h4>
                            <p><b>Register your usernames or IDs here to publish your stats on Twitch, Hitbox and Dailymotion!</b>
                            <br/><small>We will find your game stats and embed a sick UI for your viewers to see!</small></p>
                        </div><br/>
                        <div className='fields'>
                            <div className='row'>
                                <div className='dota'>
                                    <div className="col s4">
                                        <p id='dota2-name'>
                                            <img id='dota2-logo' src='assets/dota2.png'/>
                                            Dota 2
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="dota2_username" type="text" className="fields validate" />
                                            <label htmlFor="dota2_username">Dota ID (ex: 1xxxxxxxx)</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='lol'>
                                    <div className="col s4">
                                        <p id='lol-name'>
                                            <img id='lol-logo' src='assets/lol.png'/>
                                            League of Legends
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field col s4">
                                            <input id="lol_username" type="text" className="fields validate"/>
                                            <label htmlFor="lol_username">Summoner Name</label>
                                        </div>
                                        <div className="input-field col s4">
                                            <select className="browser-default validate fields">
                                                <option disabled>Region</option>
                                                <option value="na">North America</option>
                                                <option value="euw">Europe West</option>
                                                <option value="eune">Europe Nordic & East</option>
                                                <option value="br">Brazil</option>
                                                <option value="tr">Turkey</option>
                                                <option value="br">Brazil</option>
                                                <option value="ru">Russia</option>
                                                <option value="lan">Latin America North</option>
                                                <option value="las">Latin America South</option>
                                                <option value="oce">Oceania</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='hearthstone'>
                                    <div className="col s4">
                                        <p id='hearthstone-name'>
                                            <img id='hearthstone-logo' src='assets/hearthstone.png'/>
                                            Hearthstone
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="hearthstone_username" type="text" className="fields validate" disabled='true'/>
                                            <label htmlFor="hearthstone_username">API not yet available</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='hots'>
                                    <div className="col s4">
                                        <p id='hots-name'>
                                            <img id='hots-logo' src='assets/hots.png'/>
                                            Heroes of the Storm
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="hots_username" type="text" className="fields validate" disabled='true'/>
                                            <label htmlFor="hots_username">API not yet available</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='diablo3'>
                                    <div className="col s4">
                                        <p id='diablo3-name'>
                                            <img id='diablo3-logo' src='assets/diablo3.png'/>
                                            Diablo 3
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="diablo3_username" type="text" className="fields validate" disabled='true'/>
                                            <label htmlFor="diablo3_username">Under construction for Hitbox and Dailymotion</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='csgo'>
                                    <div className="col s4">
                                        <p id='csgo-name'>
                                            <img id='csgo-logo' src='assets/csgo.png'/>
                                            Counter Strike: Global Offensive
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="csgo_username" type="text" className="fields validate" disabled='true'/>
                                            <label htmlFor="csgo_username">API not yet available</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='wow'>
                                    <div className="col s4">
                                        <p id='wow-name'>
                                            <img id='wow-logo' src='assets/wow.png'/>
                                            World of Warcraft
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="wow_username" type="text" className="fields validate"/>
                                            <label htmlFor="wow_username">Character name</label>
                                        </div>
                                    </div>
                                    <div className="col s4 offset-s4">
                                        <div className="input-field">
                                            <select className="browser-default fields validate">
                                                <option disabled>Region</option>
                                                <option value="cn">China</option>
                                                <option value="eu">Europe</option>
                                                <option value="kr">Korea</option>
                                                <option value="tw">Taiwan</option>
                                                <option value="us">United States</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col s4">
                                        <div className="input-field">
                                            <input id="wow_realm" type="text" className="fields validate"/>
                                            <label htmlFor="wow_realm">Realm</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='minecraft'>
                                    <div className="col s4">
                                        <p id='minecraft-name'>
                                            <img id='minecraft-logo' src='assets/minecraft.png'/>
                                            Minecraft
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="minecraft_username" type="text" className="fields validate" disabled='true'/>
                                            <label htmlFor="minecraft_username">Under construction</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="platforms">
                                <div className="row">
                                    <div className="twitch col s4">
                                        <div className="input-field">
                                            <input id="twitch" type="text" className="platform_fields validate"/>
                                            <label htmlFor="twitch">Twitch Username</label>
                                        </div>
                                    </div>
                                    <div className="hitbox col s4">
                                        <div className="input-field">
                                            <input id="hitbox" type="text" className="platform_fields validate"/>
                                            <label htmlFor="hitbox">Hitbox Username</label>
                                        </div>
                                    </div>
                                    <div className="dailymotion col s4">
                                        <div className="input-field">
                                            <input id="dailymotion" type="text" className="platform_fields validate"/>
                                            <label htmlFor="dailymotion">Dailymotion Username or ID</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='right-align'>
                                    <button id='submit_usernames' className='waves-effect waves-light btn'>Submit</button>
                                </div>
                            </div>
                            <br/>
                            <div id="footer">
                                <small><a href="https://chrome.google.com/webstore/detail/heartbeat/aailiojlhjbichheofhdpcongebcgcgm?hl=en">Heartbeat</a> | <a href="https://www.freedom.tm/">Freedom!</a> &copy; 2015</small>
                            </div>
                        </div>
                    </div>);
        },
        componentDidMount: function() {
            var data = {};

            $("#submit_usernames").bind('click', function() {
                var ctr = 0;

                $.each($('.fields'), function(i, a) {
                    if (a.value) {
                        data[a.id] = a.value;
                    }
                });

                $.each($('.platform_fields'), function(i, a) {
                    if (a.value) {
                        data[a.id] = a.value;
                    }
                });

                !$('#twitch').val() ? ctr++ : ctr = 0;
                !$('#hitbox').val() ? ctr++ : ctr = 0;
                !$('#dailymotion').val() ? ctr++ : ctr = 0;

                if (ctr < 3) {

                    $('#loader').attr('style', 'display:');
                    $('#fields').attr('style', 'display:none');
                    $.ajax({
                        type: "POST",
                        url:  'http://localhost/save_game_usernames',
                        data
                    })
                    .done(function (result) {
                        if (result) {
                            $('#loader').attr('style', 'display:none');
                            $('#confirm').attr('style', 'display:');
                        }
                    });

                }

            });
        }
    }),
    
    Loader = React.createClass({
        render: function() {
            return (<div id="preloader" className="center-align">
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="flow-text">Saving your information...</p>
                        </div>
                    </div>);
        }
    }),

    Confirm = React.createClass({
        render: function() {
            return (<div id="confirm-msg" className="center-align">
                        <p className="flow-text">
                            Thanks for waiting. Your stats are now indexed.<br/>
                            <small>Your viewers will now be able to see your stats when you stream on Twitch, Hitbox, Dailymotion</small>
                        </p>
                        <button id='go_back' className='waves-effect waves-light btn'>Go back</button>
                    </div>);
        },
        componentDidMount: function () {
            $("#go_back").bind('click', function() {
                $('#fields').attr('style', 'display:');
                $('#confirm').attr('style', 'display:none');
            });
        }
    });
    
    React.render(<Fields/>, document.getElementById('fields'));
    React.render(<Loader/>, document.getElementById('loader'));
    React.render(<Confirm/>, document.getElementById('confirm'));

})(window.React, window.htbt);

