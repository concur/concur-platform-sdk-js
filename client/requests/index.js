var utils = require('../utils/utils.js');

var url = utils.serviceURL + '/api/v3.0/travelrequest/requests';

module.exports = {
  get: function (options) {
    options.resourceURL = url;
    return utils.get(options);
  }
};