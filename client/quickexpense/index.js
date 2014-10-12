var request = require('request'),
    utils = require('../utils/utils.js'),
    Q = require('q');

var quickexpenseURL = utils.serviceURL + '/api/v3.0/expense/quickexpenses';

module.exports = {
    get: function (options) {
        options.resourceURL = quickexpenseURL;
        options.resourceId = options.quickexpenseId;
        return utils.get(options);
    },
    send: function(options) {
        options.resourceURL = quickexpenseURL;
        return utils.send(options);
    },
    put: function(options) {
        options.resourceURL = quickexpenseURL;
        options.resourceId = options.quickexpenseId;
        return utils.put(options);
    },
    delete:function(options) {
        options.URL = quickexpenseURL;
        options.resourceId = options.quickexpenseId;
        return utils.delete(options);
    }
};