var utils = require('../utils/utils.js');

var url = utils.serviceURL + '/api/v3.0/expense/reportdigests';

module.exports = {
  get: function (options) {
    options.resourceURL = url;
    return utils.get(options);
  }
};