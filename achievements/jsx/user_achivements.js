(function (htbt) {
    'use strict';

    var heartbeat_access_token = htbt.util.get_cookie('heartbeat_access_token'),

    	action_details = {
    		add_a_good_comment: React.createClass({
		        render: function () {
		            return (
		            	<div>
		            		<div className='row'>
			            		<div className='col s2'>Comment</div>
			            		<div className='col s10'>{this.props.data.comment_text}</div>
			            	</div>
			            	<div className='row'>
			            		<div className='col s2'>Video</div>
			            		<div className='col s10'>
			            			<a href={'https://www.youtube.com/watch?v=' + 
			            				this.props.data.video_id}>{this.props.data.video_id}
		            				</a>
			            		</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

	    	fully_watch_a_video: React.createClass({
		        render: function () {
		            return (
		            	<div>
			            	<div className='row'>
			            		<div className='col s2'>Video</div>
			            		<div className='col s10'>
			            			<a href={'https://www.youtube.com/watch?v=' + 
			            				this.props.data.video_id}>{this.props.data.video_id}
		            				</a>
			            		</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

	    	discover_new_feature: React.createClass({
		        render: function () {
		            return (
		            	<div>
			            	<div className='row'>
			            		<div className='col s2'>Feature</div>
			            		<div className='col s10'>{this.props.data.feature_name}</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

	    	listen_music_player: React.createClass({
		        render: function () {
		            return (
		            	<div>
		            		<div className='row'>
			            		<div className='col s2'>From</div>
			            		<div className='col s10'>
			            			{moment(this.props.data.from_time).format('DD MMM YYYY HH:mm')}
		            			</div>
			            	</div>
			            	<div className='row'>
			            		<div className='col s2'>To</div>
			            		<div className='col s10'>
			            			{moment(this.props.data.to_time).format('DD MMM YYYY HH:mm')}
		            			</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

    		tag_video: React.createClass({
		        render: function () {
		            return (
		            	<div>
		            		<div className='row'>
			            		<div className='col s2'>Tag</div>
			            		<div className='col s10'>{this.props.data.tag_name}</div>
			            	</div>
			            	<div className='row'>
			            		<div className='col s2'>Video</div>
			            		<div className='col s10'>
			            			<a href={'https://www.youtube.com/watch?v=' + 
			            				this.props.data.video_id}>{this.props.data.video_id}
		            				</a>
			            		</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

	    	untag_video: React.createClass({
		        render: function () {
		            return (
		            	<div>
		            		<div className='row'>
			            		<div className='col s2'>Tag</div>
			            		<div className='col s10'>{this.props.data.tag_name}</div>
			            	</div>
			            	<div className='row'>
			            		<div className='col s2'>Video</div>
			            		<div className='col s10'>
			            			<a href={'https://www.youtube.com/watch?v=' + 
			            				this.props.data.video_id}>{this.props.data.video_id}
		            				</a>
			            		</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

	    	discover_new_channel: React.createClass({
		        render: function () {
		        	var link = '',
		    			website = (this.props.data.website || '')
		    				.replace('www.', '')
		    				.replace('https://', '')
		    				.replace('http://', '')
		    				.toLowerCase();

		    		switch (this.props.data.website) {
		    			case 'hitbox.tv':
		    				link = 'http://www.hitbox.tv/' + this.props.data.username;
		    				break;
		    			case 'youtube.com':
		    				link = 'https://www.youtube.com/channel/' + this.props.data.channel_id;
		    				break;
		    			case 'twitch.tv':
		    				link = 'http://www.twitch.tv/' + this.props.data.channel_id;
		    				break;
		    		}

		    		if (!~link.indexOf('http')){
		    			link = 'http://' + link;
		    		}
	    		
		            return (
		            	<div>
		            		<div className='row'>
			            		<div className='col s2'>Channel</div>
			            		<div className='col s10'>
			            			<a href={link}>{this.props.data.channel_id}</a>
			            		</div>
			            	</div>
			            	<div className='row'>
			            		<div className='col s2'>Platform</div>
			            		<div className='col s10'>
			            			<a href={this.props.data.website}>{this.props.data.website}</a>
			            		</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

	    	subscribe_a_channel: React.createClass({
		        render: function () {
		            return (
		            	<div>
		            		<div className='row'>
			            		<div className='col s2'>Channel</div>
			            		<div className='col s10'>
			            			<a href={'https://www.youtube.com/channel/' + 
			            				this.props.data.channel_id}>{this.props.data.channel_id}
	            					</a>
			            		</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

	    	unsubscribe_a_channel: React.createClass({
		        render: function () {
		            return (
		            	<div>
		            		<div className='row'>
			            		<div className='col s2'>Channel</div>
			            		<div className='col s10'>
			            			<a href={'https://www.youtube.com/channel/' + 
			            				this.props.data.channel_id}>{this.props.data.channel_id}
	            					</a>
			            		</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

	    	copy_annotations: React.createClass({
		        render: function () {
		        	var video_ids = this.props.data.video_ids;

		        	if (typeof(video_ids) === 'string') {
		        		video_ids = video_ids.split(',');
		        	}

		            return (
		            	<div>
		            		<div className='row'>
			            		<div className='col s2'>Source</div>
			            		<div className='col s10'>
			            			<a href={'https://www.youtube.com/watch?v=' + 
			            				this.props.data.src_video_id}>{this.props.data.src_video_id}
		            				</a>
			            		</div>
			            	</div>
			            	<div className='row'>
			            		<div className='col s2'>Videos</div>
			            		<div className='col s10'>
			            			{
			            				_(video_ids)
				            				.map(function (video_id) {
				            					return <a className='inline_video' 
				            								href={'https://www.youtube.com/watch?v=' + video_id}>
				            								{video_id}
			            								</a>;
				            				})
				            				.value()
			            			}
			            		</div>
			            	</div>
		            	</div>
		            );
		        }
	    	}),

	    	use_videobar: React.createClass({
		        render: function () {
		        	var video_ids = this.props.data.video_ids;

		        	if (typeof(video_ids) === 'string') {
		        		video_ids = video_ids.split(',');
		        	}

		            return (
		            	<div>
			            	<div className='row'>
			            		<div className='col s2'>Videos</div>
			            		<div className='col s10'>
			            			{
			            				_(video_ids)
				            				.map(function (video_id) {
				            					return <a className='inline_video' 
				            								href={'https://www.youtube.com/watch?v=' + video_id}>
				            								{video_id}
			            								</a>;
				            				})
				            				.value()
			            			}
			            		</div>
			            	</div>
		            	</div>
		            );
		        }
	    	})
    	},

    	Action_Details = React.createClass({
    		on_card_click: function (event) {
	        	event.stopPropagation();
	        },

	        render: function () {
	        	var elem = action_details[this.props.action.action_name];

	        	if (elem) {
	        		elem = React.createElement(elem, { data: this.props.data });
	        	}

	        	return (
	        		React.createElement('div', {
	        				className: 'action_details card hide',
	        				onClick: this.on_card_click
	        			}, 
	        			React.createElement('div', {className: 'card-content'}, 
	        				elem || 'No information to display'
        				)
	        		)
	        	);
	        }
    	}),

    	Login_Section = React.createClass({
	        render: function () {
	            return (
	            	<div className="row center">
	            		<br/>
	            		<br/>
		                <a
		                	id='login'
		                    href={htbt.config.login_url + '?service=heartbeat'
		                        + '&response_type=code&roles=profile,email,partner'
		                        + '&redirect_uri=' + encodeURIComponent(location.origin + '/login_callback.html')
		                        + '&state=' + encodeURIComponent(location.href.split('#')[0])}
		                    className='waves-effect waves-light red darken-2 btn-large'>
		                    <i className='mdi-social-person left'></i>
		                    Login
		                </a>
		             </div>
	            );
	        }
    	}),

    	User_Points = React.createClass({
			getInitialState: function() {
				return {
					email: '',
					first_name: '',
					last_name: '',
					earned_points: '',
					last_updated: ''
				};
			},

			componentDidMount: function() {
				var that = this;

				// load user points
				$('#loading').show();
				$.get(
						htbt.config.backend + '/reward/user_points', 
						{access_token: heartbeat_access_token}
					)
					.done(function (data) {
						that.setState({
				          	email: data.email,
				          	first_name: data.first_name,
				          	last_name: data.last_name,
				          	earned_points: data.earned_points,
				          	last_updated: moment(data.last_updated).format('DD MMM YYYY HH:mm')
				        });
					})
					.always(function () {
						$('#loading').hide();
					});
			},

    		render: function () {
	            return (
	            	<div id='profile_header'>
        				<h5 className='grey-text text-darken-1'>
        					{this.state.first_name} {this.state.last_name}
        					<a id='log_out' onClick={this.on_log_out}>(Log out)</a>
    					</h5>
    					<div id='profile_details'>
    						<div className='profile_row row'>
    							<div className='col s1 valign-wrapper'>
    								<i className='valign material-icons'>email</i>
    							</div>
    							<div className='col s6 valign-wrapper'>
    								<div className='valign'>
    									<a href='mailto:{this.state.email}'>{this.state.email}</a>
    								</div>
    							</div>
    						</div>
    						<div className='profile_row row'>
    							<div className='col s1 valign-wrapper'>
    								<i className='valign material-icons'>grade</i>
    							</div>
    							<div className='col s6 valign-wrapper'>
    								<div className='valign'>{this.state.earned_points} points</div>
    							</div>
    						</div>
    						<div className='profile_row row'>
    							<div className='col s1 valign-wrapper'>
    								<i className='valign material-icons'>today</i>
    							</div>
    							<div className='col s6 valign-wrapper'>
    								<div className='valign'>Last update on {this.state.last_updated}</div>
    							</div>
    						</div>
    					</div>
        			</div>
	            );
	        },

	        on_log_out: function () {
				document.cookie = 'heartbeat_access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
				location.reload();
			}
    	}),

		User_Rewarded_Actions = React.createClass({
			min_page: 1,
			max_page: 1,
			page_size: 10,

			getInitialState: function() {
				return {
					rewarded_actions: [],
					current_page: 0,
					total_pages: 0
				};
			},

			componentDidMount: function() {
				this.load_user_rewarded_actions(0);
			},

			on_prev_page: function () {
				var current_page = this.state.current_page > 1
						? this.state.current_page - 1
						: 0;

				if (current_page ===  this.state.current_page) {
					return;
				}

				this.setState({
					current_page: current_page
				});

				this.load_user_rewarded_actions(current_page);
			},

			on_next_page: function () {
				var current_page = this.state.current_page < this.state.total_pages - 1
						? this.state.current_page + 1
						: this.state.total_pages - 1;

				if (current_page ===  this.state.current_page) {
					return;
				}

				this.setState({
					current_page: current_page
				});

				this.load_user_rewarded_actions(current_page);
			},

			on_goto_page: function (event) {
				var a = event.currentTarget,
					current_page = parseInt(a.innerText) - 1;

				if (current_page === this.state.current_page) {
					return;
				}

				this.setState({
					current_page: current_page
				});

				this.load_user_rewarded_actions(current_page);
			},

    		render: function () {
    			var that = this,
    				step = 5,
    				current_page = this.state.current_page + 1,
    				pages = [];

    			if (current_page === this.min_page ||
    				current_page === this.max_page) {
    				this.min_page = Math.max(current_page - step, 1);
    				this.max_page = Math.min(current_page + step, this.state.total_pages);
    			}

    			for(var i = this.min_page; i <= this.max_page; i++) {
    				pages.push(i);
		    	}

	            return (
	            	<div id='rewarded_actions'>
	            		<table className='striped'>
	            			<thead>
	            				<tr>
					          		<th>Action</th>
					          		<th>Rewarded Points</th>
					          		<th>Date</th>
				          		</tr>
	            			</thead>
	            			<tbody>
		            			{
		            				_(this.state.rewarded_actions)
			            				.map(function (action) {
								          	return <tr key={action._id}>
								          		<td>
								          			<div className='action_title'>
								          				<a onClick={that.on_show_action_details}>
								          					{action.action_title}
							          					</a>
							          					<Action_Details action={action} data={action.data} />
								          			</div>
								          		</td>
								          		<td>{action.rewarded_points}</td>
								          		<td>{action.timestamp}</td>
							          		</tr>;
							        	})
						        		.value()
					        	}
					        </tbody>
	            		</table>
	            		<div className='center-align'>
	            			<ul id='data_pager' className='pagination'>
							    <li onClick={this.on_prev_page} className={this.state.current_page ? 'waves-effect' : 'disabled'}>
							    	<a><i className='material-icons'>chevron_left</i></a>
						    	</li>
							    {
							    	_(pages)
							    		.map(function (page) {
							    			var class_name = that.state.current_page === (page-1) ? 'active' : 'waves-effect';
							    			return <li onClick={that.on_goto_page} className={class_name}><a>{page}</a></li>;
							    		})
							    		.value()
							    }
							    <li onClick={this.on_next_page} 
							    	className={this.state.current_page + 1 < this.state.total_pages ? 'waves-effect' : 'disabled'}>
							    	<a><i className='material-icons'>chevron_right</i></a>
						    	</li>
						  	</ul>
	            		</div>
        			</div>
	            );
	        },

	        on_show_action_details: function (event) {
	        	var a = event.currentTarget,
	        		$div = $(a).next();

	        	event.stopPropagation();
    			event.nativeEvent.stopImmediatePropagation();

    			$('.action_details').addClass('hide');
	        	$div.removeClass('hide');

	        	$(document).one('click', function () {
	        		$div.addClass('hide');
	        	});
	        },

	        load_user_rewarded_actions: function (current_page) {
	        	var that = this,
	        		skip = current_page * this.page_size,
	        		counter = this.loading || 0;

	        	this.loading = ++counter;

	        	$('#loading').show();
	        	$.get(
						htbt.config.backend + '/reward/rewarded_actions', 
						{
							access_token: heartbeat_access_token,
							skip: skip,
							limit: this.page_size
						}
					)
					.done(function (result) {
						var total_pages = 0;

						if (counter !== that.loading) {
							return;
						}

						_(result.items)
							.forEach(function (item) {
								item.timestamp = moment(item.timestamp).format('DD MMM YYYY HH:mm');
							})
							.commit();

						total_pages = Math.floor(result.total / that.page_size) +
							(result.total % that.page_size ? 1 : 0);

						that.setState({
				          	rewarded_actions: result.items,
				          	total_pages: total_pages
				        });
					})
					.always(function () {
						$('#loading').hide();
					});
	        }
		}),

		User_Achivements = React.createClass({
			render: function () {
				return (
					<div>
						<User_Points />
						<User_Rewarded_Actions />
					</div>
				);
			}
		});

    function start () {
    	if (!heartbeat_access_token) {
    		React.render(
		        <Login_Section />,
		        $('#main_container')[0]
		    );
		    return;
    	}

    	$.ajaxSetup({
		    cache: false
		});

    	React.render(
	        <User_Achivements />,
	        $('#main_container')[0]
	    );
    }

    start();
})(window.htbt = window.htbt || {});
