/** @jsx React.DOM **/
(function (htbt, Twitch, React) {
    'use strict';

    var GameDiablo3 = React.createClass({
        getData: function(){
            return  this.props.data || {
                'battleNet' : '',
                'tag': '',
                'region' : '',
                'heroId': ''
            };
        },
        render: function(){
            var diablo = this.getData();

            return(
                <fieldset className='game_fieldbox'>
                    <legend>Diablo 3</legend>
                    <div className='pure-control-group'>
                    <label>Battle Net Name</label>
                    <input onChange={this.onCharName} type='text' value={diablo.battleNet} />

                    <label>Battle Net Tag</label>
                    <input onChange={this.onCharTag} type='text' value={diablo.tag} />

                    <label>Region</label>
                    <select onChange={this.onRegionChange} value={diablo.region}>
                        <option value="us">US</option>
                        <option value="eu">EU</option>
                        <option value="tw">TW</option>
                        <option value="kr">KR</option>
                        <option value="cn">CN</option>
                    </select>

                    <label>Default Hero Id</label>
                    <input onChange={this.onCharId} type='text' value={diablo.heroId}/>
                    </div>
                </fieldset>
            );
        },
        onCharName : function(e){
            var diablo = this.getData();

            diablo.battleNet = e.target.value;
            this.updateParent(diablo);
        },
        onCharTag : function(e){
            var diablo = this.getData();
            
            diablo.tag = e.target.value;
            this.updateParent(diablo);
        },
        onCharId : function(e){
            var diablo = this.getData();
            
            diablo.heroId = e.target.value;
            this.updateParent(diablo);
        },
        onRegionChange : function(e){
            var diablo = this.getData();
            
            diablo.region = e.target.value;
            this.updateParent(diablo);
        },
        updateParent : function(diablo){
            this.props.handleChange('diablo3' , diablo);
        }
    });

    var GameDota2 = React.createClass({
        getData: function(){
            return  this.props.data || {
                'steam' : ''
            };
        },
        render: function(){
            var dota = this.getData();

            return(
                <fieldset className='game_fieldbox'>
                    <legend>Dota 2</legend>
                    <div className='pure-control-group'>
                    <label>Steam Id</label>
                    <input onChange={this.onSteamIdChange} type='text' value={dota.steam}/>
                    </div>
                </fieldset>
            );
        },
        onSteamIdChange : function(e){
            var dota = this.getData();

            dota.steam = e.target.value;
            this.updateParent(dota);
        },
        updateParent : function(dota){
            this.props.handleChange('dota2' , dota);
        }
    })

    var GameLoL = React.createClass({
        getData: function(){
            return this.props.data || {
                'summoner_name' : '',
                'summoner_region': ''
            };
        },
        render: function() {
            var lol = this.getData();

            return(
                <fieldset className='game_fieldbox'>
                    <legend>League of Legends</legend>
                    <div className='pure-control-group'>
                        <label>Summoner</label>
                        <input onChange={this.onCharName} type='text' value={lol.summoner_name}/>

                        <label>Region</label>
                        <select onChange={this.onRegionChange} value={lol.summoner_region}>
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
                </fieldset>
            );
        },
        onCharName : function(e){
            var lol = this.getData();

            lol.summoner_name = e.target.value;
            this.updateParent(lol);
        },
        onRegionChange : function(e){
            var lol = this.getData();

            lol.summoner_region = e.target.value;
            this.updateParent(lol);
        },
        updateParent : function(lol){
            this.props.handleChange('league_of_legends' , lol);
        }
    });

    var GameForm = React.createClass({
        getInitialState: function(){
            return {
                'diablo3' : {},
                'dota2' : {},
                'league_of_legends' : {}
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
                <GameDiablo3 handleChange={this.handleChange} data={this.state.diablo3}/>
                <GameDota2 handleChange={this.handleChange} data={this.state.dota2}/>
                <GameLoL handleChange={this.handleChange} data={this.state.league_of_legends}/>
                <button className='pure-button pure-button-primary' onClick={this.save}>Submit</button>
            </form>
            );
        },

        onFieldChange : function(fName,value){
            this.setState(_.object([[fName,value]]));
        },

        componentDidMount: function () {
            $.ajax({
                url: htbt.config.backend + '/twitch/mapping',
                type: 'GET',
                data: {
                    token: Twitch.getToken()
                },
                success: function (data) {
                    this.props.twitchUsername = data.twitchUsername;

                    if (!data.accounts) {
                        return;
                    }

                    this.setState({
                        'dota2': data.accounts.dota2
                    });

                    this.setState({
                        'diablo3': data.accounts.diablo3
                    });

                    this.setState({
                        'league_of_legends': data.accounts.league_of_legends
                    });

                }.bind(this)
            });
        },

        save : function(e){
            e.preventDefault();
            $.ajax({
                url: htbt.config.backend + '/twitch/mapping',
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

