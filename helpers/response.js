'use strict';
module.exports = function(res) {
    return {
        success: function(message) {
            let val = {
                isSuccess: true,
                message: message
            };
            res.log.info(message || 'success', val);
            res.json(val);
        },
        failure: function(error) {
            let val = {
                isSuccess: false,
                error: (typeof error === 'string') ? error : { message: error.message, stack: error.stack },
            };
            res.log.error('failed', val);
            res.json(val);
        },
        data: function(item) {
            let val = {
                isSuccess: true,
                data: item
            };
            res.log.info('success', val);
            res.json(val);
        },
        page: function(items, total, pageNo, totalRecordsCount) {
            let val = {
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