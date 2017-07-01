'use strict';
var apiRoutes = require('../helpers/apiRoutes');
var fs = require('fs');
var appRoot = require('app-root-path');
var loggerConfig = require(appRoot.path + '/default').logger


module.exports.configure = app => {
    app.get('/', (req, res) => {
        res.render('index', { title: '~ Node Express Genrator Working ~' });
    });

    var api = apiRoutes(app);
    return api;
};