'use strict';


var path = require('path');

module.exports = function(app){

    // ANALYTICS USAGE

    app.use('/api/user', require('./api/user'));
    app.use('/api/userSesion', require('./api/userSession'));

    app.use('/api/team', require('./api/team'));
    app.use('/api/player',require('./api/players'));

    app.use('/api/league',require('./api/league'))


    app.route('/*')
        .get(function(req, res) {
            // Commented path is for angular 6 build post production
            res.sendFile(path.resolve( __dirname + '/dist/App/index.html'));
            // res.sendFile(path.resolve( __dirname + '/index.html'));
        });

}
