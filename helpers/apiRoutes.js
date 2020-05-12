'use strict';
var _ = require('underscore');
var responseHelper = require('./response');
var logger = require('../helpers/logger')();
var async = require('async');
var appRoot = require('app-root-path');
var join = require('path').join;

var responseDecoratorFn = function(req, res, next) {
    res.log = logger.start(req.method + ' ' + req.url);
    if (req.body) {
        res.log.debug(req.body);
    }
    var wrapper = responseHelper(res);
    res.failure = wrapper.failure;
    res.success = wrapper.success;
    res.page = wrapper.page;
    res.data = wrapper.data;
    next();
};


module.exports = function(app, apiFullFolderPath) {

    let apiRoot, picApiFrom, requiredModule;
    var tasks = [];

    let register = function(option, filters) {

        if (_.isEmpty(requiredModule)) {
            return;
        }

        tasks.push(responseDecoratorFn);

        if (typeof(option) === "string" && option.toUpperCase() === 'REST' ||
            typeof(option) === "string" && option.toUpperCase() === 'CRUD') {

            if (filters) {
                if (Array.isArray(filters)) {
                    filters.forEach(item => tasks.push(item));
                } else {
                    tasks.push(filters);
                }
            }

            (function() {
                let apiUrl = apiRoot + '/:id';

                if (requiredModule.get) {
                    tasks.push(requiredModule.get);
                    app.get(apiUrl, tasks);
                    tasks.pop();
                }
                if (requiredModule.search) {
                    tasks.push(requiredModule.search);
                    app.get(apiRoot, tasks);
                    tasks.pop();
                }
                if (requiredModule.update) {
                    tasks.push(requiredModule.update);
                    app.put(apiUrl, tasks);
                    tasks.pop();
                }
                if (requiredModule.create) {
                    tasks.push(requiredModule.create);
                    app.post(apiRoot, tasks);
                    tasks.pop();
                }
                if (requiredModule.delete) {
                    tasks.push(requiredModule.delete);
                    app.delete(apiUrl, tasks);
                    tasks.pop();
                }
                if (requiredModule.patch) {
                    tasks.push(requiredModule.patch);
                    app.patch(apiUrl, tasks);
                    tasks.pop();
                }

            })();
        }

        if (typeof(option) === "object" && !filters) { //come as array or object
            var options = [];

            if (option[0]) {
                options = option;
            } else {
                options.push(option);
            }

            options.forEach(function(item) {
                let filters = [];

                filters = item.filters ? item.filters : [];

                if (item.filter) {
                    filters.push(item.filter);
                }

                filters.forEach(item => tasks.push(item));

                tasks.push(requiredModule[item.method]);

                let apiUrl = item.url ? apiRoot + item.url : apiRoot;

                switch (item.action.toUpperCase()) {
                    case "GET":
                        app.get(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "POST":
                        app.post(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "PUT":
                        app.put(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "DELETE":
                        app.delete(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "PATCH":
                        app.patch(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    default:
                        app[item.action.toLocaleLowerCase()](apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;
                }

            });
        }
        tasks = [];
        return;

    };

    return {
        model: function(apiType) {

            if (apiType.charAt(apiType.length - 1) !== 's' &&
                apiType.substr(apiType.length - 2, apiType.length) !== 'es') {
                throw ('enter correct api');
            }

            picApiFrom = join(appRoot.path, apiFullFolderPath, apiType);
            apiRoot = '/api/' + apiType;
            requiredModule = require(`${picApiFrom}`);
            return { register: register };
        }
    };
};