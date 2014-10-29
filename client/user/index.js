var request = require('request'),
    utils = require('../utils/utils.js'),
    Q = require('q');

var url = utils.serviceURL + '/api/user/v1.0/User/';

module.exports = {
    get: function (options) {
        options.resourceURL = url;
        return utils.get(options);
    },
    send: function(options) {
        options.resourceURL = url;
        return utils.send(options);
    }
};