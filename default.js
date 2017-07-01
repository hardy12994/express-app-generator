"use strict";
exports.logger = {
    "file": {
        "filename": "logs/logs.json",
        "level": "silly",
        "handleExceptions": true,
        "json": true,
        "maxsize": 512000, //0.5
        "maxFiles": 5,
        "colorize": false
    },
    "console": {
        "level": "silly",
        "handleExceptions": true,
        "json": false,
        "colorize": true
    }
};