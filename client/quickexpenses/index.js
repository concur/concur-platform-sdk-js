var utils = require('../utils/utils.js');

var url = utils.serviceURL + '/api/v3.0/expense/quickexpenses';

module.exports = {
    get: function (options) {
        if (options.quickexpenseId) {
            options.id = options.quickexpenseId;
        }
        options.resourceURL = url;
        return utils.get(options);
    },
    send: function(options) {
        options.resourceURL = url;
        return utils.send(options);
    },
    put: function(options) {
        if (options.quickexpenseId) {
            options.id = options.quickexpenseId;
        }
        options.resourceURL = url;
        return utils.put(options);
    },
    delete:function(options) {
        if (options.quickexpenseId) {
            options.id = options.quickexpenseId;
        }
        options.resourceURL = url;
        return utils.delete(options);
    }
};