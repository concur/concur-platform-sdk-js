var utils = require('../utils/utils.js'),
    util = require('util');

var url = utils.serviceURL + '/net2/oauth2/revoketoken.ashx';

module.exports = {
  send: function(options) {
    var tempURL;
    if (options.token) {
      tempURL = util.format('%s?token=%s', url, options.token);
    } else {
      tempURL = util.format('%s?client_id=%s&user=%s', url, options.client_id, options.loginId);
    }
    options.resourceURL = tempURL;
    return utils.send(options);
  }
};


/*
 GET https://www.concursolutions.com/net2/oauth2/revoketoken.ashx
 ?token={Access Token}
 */
