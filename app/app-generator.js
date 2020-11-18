"use strict";
var logger = require('../helpers/logger')('app'),
    appRouter = require('../routing/app-router'),
    express = require('express'),
    app = express();

require('../settings/express').configure(app);

exports.generator = (listenOn, apiFullFolderPath, cb) => {


    if (listenOn && !cb) {
        cb = listenOn;
    }
    var port = listenOn || process.env.PORT || 3000,
        server = app.listen(port, function() {
            logger.info('listening on ' + port);
            app.appRouter = appRouter.configure(app, apiFullFolderPath);
            cb(null, app, server);
        });
};