/** @jsx React.DOM **/
(function (htbt, Twitch, React) {
    'use strict';

    var GameDiablo3 = React.createClass({
    	getInitialState: function(){
    		return {
    			'charName' : '',
    			'region' : ''
    		}
    	},
    	render: function(){
    	return(
			<fieldset className='game_fieldbox'>
				<legend>Diablo 3</legend>
				<div className='pure-control-group'>
				<label>Character Name</label>
				<input onChange={this.onCharName} type='text'/>

				<label>Region</label>
				<select onChange={this.onRegionChange}>
					<option value="AMERICA">NA</option>
					<option value="BR">BR</option>
					<option value="ASIA">EUNE</option>
				</select>
				</div>
			</fieldset>
			);
    	},
    	onCharName : function(e){
    		this.setState({charName : e.target.value})
    		this.updateParent();
    	},
    	onRegionChange : function(e){
    		this.setState({region : e.target.value})
    		this.updateParent();
    	},
    	updateParent : function(){
    		this.props.handleChange('diablo3' , { 'charName' : this.state.charName, 'region' : this.state.region});
    	}
    })

    var	GameForm = React.createClass({
    	getInitialState: function(){
    		return {
    			'diablo3' : {},
    			'leagueoflegends' : {},
    			'dota2' : {}
    		}
    	},

    	handleChange: function(key,value){
    		var o = {};
    		o[key] = value;

    		this.setState(o);
    	},

    	render: function(){
    		return(
            <form className='pure-form pure-form-aligned'>
            	<h1 className='twitch_username'>{this.props.twitchUsername}</h1>
            	<GameDiablo3 handleChange={this.handleChange}/>
            	<button className='pure-button pure-button-primary' onClick={this.save}>Submit</button>
            </form>
            );
    	},

    	onFieldChange : function(fName,value){
    		this.setState(_.object([[fName,value]]));
    	},

		componentDidMount : function () {
			$.ajax({
                url: 'http://localhost:8001/twitch/mapping',
                type: 'GET',
                data: {
                    token: Twitch.getToken()
                },
                success: function (data) {
                	this.props.twitchUsername = data.twitchUsername;
                    this.setState({
                    	'diablo3' : data.accounts.diablo3
                    });
                }.bind(this)
            });	
		},

    	save : function(e){
    		e.preventDefault();
            $.ajax({
                url: 'http://localhost:8001/twitch/mapping',
                type: 'PUT',
                data: {
                    accounts: this.state,
                    token: Twitch.getToken()
                },
                success: function () {
                    toastr.success('Changes saved!');
                },
                error: function () {
                    toastr.success('Something went wrong.');
                }
            });
    	},
    });
	
	var Loading = React.createClass({
		render : function(){
			return(
				<div>Loading...</div>
			)
		}
	});

	var Container = React.createClass({
		getInitialState: function() {
			return{
				isLoggedIn : false
			}
		},
		componentDidMount: function () {
        	Twitch.init({
                clientId: htbt.config.twitch_api_key
            }, function (error, status) {
                if (this.isMounted()) {
                	if (!status.authenticated){
                		Twitch.login({
                    		scope: ['user_read', 'channel_read']
                		});
                	}

                    this.setState({
                        isLoggedIn: status.authenticated
                    });
                }
            }.bind(this));
        },
        render: function () {
            return (
                React.createElement('div', null,
                    this.state.isLoggedIn ?
                    React.createElement(GameForm) : React.createElement(Loading)
                )
            );
        }
	}); 

    React.render(React.createElement(Container),
        document.getElementById('container'));

})(window.htbt = window.htbt || {}, window.Twitch, window.React);

