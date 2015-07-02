(function (htbt) {
    'use strict';

    htbt.lfg = {
        Error: React.createClass({
            render: function () {
                return (
                    <div className="row">
                        <div className="col s12">
                            <div className="card-panel teal">
                                <div className="white-text">
                                    <div className="s12">
                                        {this.props.data}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }),

        Channel: React.createClass({
            render: function () {
                var e = this.props.data;
                return (
                    <div>
                        <img 
                            className="channel_pic responsive-img" 
                            src={e.snippet.thumbnails.high.url}
                            alt="http://www.freedom.tm/images/default-cp.png"/>
                        <p className="channel_name">{e.snippet.title}</p>
                    </div>
                );
            }
        }),

        Login: React.createClass({
            render: function () {
                return (
                    <a 
                        id="login"
                        href={'http://api.accounts.freedom.tm/auth?service=heartbeat'
                            + '&redirect_uri=' + htbt.config.backend + '/crm/callback'
                            + '&response_type=code'
                            + '&roles=profile,email,partner'
                            + '&state=' + window.location.href}
                        className="waves-effect waves-light btn pull-right">
                        <i className="mdi-social-person left"></i>
                        Login
                    </a>
                );
            }
        }),

        Logout: React.createClass({
            render: function () {
                return (
                    <a 
                        id="logout"
                        className="waves-effect waves-light btn pull-right">
                        <i className="mdi-social-person left"></i>
                        Logout
                    </a>
                );
            }
        }),

        Loader: React.createClass({
            render: function () {
                return (
                    <div className="center-align">
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
                    </div>
                );
            }
        })
    };

})(window.htbt = window.htbt || {});
