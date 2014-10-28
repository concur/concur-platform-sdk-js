var utils = require('../utils/utils.js');

var url = utils.serviceURL + '/api/v3.0/invoice/purchaseorders';

module.exports = {
  get: function (options) {
    options.resourceURL = url;
    return utils.get(options);
  },
  send: function(options) {
    options.resourceURL = url;
    return utils.send(options);
  },
  put: function(options) {
    options.resourceURL = url;
    return utils.put(options);
  }
};