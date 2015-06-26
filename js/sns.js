/** @jsx React.DOM **/
(function (React, htbt) {
    'use strict';

    var GetNotifications = React.createClass({
        render: function() {
            return (<div>
                        <div className="title">
                                <p><b>Register your usernames here to get notified when your favorite streamers are online!</b>
                                <br/><small>We'll index all your favorite streamers and notify you when they go live, wherever, whenever! (As long as you're on Chrome)</small></p>
                            </div><br/>
                            <div id='platforms-inner' className='platforms-inner'>
                                <div id='twitch'>
                                    <div className="input-field">
                                        <input id="twitch_username" type="text" className="fields validate" />
                                        <label htmlFor="twitch_username">Twitch Username</label>
                                    </div>
                                </div>
                                <div id='hitbox'>
                                    <div className="input-field">
                                        <input id="hitbox_username" type="text" className="fields validate" />
                                        <label htmlFor="hitbox_username">Hitbox Username</label>
                                    </div>
                                </div>
                                <div id='dailymotion'>
                                    <div className="input-field">
                                        <input id="dailymotion_username" type="text" className="fields validate" />
                                        <label htmlFor="dailymotion_username">DailyMotion Username</label>
                                    </div>
                                </div>
                                <div>
                                    <div className='right-align'>
                                        <button id='submit_usernames' className='waves-effect waves-light btn'>Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div id="footer">
                                <small>
                                    <a href="https://chrome.google.com/webstore/detail/heartbeat/aailiojlhjbichheofhdpcongebcgcgm?hl=en">Heartbeat</a>
                                     | 
                                    <a href="https://www.freedom.tm/">Freedom!</a> &copy; 2015</small>
                            </div>
                        </div>);
        },
        componentDidMount: function() {
            $("#submit_usernames").bind('click', function() {
                var ctr = 0;
                $.each($('.fields'), function(i, a) {
                    if (!a.value) {
                        a.className = 'fields validate invalid';
                        ctr++;
                    }
                });
                $("#submit_usernames").bind('mouseleave', function() {
                    $.each($('.fields'), function(i, a) {
                        a.className = 'fields validate';
                    });
                });

                if (ctr > 0) {
                    ctr = 0;
                } else {
                    $('#platforms').attr('style', 'display:none');
                    $('#loader').attr('style', 'display:');
                    $.ajax({
                        type: "POST",
                        url: 'http://localhost/save_usernames',
                        data: {
                            un: $('#twitch_username').val() + ', ' +
                                $('#hitbox_username').val() + ', ' +
                                $('#dailymotion_username').val(),
                            pf: 'twitch, hitbox, dailymotion'

                        }
                    })
                    .done(function() {
                        $.ajax({
                            type: "POST",
                            url: 'http://localhost/save_streamers'
                        })
                        .done(function (results){
                            $('#loader').attr('style', 'display:none');
                            $('#confirm').attr('style', 'display:');
                        })
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
                              </div><div className="gap-patch">
                                <div className="circle"></div>
                              </div><div className="circle-clipper right">
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
                            Thanks for waiting. Your favorite streamers are now indexed.<br/>
                            <small>You are now able to get updates on your favorite streamers whenever they are online when you have Heartbeat running in the background.</small>
                        </p>
                        <button id='go_back' className='waves-effect waves-light btn'>Go back</button>
                    </div>);
        },
        componentDidMount: function () {
            $("#go_back").bind('click', function() {
                $.each($('.fields'), function(i, a) {
                    a.value = '';
                    a.className = 'fields validate';
                });
                $('#platforms').attr('style', 'display:');
                $('#confirm').attr('style', 'display:none');
            });
        }
    });
    
    React.render(<GetNotifications/>, document.getElementById('platforms'));
    React.render(<Loader/>, document.getElementById('loader'));
    React.render(<Confirm/>, document.getElementById('confirm'));

})(window.React, window.htbt);

