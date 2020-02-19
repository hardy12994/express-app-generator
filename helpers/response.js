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
        failure: function(error) {
            var val = {
                isSuccess: false,
                error: typeof error === 'string' ? error : JSON.stringify(error),
            };
            res.log.error('failed', val);
            res.json(val);
        },
        data: function(item) {
            var val = {
                isSuccess: true,
                data: item
            };
            res.log.info('success', val);
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