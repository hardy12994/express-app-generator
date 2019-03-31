'use strict';
var apiRoutes = require('../helpers/apiRoutes');
var fs = require('fs');
var appRoot = require('app-root-path');
var loggerConfig = require('../default').logger;


module.exports.configure = (app, apiFullFolderPath) => {
    app.get('/', (req, res) => {
        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write('~ Node Express Genrator Working ~');
        res.end();
    });

    var api = apiRoutes(app, apiFullFolderPath);
    return api;
};