(function(htbt, Twitch, React) {
    'use strict';

    var login = React.createClass({
        login: function() {
            Twitch.login({
                scope: ['user_read', 'channel_read']
            });
        },
        render: function() {
            return (
                React.createElement('div', {
                        className: 'login'
                    },
                    React.createElement('h1', null, 'Please login with Twitch'),
                    React.createElement('img', {
                        src: 'http://ttv-api.s3.amazonaws.com/assets/' +
                            'connect_dark.png',
                        href: '#',
                        className: 'twitch-connect',
                        onClick: this.login
                    })
                )
            );
        }
    });

    var field = React.createClass({
        getInitialState: function() {
            return {
                value: ''
            };
        },
        handleInput: function(e) {
            this.setState({
                value: e.target.value
            });
        },
        render: function() {
            var value = this.state.value || this.props.value;

            return (
                React.createElement('div', {
                        className: 'pure-control-group'
                    },
                    React.createElement('label', {
                        'for': this.props.name
                    }, this.props.text),
                    React.createElement('input', {
                        type: 'text',
                        onChange: this.handleInput,
                        value: value
                    }))
            );
        }
    });

    var form = React.createClass({
        getInitialState: function() {
            var accounts = [{
                name: 'steam',
                text: 'Steam Id',
                placeholder: 'Your 32 character Steam Id'
            }];

            return {
                displayAccounts: accounts
            };
        },
        componentDidMount: function() {
            $.ajax({
                url: 'http://www.you1tube.dev/twitch/mapping',
                type: 'GET',
                data: {
                    token: Twitch.getToken()
                },
                success: function(data) {
                    var filledAccounts =
                        this.state.displayAccounts.map(function(displayed) {
                            return _.extend(displayed, {
                                value: _.find(data.accounts, function(retrieved) {
                                    return retrieved.name === displayed.name;
                                }).value
                            });
                        });

                    this.setState({
                        displayAccounts: filledAccounts
                    });
                }.bind(this)
            });
        },
        save: function(e) {
            e.preventDefault();

            var accounts = this.state.displayAccounts.map(function(acc) {
                return {
                    name: acc.name,
                    value: this.refs[acc.name].state.value
                };
            }.bind(this));

            $.ajax({
                url: 'http://www.you1tube.dev/twitch/mapping',
                type: 'PUT',
                data: {
                    accounts: accounts,
                    token: Twitch.getToken()
                },
                success: function () {
                    toastr.success('Changes saved!');
                },
                error: function() {
                    toastr.success('Something went wrong.');
                }
            });
        },
        render: function() {
            var fields = this.state.displayAccounts.map(function(acc) {
                return React.createElement(field, _.extend(acc, {
                    ref: acc.name
                }));
            });

            return (
                React.createElement('form', {
                        className: 'pure-form pure-form-aligned'
                    },
                    React.createElement('legend', null, 'Configure external accounts'),
                    React.createElement('fieldset', null, fields),
                    React.createElement('button', {
                        type: 'submit',
                        className: 'pure-button pure-button-primary',
                        onClick: this.save
                    }, 'Save'))
            );
        }
    });

    var container = React.createClass({
        getInitialState: function() {
            return {
                isLoggedIn: false
            };
        },
        componentDidMount: function() {
            Twitch.init({
                clientId: htbt.config.twitch_api_key
            }, function(error, status) {
                if (this.isMounted()) {
                    this.setState({
                        isLoggedIn: status.authenticated
                    });
                }
            }.bind(this));
        },
        render: function() {
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
