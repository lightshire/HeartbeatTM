(function (htbt) {
    'use strict';

    htbt.admin = {
        Profile: React.createClass({
            render: function () {
                var sub_categories = [],
                    self = this,

                    first = (
                        <div className="row">
                            <div className="col s12">
                                <div className="card-panel teal">
                                    <span className="white-text">
                                        First-time user? Please fill out the form below
                                        to start using LFG.
                                    </span>
                                </div>
                            </div>
                        </div>
                    ),

                    categories = _(this.props.data.categories)
                        .map(function (e) {
                            var sub,
                                interests,
                                low = e.category.toLowerCase();

                            if (self.props.data.interests) {
                                interests = self.props.data.interests.split(', ');
                            }

                            sub = _(e.sub_categories)
                                .map(function (k) {
                                    var checked = _.indexOf(interests, k.sub_category) > -1
                                        ? 'checked'
                                        : '';

                                    return (
                                        <p className="col s3">
                                            <input
                                                type="checkbox"
                                                className="filled-in interests"
                                                id={k.sub_id + '_check'}
                                                defaultChecked={checked}
                                                data={k.sub_category}/>
                                            <label htmlFor={k.sub_id + '_check'}>{k.sub_category}</label>
                                        </p>
                                    );
                                })
                                .value();

                            sub_categories.push(<div id={low} className="col s12 category-col">{sub}</div>);

                            return (
                                <li className="tab col s4">
                                    <a href={'#' + low}>{e.category}</a>
                                </li>
                            );
                        })
                        .value();

                return (
                    <div className="row">
                        <div className="row">
                            <div className="col s12">
                                <ul className="tabs">
                                    {categories}
                                </ul>
                            </div>
                            {sub_categories}
                        </div>
                        <br/><br/>
                    </div>
                );
            }
        }),

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
                        <br/>
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
