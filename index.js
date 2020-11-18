"use strict";
let appKit = require('./app/app-generator');

exports.generate = function(port, apiFullFolderPath, cb) {
    appKit.generator(port, apiFullFolderPath, (err, app, server) => {
        if (err) {
            return cb(err);
        }
        return cb(null, app, server);
    });
};

// exports.generate(3211, function(err, app) {
//     if (err) {
//         throw err;
//     }
//     // console.log(app);
// });