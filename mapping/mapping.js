/** @jsx React.DOM **/
(function (htbt, Twitch, React) {
    'use strict';

    var Game_Box = React.createClass({
        render: function () {
            return (
            <li className='feature_box'>
                <a href={this.props.box.a}>
                    <h1>{this.props.box.gameName}</h1>
                    <img/>
                </a>
            </li>
        );}
    });

    var Game_Box_Container = React.createClass({
        render: function () {
            var rows = this.props.boxes.map(function(box){
                return <Game_Box key={box.gameName} box={box} />
            });
            return (
            <div className='feature_container'>
                <ul>
                {rows}
                </ul>
            </div>
            );
        }
    })

    var boxes = [{
        gameName: 'Twitch',
        a: 'twitch'
    }, {
        gameName: 'Youtube',
        a: 'youtube'
    }, {
        gameName: 'Hitbox',
        a: 'hitbox'
    }];
 
    React.render(<Game_Box_Container boxes={boxes} />,
        document.getElementById('container'));


})(window.htbt = window.htbt || {}, window.Twitch, window.React);