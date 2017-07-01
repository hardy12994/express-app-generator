'use strict';
module.exports = function(res) {
    return {
        success: function(message) {
            var val = {
                isSuccess: true,
                message: message
            };
            res.log.info(message || 'success', val);
            res.json(val);
        },
        failure: function(error, message) {
            var val = {
                isSuccess: false,
                message: message,
                error: error
            };
            res.log.error(message || 'failed', val);
            res.json(val);
        },
        data: function(item, message) {
            var val = {
                isSuccess: true,
                message: message,
                data: item
            };
            res.log.info(message || 'success', val);
            res.json(val);
        },
        page: function(items, total, pageNo, totalRecordsCount) {

            var val = {
                isSuccess: true,
                pageNo: pageNo || 1,
                items: items,
                pageSize: total || items.length,
                totalRecords: totalRecordsCount
            };

            res.log.info('page', val);
            res.json(val);
        }
    };
};