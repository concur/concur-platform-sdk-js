var nativeFlow = require('./nativeFlow'),
    getAccessToken = require('./getAccessToken');


module.exports = {
    native: nativeFlow.requestToken,
    appCenter: getAccessToken.accessToken
};