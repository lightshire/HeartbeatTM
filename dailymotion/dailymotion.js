/** @jsx React.DOM **/
(function (htbt) {
    'use strict';

    var Loading = React.createClass({
        render : function(){
            return(
                <div>Loading...</div>
            )
        }
    });

    var Content = React.createClass({
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

        render : function(){
            return(
                <div id='wrapper'>
                    <Header />
                    <div id='wrap-content'>
                        <Sidebar />
                        <div id='content'>
                            <LOL handleChange={this.handleChange} />
                        </div>
                        <div id='clr'></div>
                    </div>
                </div>  
            )
        }
    });

    var Sidebar = React.createClass({
        render : function(){
            return(
                <div id='sidebar'>
                    <ul id='list-game-name'>
                        <li>Diablo 3</li>
                        <li>Dota 2</li>
                        <li className='active'>League of legends</li>
                    </ul>
                </div>
            )
        }
    });

    var Header = React.createClass({
        render : function(){
            return(
                <div id='header'>
                    <div id='header-content'><img src='../images/beating-heart-shadownew.png' /><p>heart<b>beat</b>-dailymotion</p></div>                    
                </div>
            )
        }
    });

    var LOL = React.createClass({

        getData: function(){
            return this.props.data || {
                'summoner_name' : '',
                'summoner_region': ''
            };
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
        },
    
        save : function (){
            var lol = this.getData();
            alert('data ' + lol.summoner_name + ' Region ' + lol.summoner_region + ' htbt.config.backend ' + htbt.config.backend);
        },

        render : function(){
            var lol = this.getData();

            return(
                <div className='frame'>
                    <div className='field'><label className='left-label'>Summoner: </label><input onChange={this.onCharName} type='text' value={lol.summoner_name} /></div>
                        <div className='field'><label className='left-label'>Region: </label>
                        <select>
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
                    <button className='submit-button' onClick={this.save} >Submit</button>
                </div>
            )
        }
    }); 

    React.render(React.createElement(Content),
        document.getElementById('container'));

})(window.htbt = window.htbt || {});

