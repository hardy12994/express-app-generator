'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var appRoot = require('app-root-path');

exports.configure = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.static(path.join(appRoot.path, 'public')));
    app.set('view engine', 'ejs');
    app.use(bodyParser({ limit: '50mb', keepExtensions: true }));
};