var utils = require('../utils/utils.js');

var url = utils.serviceURL + '/api/v3.0/invoice/purchaseorderreceipts';

module.exports = {
  put: function(options) {
    options.resourceURL = url;
    return utils.put(options);
  }
};