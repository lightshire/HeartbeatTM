/** @jsx React.DOM **/
(function (React, htbt) {
    'use strict';

    var Modal = React.createClass({
            render: function () {
                return (<div id="modal1" className="modal modal-fixed-footer">
                            <div className="modal-content">
                                <h4>User Guide</h4>
                                <p>This feature allows users of Heartbeat to be able to see your game statistics from 
                                different streaming platforms. Let us start.</p>
                                <p>First you need to have an account on at least one of these platforms: Twitch, Dailymotion, and Hitbox. 
                                Then log-in to them via these links. You can enter all accounts if you want.</p>
                                <img width="100%" src="assets/step1.png" />
                                <p>Enter your game information on the fields corresponding to the games you want your stats to be shown.</p>
                                <img width="100%" src="assets/step2.png" />
                                <p>After signing-up, you will see a message like the one below, and we will be able to fetch your game data via this information</p>
                                <img width="100%" src="assets/step3.png" />
                                <p>Heartbeat users can now see your game statistics in the platforms you entered just like the example below.</p>
                                <img width="100%" src="assets/sample1.png" />
                                <img width="100%" src="assets/sample2.png" />
                            </div>
                            <div className="modal-footer">
                                <a href="" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                            </div>
                        </div>);
            },
            componentDidMount: function () {
                $('.modal-trigger').leanModal();
            }
        }),
        Hitbox_Login = React.createClass({
            render: function () {
                return (<div className="center-align">
                                <div className="col s12 m8 hoverable">
                                    <div className="card black">
                                        <div className="card-content white-text container">
                                            <span className="card-title light-green-text">Log-in with Hitbox</span>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input id="hitbox_username" type="text" className="validate light-green-text" />
                                                    <label htmlFor="username" className="light-green-text">Username</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input id="hitbox_password" type="password" className="validate light-green-text" />
                                                    <label htmlFor="password" className="light-green-text">Password</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-action">
                                            <a href="" id="cancel_hitbox">Cancel</a>
                                            <a className="btn waves-effect waves-light light-green black-text submit_hitbox" type="submit" name="action">Submit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        </div>);
            },
            componentDidMount: function () {
                $('#cancel_hitbox').bind('click', function () {
                    $('#hitbox_login').hide();
                    $('#fields').show();
                });

                $('.submit_hitbox').bind('click', function () {
                    var username = $('#hitbox_username').val(),
                        password = $('#hitbox_password').val();

                    $('#loader').show();
                    $('#hitbox_login').hide();
                    $.ajax({
                        url: 'https://api.hitbox.tv/auth/token',
                        method: 'POST',
                        dataType: 'json',
                        data: {
                            login: username,
                            pass: password
                            }
                    })
                    .done(function (result) {
                        $('#loader').hide();
                        $('#hitbox_login').show();
                        if (result.authToken) {
                            document.cookie = "hitbox=" + username;
                            $('#hitbox_login').hide();
                            $('.hitbox-connect2').hide();
                            $('#hitbox').val(username);
                            $('#hitbox-input').show();
                            $('#fields').show();
                        }
                        else {
                            Materialize.toast('Username and Password doesn\'t match', 1000);
                        }
                    })
                    .fail(function () {
                        $('#loader').hide();
                        $('#hitbox_login').show();
                        Materialize.toast('Username and Password doesn\'t match', 1000);
                    });
                });
            }
        }),
        Fields = React.createClass({
            render: function () {
                return (<div>
                            <div className="title">
                                <h4>
                                    <img id='hb-logo' src='https://s3.amazonaws.com/heartbeat.asset/logo.png?2' />
                                    Heartbeat Game Stats
                                </h4>
                                <p><b>Register your usernames or IDs here to publish your stats on Twitch, Hitbox and Dailymotion!</b>
                                <br/><small>We will find your game stats and embed a sick UI for your viewers to see!</small>
                                <a className="modal-trigger waves-effect waves-green btn-flat" href="#modal1">More info</a></p>
                            </div>
                            <h4>Step 1</h4>
                            <div className='fields'>
                                <div className="platforms">
                                    <h6><i className="material-icons">web</i>Choose the platforms where you stream</h6>
                                    <hr/><br/>
                                    <div className="row">
                                        <div className="twitch col s4">
                                            <a className="waves-effect waves-light btn purple darken-3 twitch-connect col s10">Twitch</a>
                                            <div id='twitch-input' className="input-field" style={{display: 'none'}}>
                                                <input id="twitch" type="text" className="platform_fields validate" disabled/>
                                                <label className="active" htmlFor="twitch">Twitch Username</label>
                                                <a className="waves-effect waves-green red btn twitch-unlink small" href="">unlink</a>
                                            </div>
                                        </div>
                                        <div className="dailymotion col s4">
                                            <a className="waves-effect waves-light btn blue darken-1 dailymotion-connect col s10">Dailymotion</a>
                                            <div id="dailymotion-input" className="input-field" style={{display: 'none'}}>
                                                <input id="dailymotion" type="text" className="platform_fields validate" disabled/>
                                                <label className="active" htmlFor="dailymotion">Dailymotion Username</label>
                                                <a className="waves-effect waves-green red btn dailymotion-unlink small" href="">unlink</a>
                                            </div>
                                        </div>
                                        <div className="hitbox col s4">
                                            <a className="waves-effect waves-light btn light-green black-text hitbox-connect2 col s10">Hitbox</a>
                                            <div id="hitbox-input" className="input-field" style={{display: 'none'}}>
                                                <input id="hitbox" type="text" className="platform_fields validate" disabled/>
                                                <label className="active" htmlFor="hitbox">Hitbox Username</label>
                                                <a className="waves-effect waves-green red btn hitbox-unlink small" href="">unlink</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4>Step 2</h4>
                                <h6><i className="material-icons">games</i> Enter your game information for the games you want to display your stats</h6>
                                <hr/>
                                <br/>
                                <div className='dota row'>
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
                                <div className='lol row'>
                                    <div className="col s4">
                                        <p id='lol-name'>
                                            <img id='lol-logo' src='assets/lol.png'/>
                                            League of Legends
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field col s4">
                                            <input id="lol_summonername" type="text" className="fields validate"/>
                                            <label htmlFor="lol_summonername">Summoner Name</label>
                                        </div>
                                        <div className="input-field col s4">
                                            <select id="lol_region" className="browser-default validate fields">
                                                <option value="">Region</option>
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
                                <div className='diablo3 row'>
                                    <div className="col s4">
                                        <p id='diablo3-name'>
                                            <img id='diablo3-logo' src='assets/diablo3.png'/>
                                            Diablo 3
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="diablo3_battletag" type="text" className="fields validate"/>
                                            <label htmlFor="diablo3_battletag">Battle Tag in name-#### format (ie. Noob-1234)</label>
                                        </div>
                                    </div>
                                    <div className="col s4 offset-s4">
                                        <div className="input-field">
                                            <select id="diablo3_region" className="browser-default fields validate">
                                                <option value="">Region</option>
                                                <option value="cn">China</option>
                                                <option value="eu">Europe</option>
                                                <option value="kr">Korea</option>
                                                <option value="tw">Taiwan</option>
                                                <option value="us">United States</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='csgo row'>
                                    <div className="col s4">
                                        <p id='csgo-name'>
                                            <img id='csgo-logo' src='assets/csgo.png'/>
                                            Counter Strike: Global Offensive
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="csgo_username" type="text" className="fields validate"/>
                                            <label htmlFor="csgo_username">Steam Profile URL (ex. http://steamcommunity.com/id/:steamID)</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='wow row'>
                                    <div className="col s4">
                                        <p id='wow-name'>
                                            <img id='wow-logo' src='assets/wow.png'/>
                                            World of Warcraft
                                        </p>
                                    </div>
                                    <div className="col s8">
                                        <div className="input-field">
                                            <input id="wow_charactername" type="text" className="fields validate"/>
                                            <label htmlFor="wow_charactername">Character name</label>
                                        </div>
                                    </div>
                                    <div className="col s4 offset-s4">
                                        <div className="input-field">
                                            <select id="wow_region" className="browser-default fields validate">
                                                <option value="">Region</option>
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
                            <br/>
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
            get_cookie: function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }

                return "";
            },
            componentDidMount: function () {
                var hitbox_username = this.get_cookie('hitbox'),
                    data = {};
                
                /*---Hitbox Auth---*/
                if (hitbox_username) {
                    $('#fields').show();
                    $('.hitbox-connect2').hide();
                    $('#hitbox-input').show();
                    $('#hitbox').val(hitbox_username);
                }

                $('.hitbox-connect2').bind('click', function() {
                    $('#fields').hide();
                    $('#hitbox_login').show();
                });

                $('.hitbox-unlink').bind('click', function () {
                    document.cookie = "hitbox=;expires=Wed 01 Jan 1970";
                    location.reload();
                });
                /*---Hitbox Auth End---*/
                /*---DailyMotion Auth---*/
                DM.init({
                    apiKey: htbt.config.dailymotion_gamestats_api_key,
                    status: true,
                    cookie: true
                });

                DM.getLoginStatus(function (response) {
                    if (response.session) {
                        $('#fields').show();
                        $('.dailymotion-connect').hide();
                        $('#dailymotion-input').show();
                        DM.api('/me', function (user) {
                            user.screenname = user.screenname.toLowerCase().replace(/\s/g,'');
                            $('#dailymotion').val(user.screenname);
                        });
                    }
                    else {
                        $('.dailymotion-connect').bind('click', function () {
                            DM.login(function (response) {
                                if (response.session) {
                                    $('#fields').show();
                                    $('.dailymotion-connect').hide();
                                    $('#dailymotion-input').show();
                                    DM.api('/me', function (user) {
                                        user.screenname = user.screenname.toLowerCase().replace(/\s/g,'');
                                        $('#dailymotion').val(user.screenname);
                                    });
                                }
                            }, {scope: 'read'});
                        });
                    }
                });
                $('.dailymotion-unlink').bind('click', function () {
                    DM.logout(function (response) {
                        location.reload();
                    });
                });
                /*---DailyMotion Auth End---*/
                /*---Twitch Auth---*/
                Twitch.init({clientId: htbt.config.twitch_gamestats_client_id}, function(error, status) {
                    $('.twitch-connect').click(function () {
                        Twitch.login({
                            scope: ['user_read', 'channel_read']
                        });
                    });
                    if (status.authenticated) {
                        $('#fields').show();
                        $('.twitch-connect').hide();
                        $('#twitch-input').show();
                        Twitch.api({method:'user'}, function (error, user) {
                            $('#twitch').val(user.name);
                        });
                    }
                });
                $('.twitch-unlink').bind('click', function () {
                    Twitch.logout(function(error) {
                        location.reload();
                    });
                });
                /*---Twitch Auth End---*/

                $("#submit_usernames").bind('click', function () {
                    var ctr = 0;

                    function validate_fields () {
                        if ($('#dota2_username').val() && !$('#dota2_username').val().match(/^[0-9]{9}$/)) {
                            Materialize.toast('Invalid Dota ID',1000);
                            return false;
                        }

                        if ($('#diablo3_battletag').val() && !$('#diablo3_battletag').val().match(/-[0-9]{4}$/)) {
                            Materialize.toast('Invalid Diablo 3 Battle Tag',1000);
                            return false;
                        }

                        if ($('#csgo_username').val() && !$('#csgo_username').val().match(/^http:\/\/steamcommunity.com\/id\//)) {
                            Materialize.toast('Invalid Steam Profile URL',1000);
                            return false;
                        }

                        return true;
                    }

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

                    if (ctr < 3 && validate_fields()) {

                        $('#loader').attr('style', 'display:');
                        $('#fields').attr('style', 'display:none');
                        $.ajax({
                            method: "PUT",
                            url:  htbt.config.backend + '/save_game_usernames',
                            dataType: 'json',
                            data: data
                        })
                        .done(function (result) {
                            if (result) {
                                $('#loader').attr('style', 'display:none');
                                $('#confirm').attr('style', 'display:');
                            }
                        })
                        .fail(function (result) {
                            $('#loader').attr('style', 'display:none');
                            $('#confirm').attr('style', 'display:');
                        });

                    }

                });
            }
        }),
    
        Loader = React.createClass({
            render: function () {
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
                                <p className="flow-text">Processing your information...</p>
                            </div>
                        </div>);
            }
        }),

        Confirm = React.createClass({
            render: function () {
                return (<div id="confirm-msg" className="center-align">
                            <p className="flow-text">
                                Thanks for waiting. Your stats are now indexed.<br/>
                                <small>Your viewers will now be able to see your stats when you stream. Start streaming now!</small>
                            </p>
                            <ul>
                                <li><a href="http://www.twitch.tv/">Twitch</a></li>
                                <li><a href="http://www.hitbox.tv/">Hitbox</a></li>
                                <li><a href="http://games.dailymotion.com/">Dailymotion</a></li>
                            </ul>
                            <p>Or see who's streaming <a href="/streamers.html">here</a></p>
                            <p><small>Note: Please include the name of the game in the title for dailymotion</small></p>
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

    React.render(<Hitbox_Login/>, document.getElementById('hitbox_login'));
    React.render(<Fields/>, document.getElementById('fields'));
    React.render(<Loader/>, document.getElementById('loader'));
    React.render(<Confirm/>, document.getElementById('confirm'));
    React.render(<Modal/>, document.getElementById('modal'));

})(window.React, window.htbt);
