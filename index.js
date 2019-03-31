"use strict";
let appKit = require('./app/app-generator');

exports.generate = function(port, apiFullFolderPath, cb) {
    appKit.generator(port, apiFullFolderPath, (err, app) => {
        if (err) {
            return cb(err);
        }
        return cb(null, app);
    });
};

// exports.generate(3211, function(err, app) {
//     if (err) {
//         throw err;
//     }
//     // console.log(app);
// });