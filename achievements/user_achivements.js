(function (htbt) {
    'use strict';

    var heartbeat_access_token = htbt.util.get_cookie('heartbeat_access_token'),

    	action_details = {
    		add_a_good_comment: React.createClass({displayName: "add_a_good_comment",
		        render: function () {
		            return (
		            	React.createElement("div", null, 
		            		React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Comment"), 
			            		React.createElement("div", {className: "col s10"}, this.props.data.comment_text)
			            	), 
			            	React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Video"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
			            				this.props.data.video_id}, this.props.data.video_id
		            				)
			            		)
			            	)
		            	)
		            );
		        }
	    	}),

	    	fully_watch_a_video: React.createClass({displayName: "fully_watch_a_video",
		        render: function () {
		            return (
		            	React.createElement("div", null, 
			            	React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Video"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
			            				this.props.data.video_id}, this.props.data.video_id
		            				)
			            		)
			            	)
		            	)
		            );
		        }
	    	}),

	    	discover_new_feature: React.createClass({displayName: "discover_new_feature",
		        render: function () {
		            return (
		            	React.createElement("div", null, 
			            	React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Feature"), 
			            		React.createElement("div", {className: "col s10"}, this.props.data.feature_name)
			            	)
		            	)
		            );
		        }
	    	}),

	    	listen_music_player: React.createClass({displayName: "listen_music_player",
		        render: function () {
		            return (
		            	React.createElement("div", null, 
		            		React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "From"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			moment(this.props.data.from_time).format('DD MMM YYYY HH:mm')
		            			)
			            	), 
			            	React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "To"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			moment(this.props.data.to_time).format('DD MMM YYYY HH:mm')
		            			)
			            	)
		            	)
		            );
		        }
	    	}),

    		tag_video: React.createClass({displayName: "tag_video",
		        render: function () {
		            return (
		            	React.createElement("div", null, 
		            		React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Tag"), 
			            		React.createElement("div", {className: "col s10"}, this.props.data.tag_name)
			            	), 
			            	React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Video"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
			            				this.props.data.video_id}, this.props.data.video_id
		            				)
			            		)
			            	)
		            	)
		            );
		        }
	    	}),

	    	untag_video: React.createClass({displayName: "untag_video",
		        render: function () {
		            return (
		            	React.createElement("div", null, 
		            		React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Tag"), 
			            		React.createElement("div", {className: "col s10"}, this.props.data.tag_name)
			            	), 
			            	React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Video"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
			            				this.props.data.video_id}, this.props.data.video_id
		            				)
			            		)
			            	)
		            	)
		            );
		        }
	    	}),

	    	discover_new_channel: React.createClass({displayName: "discover_new_channel",
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
		            	React.createElement("div", null, 
		            		React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Channel"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			React.createElement("a", {href: link}, this.props.data.channel_id)
			            		)
			            	), 
			            	React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Platform"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			React.createElement("a", {href: this.props.data.website}, this.props.data.website)
			            		)
			            	)
		            	)
		            );
		        }
	    	}),

	    	subscribe_a_channel: React.createClass({displayName: "subscribe_a_channel",
		        render: function () {
		            return (
		            	React.createElement("div", null, 
		            		React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Channel"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			React.createElement("a", {href: 'https://www.youtube.com/channel/' + 
			            				this.props.data.channel_id}, this.props.data.channel_id
	            					)
			            		)
			            	)
		            	)
		            );
		        }
	    	}),

	    	unsubscribe_a_channel: React.createClass({displayName: "unsubscribe_a_channel",
		        render: function () {
		            return (
		            	React.createElement("div", null, 
		            		React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Channel"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			React.createElement("a", {href: 'https://www.youtube.com/channel/' + 
			            				this.props.data.channel_id}, this.props.data.channel_id
	            					)
			            		)
			            	)
		            	)
		            );
		        }
	    	}),

	    	copy_annotations: React.createClass({displayName: "copy_annotations",
		        render: function () {
		        	var video_ids = this.props.data.video_ids;

		        	if (typeof(video_ids) === 'string') {
		        		video_ids = video_ids.split(',');
		        	}

		            return (
		            	React.createElement("div", null, 
		            		React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Source"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			React.createElement("a", {href: 'https://www.youtube.com/watch?v=' + 
			            				this.props.data.src_video_id}, this.props.data.src_video_id
		            				)
			            		)
			            	), 
			            	React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Videos"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			
			            				_(video_ids)
				            				.map(function (video_id) {
				            					return React.createElement("a", {className: "inline_video", 
				            								href: 'https://www.youtube.com/watch?v=' + video_id}, 
				            								video_id
			            								);
				            				})
				            				.value()
			            			
			            		)
			            	)
		            	)
		            );
		        }
	    	}),

	    	use_videobar: React.createClass({displayName: "use_videobar",
		        render: function () {
		        	var video_ids = this.props.data.video_ids;

		        	if (typeof(video_ids) === 'string') {
		        		video_ids = video_ids.split(',');
		        	}

		            return (
		            	React.createElement("div", null, 
			            	React.createElement("div", {className: "row"}, 
			            		React.createElement("div", {className: "col s2"}, "Videos"), 
			            		React.createElement("div", {className: "col s10"}, 
			            			
			            				_(video_ids)
				            				.map(function (video_id) {
				            					return React.createElement("a", {className: "inline_video", 
				            								href: 'https://www.youtube.com/watch?v=' + video_id}, 
				            								video_id
			            								);
				            				})
				            				.value()
			            			
			            		)
			            	)
		            	)
		            );
		        }
	    	})
    	},

    	Action_Details = React.createClass({displayName: "Action_Details",
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

    	Login_Section = React.createClass({displayName: "Login_Section",
	        render: function () {
	            return (
	            	React.createElement("div", {className: "row center"}, 
	            		React.createElement("br", null), 
	            		React.createElement("br", null), 
		                React.createElement("a", {
		                	id: "login", 
		                    href: htbt.config.login_url + '?service=heartbeat'
		                        + '&response_type=code&roles=profile,email,partner'
		                        + '&redirect_uri=' + encodeURIComponent(location.origin + '/login_callback.html')
		                        + '&state=' + encodeURIComponent(location.href.split('#')[0]), 
		                    className: "waves-effect waves-light red darken-2 btn-large"}, 
		                    React.createElement("i", {className: "mdi-social-person left"}), 
		                    "Login"
		                )
		             )
	            );
	        }
    	}),

    	User_Points = React.createClass({displayName: "User_Points",
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
				          	last_updated: data.last_updated ? moment(data.last_updated).format('DD MMM YYYY HH:mm') : 'never'
				        });
					})
					.always(function () {
						$('#loading').hide();
					});
			},

    		render: function () {
	            return (
	            	React.createElement("div", {id: "profile_header"}, 
        				React.createElement("h5", {className: "grey-text text-darken-1"}, 
        					this.state.first_name, " ", this.state.last_name, 
        					React.createElement("a", {id: "log_out", onClick: this.on_log_out}, "(Log out)")
    					), 
    					React.createElement("div", {id: "profile_details"}, 
    						React.createElement("div", {className: "profile_row row"}, 
    							React.createElement("div", {className: "col s1 valign-wrapper"}, 
    								React.createElement("i", {className: "valign material-icons"}, "email")
    							), 
    							React.createElement("div", {className: "col s6 valign-wrapper"}, 
    								React.createElement("div", {className: "valign"}, 
    									React.createElement("a", {href: 'mailto:' + this.state.email}, this.state.email)
    								)
    							)
    						), 
    						React.createElement("div", {className: "profile_row row"}, 
    							React.createElement("div", {className: "col s1 valign-wrapper"}, 
    								React.createElement("i", {className: "valign material-icons"}, "grade")
    							), 
    							React.createElement("div", {className: "col s6 valign-wrapper"}, 
    								React.createElement("div", {className: "valign"}, this.state.earned_points, " points")
    							)
    						), 
    						React.createElement("div", {className: "profile_row row"}, 
    							React.createElement("div", {className: "col s1 valign-wrapper"}, 
    								React.createElement("i", {className: "valign material-icons"}, "today")
    							), 
    							React.createElement("div", {className: "col s6 valign-wrapper"}, 
    								React.createElement("div", {className: "valign"}, "Last update on ", this.state.last_updated)
    							)
    						)
    					)
        			)
	            );
	        },

	        on_log_out: function () {
				document.cookie = 'heartbeat_access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
				location.reload();
			}
    	}),

		User_Rewarded_Actions = React.createClass({displayName: "User_Rewarded_Actions",
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

			change_page: function (page) {
				if (page ===  this.state.current_page) {
					return;
				}

				this.setState({
					current_page: page
				});

				this.load_user_rewarded_actions(page);
			},

			on_prev_page: function () {
				var current_page = this.state.current_page > 1
						? this.state.current_page - 1
						: 0;

				this.change_page(current_page);
			},

			on_next_page: function () {
				var current_page = this.state.current_page < this.state.total_pages - 1
						? this.state.current_page + 1
						: this.state.total_pages - 1;

				this.change_page(current_page);
			},

			on_goto_page: function (event) {
				var a = event.currentTarget,
					current_page = parseInt(a.innerText) - 1;

				this.change_page(current_page);
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
	            	React.createElement("div", {id: "rewarded_actions"}, 
	            		React.createElement("table", {className: "striped"}, 
	            			React.createElement("thead", null, 
	            				React.createElement("tr", null, 
					          		React.createElement("th", null, "Action"), 
					          		React.createElement("th", null, "Rewarded Points"), 
					          		React.createElement("th", null, "Date")
				          		)
	            			), 
	            			React.createElement("tbody", null, 
		            			
		            				_(this.state.rewarded_actions)
			            				.map(function (action) {
								          	return React.createElement("tr", {key: action._id}, 
								          		React.createElement("td", null, 
								          			React.createElement("div", {className: "action_title"}, 
								          				React.createElement("a", {onClick: that.on_show_action_details}, 
								          					action.action_title
							          					), 
							          					React.createElement(Action_Details, {action: action, data: action.data})
								          			)
								          		), 
								          		React.createElement("td", null, action.rewarded_points), 
								          		React.createElement("td", null, action.timestamp)
							          		);
							        	})
						        		.value()
					        	
					        )
	            		), 
	            		React.createElement("div", {className: "center-align"}, 
	            			React.createElement("ul", {id: "data_pager", className: "pagination"}, 
							    React.createElement("li", {onClick: this.on_prev_page, className: this.state.current_page ? 'waves-effect' : 'disabled'}, 
							    	React.createElement("a", null, React.createElement("i", {className: "material-icons"}, "chevron_left"))
						    	), 
							    
							    	_(pages)
							    		.map(function (page) {
							    			var class_name = that.state.current_page === (page-1) ? 'active' : 'waves-effect';
							    			return React.createElement("li", {onClick: that.on_goto_page, className: class_name}, React.createElement("a", null, page));
							    		})
							    		.value(), 
							    
							    React.createElement("li", {onClick: this.on_next_page, 
							    	className: this.state.current_page + 1 < this.state.total_pages ? 'waves-effect' : 'disabled'}, 
							    	React.createElement("a", null, React.createElement("i", {className: "material-icons"}, "chevron_right"))
						    	)
						  	)
	            		)
        			)
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

		User_Achivements = React.createClass({displayName: "User_Achivements",
			render: function () {
				return (
					React.createElement("div", null, 
						React.createElement(User_Points, null), 
						React.createElement(User_Rewarded_Actions, null)
					)
				);
			}
		});

    function start () {
    	if (!heartbeat_access_token) {
    		React.render(
		        React.createElement(Login_Section, null),
		        $('#main_container')[0]
		    );
		    return;
    	}

    	$.ajaxSetup({
		    cache: false
		});

    	React.render(
	        React.createElement(User_Achivements, null),
	        $('#main_container')[0]
	    );
    }

    start();
})(window.htbt = window.htbt || {});
