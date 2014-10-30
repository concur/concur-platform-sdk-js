var utils = require('../utils/utils.js'),
    util = require('util');

var url = utils.serviceURL + '/net2/oauth2/getaccesstoken.ashx?';

module.exports = {
  send: function(options) {
    var tempURL = util.format('%s?refresh_token=%s&client_id=%s&client_secret=%s',
        url,
        options.refreshToken,
        options.client_id,
        options.client_secret);
    options.resourceURL = tempURL;
    return utils.send(options);
  }
};


/*
 GET https://www.concursolutions.com/net2/oauth2/getaccesstoken.ashx
 ?refresh_token={Refresh Token}
 &client_id={Consumer Key}&client_secret={Consumer Secret}
 */