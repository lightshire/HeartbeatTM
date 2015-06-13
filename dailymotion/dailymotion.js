/** @jsx React.DOM **/
(function () {
    'use strict';

    var Loading = React.createClass({
        render : function(){
            return(
                <div>Loading...</div>
            )
        }
    });

    var Content = React.createClass({
        render : function(){
            return(
                <div id='wrapper'>
                    <div id='header'>
                        <div id='header-content'><img src='../images/beating-heart-shadownew.png' /><p>heart<b>beat</b>-dailymotion</p></div>                    
                    </div>
                    <div id='wrap-content'>
                        <div id='sidebar'>
                            <ul id='list-game-name'>
                                <li>Diablo 3</li>
                                <li>Dota 2</li>
                                <li>League of legends</li>
                            </ul>
                        </div>
                        <div id='content'>
                            <div className='field'><label className='left-label'>Summoner: </label><input type='text' /></div>
                            <div className='field'><label className='left-label'>Region: </label><input type='text' /></div>
                            <button className='submit-button' >Submit</button>
                        </div>
                        <div id='clr'></div>
                    </div>
                </div>
                
            )
        }
    });

    React.render(React.createElement(Content),
        document.getElementById('container'));

})();

