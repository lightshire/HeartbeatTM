(function (htbt) {
    'use strict';

    htbt.lfg = {
        View: React.createClass({
            render: function () {
                var e = this.props.data;
                e.favorite = e.favorite ? 'active' : '';
                e.twitch_id = e.twitch_id || '';
                e.hitbox_id = e.hitbox_id || '';
                e.common = e.common || 'N/A';

                return (
                    <div>
                        <ul className="collection">
                            <li className="collection-item avatar view-profile">
                                <img src={e.avatar} alt="" className="circle"/>
                                <span className="title"><b>{e.name}</b></span>
                                <p>
                                    <br/>
                                    <b>Email:</b> {e.email}
                                    <br/>
                                    <b>Looking for group:</b> {e.is_looking}
                                    <br/>
                                    <b>Interests:</b> {e.interests}
                                    <br/>
                                    <b>About me:</b> {e.about_me}
                                    <br/>
                                    <br/>
                                    <b>
                                        <a
                                            href={'https://www.youtube.com/channel/' + e.youtube_id}
                                            target="_blank"
                                            title="Youtube">
                                            <i className="fa fa-youtube"></i>
                                        </a>
                                    </b> &nbsp;&nbsp;&nbsp;{e.youtube_subs.toLocaleString()} Subscribers
                                    <br/>
                                    <b>
                                        <a
                                            href={'http://www.twitch.tv/' + e.twitch_id}
                                            target="_blank"
                                            title="Twitch">
                                            <i className="fa fa-twitch"></i>
                                        </a>
                                    </b> &nbsp;&nbsp;&nbsp;{e.twitch_subs.toLocaleString()} Subscribers
                                    <br/>
                                    <b>
                                        <a
                                            href={'http://www.hitbox.tv/' + e.hitbox_id}
                                            target="_blank"
                                            title="hitbox">
                                            <i className="fa fa-video-camera"></i>
                                        </a>
                                    </b> &nbsp;&nbsp;&nbsp;{e.hitbox_subs.toLocaleString()} Subscribers
                                    <br/>
                                    <br/>
                                    <b>Matchmaking Rating:</b> {e.mmr}
                                    <br/>
                                    <b>Common Interests:</b> {e.common}
                                </p>
                                <a title="Favorite" className="fave-btn secondary-content">
                                    <i id={e.youtube_id + '_fave'} className={e.favorite + ' favorite material-icons'}>grade</i>
                                </a>
                            </li>
                        </ul>
                        <a href="#!" className="view-all secondary-content">View all</a>
                    </div>
                );
            }
        }),

        Search: React.createClass({
            render: function () {
                return (
                    <form id="search-match" className="col s12">
                        <div className="row">
                            <div className="match-view-all col s2">&nbsp;</div>
                            <div className="input-field col s4 offset-s6">
                                <i className="material-icons prefix">search</i>
                                <input id="search" type="text" className="validate"/>
                                <label htmlFor="search">Search</label>

                                <div className="search-by-container">
                                    <input id="by-name" className="with-gap" name="search-by" type="radio" defaultChecked/>
                                    <label htmlFor="by-name" className="search-by">By name</label>
                                    <input id="by-interest" className="with-gap" name="search-by" type="radio"/>
                                    <label htmlFor="by-interest" className="search-by">By interest</label>
                                </div>
                            </div>
                        </div>
                    </form>
                );
            }
        }),

        Matchmaking: React.createClass({
            render: function () {
                var users = _(this.props.data.users)
                    .map(function (e) {
                        e.interests = e.interests.replace(/\,/g, ', ');
                        e.interests = e.interests.length > 100
                            ? e.interests.substring(0, 100) + ' ...'
                            : e.interests;
                        e.favorite = e.favorite ? 'active' : '';

                        return (
                            <li className="collection-item avatar">
                                <img src={e.avatar} alt="" className="circle" />
                                <span className="title"><b>{e.name}</b></span>
                                <p>
                                    <b>Looking for group:</b> {e.is_looking}
                                    <br/>
                                    <b>Interests:</b> {e.interests}
                                    <br/>
                                    <a href={'#profile?id=' + e.youtube_id} target="_blank">View Profile</a>
                                </p>
                                <a href="#!" className="secondary-content">
                                    <i id={e.youtube_id + '_fave'} className={e.favorite + ' favorite material-icons'}>grade</i>
                                </a>
                            </li>
                        );
                    })
                    .value();

                return (
                    <div className="row">
                        <ul className="collection">{users}</ul>

                        <center>
                            <p id="matchmaking-pagination"></p>
                        </center>
                    </div>
                );
            }
        }),


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
                        <h5>Profile Information</h5>
                        {!this.props.data.youtube_id ? first : ''}
                        <div className="row">
                            <div className="col s3 offset-s9">
                                <h6>Looking for group</h6>
                                <div className="switch">
                                    <label>
                                        No
                                        <input
                                            id="looking"
                                            type="checkbox"
                                            defaultChecked={this.props.data.is_looking === 'Yes' ? 'checked': ''}/>
                                        <span className="lever"></span>
                                        Yes
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s3">
                                <div className="card-panel grey lighten-1 white-text label-social">
                                    http://www.twitch.tv/
                                </div>
                            </div>
                            <div className="col s9">
                                <label htmlFor="twitch_id">Twitch Username</label>
                                <input
                                    placeholder="Twitch username here ..."
                                    id="twitch_id"
                                    type="text"
                                    defaultValue={this.props.data.twitch_id}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s3">
                                <div className="card-panel grey lighten-1 white-text label-social">
                                    http://www.hitbox.tv/
                                </div>
                            </div>
                            <div className="col s9">
                                <label htmlFor="hitbox_id">Hitbox Username</label>
                                <input
                                    placeholder="Hitbox username here ..."
                                    id="hitbox_id"
                                    type="text"
                                    defaultValue={this.props.data.hitbox_id}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea
                                    id="about"
                                    className="materialize-textarea"
                                    defaultValue={this.props.data.about_me}
                                    placeholder="Description about you ... "></textarea>
                                <label id="about_label" htmlFor="about" className="active">About me</label>
                            </div>
                        </div>
                        <h5 id="interests-title">Interests</h5>
                        <div className="row">
                            <div className="col s12">
                                <ul className="tabs">
                                    {categories}
                                </ul>
                            </div>
                            {sub_categories}
                        </div>
                        <br/><br/>
                        <div className="row">
                            <div className="col s4 offset-s4">
                                <a id="save-profile" className="blue waves-effect waves-light btn">Save Profile</a>
                            </div>
                        </div>
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
