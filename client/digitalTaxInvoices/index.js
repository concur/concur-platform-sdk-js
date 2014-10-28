var utils = require('../utils/utils.js');

var url = utils.serviceURL + '/api/v3.0/expense/digitaltaxinvoices';

module.exports = {
  get: function (options) {
    options.resourceURL = url;
    return utils.get(options);
  },
  put: function(options) {
    options.resourceURL = url;
    return utils.put(options);
  }
};