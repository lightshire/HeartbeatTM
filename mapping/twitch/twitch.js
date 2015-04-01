
    /** @jsx React.DOM **/
    (function (htbt, Twitch, React) {
    'use strict';

        var login = React.createClass({
            login: function () {
                Twitch.login({
                    scope: ['user_read', 'channel_read']
                });
            },
            render: function () {
                return (
                    <div className='login'>
                    <h1>Please login with Twitch</h1>
                    <img
                        href='#'
                        className='twitch-connect'
                        src='http://ttv-api.s3.amazonaws.com/assets/connect_dark.png'
                        onClick={this.login} />
                    </div>
                );
            }
        });

        var GameDota2 = React.createClass({
            render: function(){
                return (
                    <fieldset>
                    <legend>Dota 2</legend>
                    <div className='pure-control-group'>
                        <label> 
                            {this.props.steam}
                        </label>
                        <input onChange={this.props.handleChange} name='dota2' type='text' placeholder='Your 32 character Steam Id'/>
                    </div>
                    </fieldset>
                );
            }
        });

        var GameLol = React.createClass({
            render: function(){
                return(
                    <fieldset>
                    <legend>League of Legends</legend>
                    <div className='pure-control-group'>
                        <label>Summoner Name</label>
                        <input onChange={this.props.handleChange} type='text'/>
                        
                        <label>Region</label>
                        <select onChange={this.props.handleChange}>
                            <option value="NA">NA</option>
                            <option value="BR">BR</option>
                            <option value="EUNE">EUNE</option>
                            <option value="EUW">EUW</option>
                            <option value="KR">KR</option>
                            <option value="LAN">LAN</option>
                            <option value="LAS">LAS</option>
                            <option value="OCE">OCE</option>
                            <option value="RU">RU</option>
                            <option value="TR">TR</option>
                            <option value="PBE">PBE</option>
                        </select>
                    </div>
                    </fieldset>
                );
            }
        });
        
        var GameDiablo3 = React.createClass({
            render: function(){
                return(
                    <fieldset>
                    <legend>Diablo 3</legend>
                    <div className='pure-control-group'>
                        <label>Character Name</label>
                        <input onChange={this.props.handleChange} type='text'/>
                        
                        <label>Server</label>
                        <select onChange={this.props.handleChange}>
                            <option value="NA">NA</option>
                            <option value="BR">BR</option>
                            <option value="EUNE">EUNE</option>
                            <option value="EUW">EUW</option>
                            <option value="KR">KR</option>
                            <option value="LAN">LAN</option>
                            <option value="LAS">LAS</option>
                            <option value="OCE">OCE</option>
                            <option value="RU">RU</option>
                            <option value="TR">TR</option>
                            <option value="PBE">PBE</option>
                        </select>
                    </div>
                    </fieldset>
                );
            }
        });
        
        var form = React.createClass({
            getInitialState: function () {
                var accounts = [{
                    name:'dota2',
                    steam:''
                },{
                    name:'lol',
                    summName:'',
                    region:'NA'
                },{
                	name:'diablo3',
                	charName:'',
                	server:''
                }];

                return {
                    displayAccounts: accounts
                };
            },

            componentDidMount: function () {  
                $.ajax({
                    url: 'http://localhost:8001/twitch/mapping',
                    type: 'GET',
                    data: {
                        token: Twitch.getToken()
                    },
                    success: function (data) {
                    	this.props.twitchUsername = data.twitchUsername;
                        var filledAccounts =
                            this.state.displayAccounts.map(function (displayed) {
                                return _.extend(displayed, {
                                    value: _.find(data.accounts, function (
                                            retrieved) {
                                            return retrieved.name === displayed
                                                .name;
                                        })
                                        .value
                                });
                            });

                        this.setState({
                            displayAccounts: filledAccounts
                        });
                    }.bind(this)
                });
            },
            save: function (e) {
                e.preventDefault();

                $.ajax({
                    url: 'http://localhost:8001/twitch/mapping',
                    type: 'PUT',
                    data: {
                        accounts: this.state.displayAccounts,
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
            onChangedDota2 : function(e) {
                this.state.displayAccounts[0].steam = e.target.value;
            },
            onChangedLoL : function(e) {
                if(e.type === 'input')
                    this.state.displayAccounts[1].summName = e.target.value;
                else
                    this.state.displayAccounts[1].region = e.target.value;
            },
            onChangedDiablo3 : function(e) {
                if(e.type === 'input')
                    this.state.displayAccounts[2].charName = e.target.value;
                else
                    this.state.displayAccounts[2].server = e.target.value;
            },
            render: function () {
                return (
                    <form className='pure-form pure-form-aligned'>
                    <h1>{this.props.twitchUsername}</h1>
                    <GameDota2 handleChange={this.onChangedDota2} />
                    <GameLol handleChange={this.onChangedLoL} />
                    <GameDiablo3 handleChange={this.onChangedDiablo3} />
                    <button className='pure-button pure-button-primary' onClick={this.save} >Submit</button>
                    </form>

                );
            }
        });

        var container = React.createClass({
            getInitialState: function () {
                return {
                    isLoggedIn: false
                };
            },
            componentDidMount: function () {
                Twitch.init({
                    clientId: htbt.config.twitch_api_key
                }, function (error, status) {
                    if (this.isMounted()) {
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
                        React.createElement(form) : React.createElement(login)
                    )
                );
            }
        });

        React.render(React.createElement(container),
            document.getElementById('container'));

    })(window.htbt = window.htbt || {}, window.Twitch, window.React);