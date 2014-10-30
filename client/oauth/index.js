var nativeFlow = require('./nativeFlow'),
    getAccessToken = require('./getAccessToken'),
    revokeToken = require('./revokeToken'),
    refreshToken = require('./refreshToken');


module.exports = {
    native: nativeFlow.requestToken,
    appCenter: getAccessToken.accessToken,
    revokeToken: revokeToken.send,
    refreshToken: refreshToken.send
};