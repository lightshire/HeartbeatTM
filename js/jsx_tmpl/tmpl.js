(function (htbt) {
    'use strict';

    htbt.crm = {
        Commenter: React.createClass({
            render: function () {
                var commenters = _(this.props.data.commenters).map(function (e) {
                    var plus = e.author_plus 
                            ?   <a 
                                    href={e.author_plus} target="_blank" 
                                    className="pull-right red-text text-darken-3">
                                    <i className="fa fa-google-plus-square"></i>
                                </a>
                            :   '',

                        fb = e.author_fb 
                            ?   <a 
                                    href={'//www.facebook.com/' + e.author_fb} target="_blank" 
                                    className="pull-right indigo-text text-darken-3">
                                    <i className="fa fa-facebook-official"></i>
                                </a>
                            :   '',

                        twitter = e.author_twitter 
                            ?   <a 
                                    href={'//www.twitter.com/' + e.author_twitter} target="_blank" 
                                    className="pull-right blue-text text-lighten-1">
                                    <i className="fa fa-twitter-square"></i>
                                </a>
                            :   '',

                        comments = _(e.comments).map(function (k) {
                                return (
                                    <span><q dangerouslySetInnerHTML={{__html: k.comment}}></q><br/></span>
                                );
                            }).commit();

                    return (
                        <li>
                            <div className="collapsible-header">
                                <img 
                                    className="commenter_pic circle responsive-img" 
                                    src={e.author_img} />

                                <span className="commenter_name">{e.author_name}</span>
                                

                                <i className="small mdi-communication-messenger pull-right"></i>
                                <span className="comment_count pull-right" >{e.comment_count}</span>
                                
                                {plus}
                                {fb}
                                {twitter}
                            </div>

                            <div className="collapsible-body">
                                {e.comments 
                                    ?   <div className="col s12">
                                            <label className="active">Comments</label>
                                            <br/>
                                            {comments}
                                            <br/>
                                        </div>
                                    : ''
                                }
                                <div className="input-field col s12">
                                    <textarea 
                                        id={e.author_id + '_notes'}
                                        className={e.author_id + '_notes materialize-textarea notes'} 
                                        placeholder="Put notes here ..."
                                        defaultValue={e.notes}></textarea>
                                    
                                    <label 
                                        className="active" 
                                        htmlFor={e.author_id + '_notes'}>Notes</label>
                                    
                                    <a 
                                        id={e.author_id + '_save'} 
                                        className="waves-effect waves-light btn save pull-right">Save</a>
                                    
                                    <a 
                                        id={e.author_id + '_block'}
                                        title="Block" 
                                        className={e.status === 'Blocked'
                                            ? e.author_id + '_block block status active'
                                            : e.author_id + '_block block status'}>
                                        <i className="tiny mdi-content-block pull-right"></i>
                                    </a>
                                    
                                    <a 
                                        id={e.author_id + '_favorite'}
                                        title="Favorite" 
                                        className={e.status === 'Favorite'
                                            ? e.author_id + '_favorite favorite status active'
                                            : e.author_id + '_favorite favorite status'}>
                                        <i className="tiny mdi-action-favorite pull-right"></i>
                                    </a>
                                </div>
                            </div>
                        </li>
                    );
                }).commit(),

                all_commenters = this.props.data.search 
                    ?   <div>
                            <a id="all-commenters">All Commenters</a>
                        </div>
                    :   '',

                search_form = (
                    <form id="search_commenter">
                        <div className="row">
                            <div className="input-field col s8">{all_commenters}</div>
                            <div className="input-field col s4">
                                <i className="mdi-action-search prefix"></i>
                                
                                <input 
                                    id="icon_search" 
                                    className="validate" 
                                    type="text"
                                    defaultValue={this.props.data.search}/>
                                
                                <label 
                                    className={this.props.data.search ? 'active' : ''} 
                                    htmlFor="icon_search">Search</label>
                            </div>
                        </div>
                    </form>
                );

                return (
                    <div>
                        {search_form}
                        <ul className="collapsible" data-collapsible="accordion">
                            {commenters}
                        </ul>
                        <center>
                            <p id="commenters-pagination"></p>
                        </center>
                    </div>
                );
            }
        }),

        Videos: React.createClass({
            render: function () {
                var videos = _(this.props.data.items).map(function (e) {
                    return (
                        <div className="col s3">
                            <div className="card small blue-grey lighten-1">
                                <div id={e.id + '_video'} className="video card-image">
                                    <img src={e.thumbnail} />
                                </div>
                                <div className="card-content white-text center">
                                    <p>{e.title}</p>
                                </div>
                            </div>
                        </div>
                    );
                }).commit(),

                pagination = (
                    <ul className="vpg pagination center">
                        <li className={this.props.data.prevPageToken ? 'waves-effect prev' : 'disabled'}>
                            <a>
                                <i className="mdi-navigation-chevron-left"></i>
                            </a>
                        </li>
                        <li className={this.props.data.nextPageToken ? 'waves-effect next' : 'disabled'}>
                            <a>
                                <i className="mdi-navigation-chevron-right"></i>
                            </a>
                        </li>
                    </ul>
                );

                return (
                    <div className="row">
                        <div className="row">
                            {videos}
                        </div>

                        <div className="row">
                            <div className="input-field col s4"></div>
                            <div className="input-field col s4">{pagination}</div>
                            <div className="input-field col s4"></div>
                        </div>
                    </div>
                );
            }
        }),

        ActiveVideo: React.createClass({
            render: function () {
                var e = this.props.data;
                
                return (
                    <div className="row">
                        <br/>
                        <div className="col s4">
                            <img className="vid_pic" src={e.thumbnail} />
                        </div>
                        <div className="col s8">
                            <a 
                                id="back-to-videos" 
                                className="pull-right">Back to videos</a>
                            <p><b>{e.title}</b></p>
                            <p>
                                <i className="mdi-action-visibility"></i>
                                &nbsp;{e.statistics.viewCount} views
                            </p>
                            <p>
                                <i className="mdi-communication-comment"></i>
                                &nbsp;{e.statistics.commentCount} comments
                            </p>
                            <p>
                                {e.statistics.likeCount} <i className="mdi-action-thumb-up"></i>
                                &nbsp;&nbsp;
                                {e.statistics.dislikeCount} <i className="mdi-action-thumb-down"></i>
                            </p>
                            <a
                                id={e.id}
                                className="btn waves-effect waves-light sync pull-right deep-orange lighten-2">
                                <i className="material-icons left">play_for_work</i>
                                Update commenters
                            </a>

                        </div>
                    </div>
                );
            }
        }),

        Stats: React.createClass({
            render: function () {
                var commenters = _(this.props.data.top_commenters).map(function (e) {
                        return (
                            <div>
                                <a href={e.author_plus} target="_blank">
                                    <p>
                                        <img
                                            className="commenter_pic circle responsive-img" 
                                            src={e.author_img} />
                                        &nbsp;
                                        {e.author_name}
                                    </p>
                                </a>
                            </div>
                        );
                    }).commit(),

                    videos = _(this.props.data.top_commented_videos).map(function (e) {
                        return (
                            <div className="row">
                                <div className="col s3">
                                    <img
                                        className="top-vid"
                                        src={e.thumbnail} />
                                </div>
                                <div className="col s9">
                                    {e.title}
                                </div>
                            </div>
                        );
                    }).commit();


                return (
                    <div className="row">
                        <div className="col s6">
                            <h5>Top 10 Most Commenters</h5>
                            {commenters}
                            <br/>
                            <b>Total Comments: </b> {this.props.data.total_comments}
                            <br/>
                            <b>Average Comments per Video: </b> {this.props.data.avg_comments}
                        </div>
                        
                        <div className="col s6">
                            <h5>Top 10 Most Commented Videos</h5>
                            {videos}
                        </div>

                        <div className="col s9">
                            <h5>Comment Count Over Time</h5>
                        </div>

                        <div className="col s3">
                            <span className="timespan-label">Comment Timespan</span>
                            <select id="comment_timespan" defaultValue="7days">
                                <option value="7days">7 days</option>
                                <option value="30days">30 days</option>
                                <option value="6months">6 months</option>
                                <option value="1year">1 year</option>
                                <option value="lifetime">Lifetime</option>
                            </select>
                        </div>

                        <div id="stats_chart" className="col s12"></div>
                    </div>
                );
            }
        }),

        NoCommenters: React.createClass({
            render: function () {
                return (
                    <div className="row">
                        <div className="col s12">
                            <div className="card-panel teal">
                                <div className="white-text">
                                    <div className="s12">
                                        Data not found. 
                                        It is either your videos does not have comments. 
                                        Or We have not yet cached any comments
                                        from your videos. Do you want us to:
                                    </div>
                                    <br/>
                                    <div className="s12">
                                        <a 
                                            id="retrieve-all"
                                            className="red accent-2 waves-effect waves-light btn">
                                            Retrieve comments from all your videos.
                                        </a>
                                    </div>

                                    <div className="s12"><h5>OR</h5></div>

                                    <div className="s12">
                                        <a 
                                            id="retrieve-certain"
                                            href="#retrieve-modal"
                                            className="red accent-2 waves-effect waves-light btn">
                                            Retrieve comments from a certain number
                                            of your latest videos.
                                        </a>
                                    </div>
                                </div>
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
        }),

        Retrieving: React.createClass({
            render: function () {
                return (
                    <div className="row">
                        <div className="col s12">
                            <div className="card-panel teal">
                                <span className="white-text">
                                Please wait a moment while we are retrieving your comments.
                                This may take a few minutes.
                                </span>
                            </div>
                        </div>
                    </div>
                );
            }
        })
    };

})(window.htbt = window.htbt || {});
