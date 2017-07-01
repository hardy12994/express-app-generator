'use strict';

var winston = require('winston');
var logConfig = require('../default').logger;

var transports = [];

if (logConfig.file) {
    transports.push(new winston.transports.File(logConfig.file));
}

if (logConfig.console) {
    transports.push(new winston.transports.Console(logConfig.console));
}

if (logConfig.http) {
    transports.push(new winston.transports.Http(logConfig.http));
}

var defaultLogger = new winston.Logger({
    transports: transports,
    exitOnError: false
});

defaultLogger.stream = {
    write: function(message, encoding) {
        defaultLogger.info(message);
    }
};


module.exports = function(ctx) {

    var logger = new winston.Logger({
        transports: transports,
        exitOnError: false
    });

    var stringifiedCtx = function(param) {
        if (ctx) {
            return '[' + ctx + (param ? ':' + param : '') + '] ';
        } else if (param) {
            return '[' + param + '] ';
        } else {
            return '';
        }
    };

    var insertCtx = function(params, additional) {
        if (typeof params[0] === 'string') {
            params[0] = stringifiedCtx(additional) + params[0];
        } else if (typeof params[0] === 'object') {
            Array.prototype.unshift.call(params, stringifiedCtx(additional));
        }

        return params;
    };

    var decorator = function(param) {
        return {
            error: function() {
                logger.error.apply(this, insertCtx(arguments, param));
            },
            warn: function() {
                logger.warn.apply(this, insertCtx(arguments, param));
            },
            info: function() {
                logger.info.apply(this, insertCtx(arguments, param));
            },
            verbose: function() {
                logger.varbose.apply(this, insertCtx(arguments, param));
            },
            debug: function() {
                logger.debug.apply(this, insertCtx(arguments, param));
            },
            silly: function() {
                logger.silly.apply(this, insertCtx(arguments, param));
            }
        };
    };

    var decoratorObj = decorator();

    decoratorObj.start = function(param) {
        var wrapper = decorator(param);

        wrapper.debug('started');
        return wrapper;
    };


    return decoratorObj;
};