var request = require('request'),
    utils = require('../utils/utils.js'),
    Q = require('q');

module.exports = {
    requestToken: function(parameters) {
        var deferred = Q.defer();

        var concurAccessTokenURL = utils.serviceURL + '/net2/oauth2/accesstoken.ashx';

        var headers = { 'Authorization' : 'Basic ' + new Buffer(parameters.username+':'+parameters.password).toString('base64'),
            'X-ConsumerKey' : parameters.consumerKey,
            'Accept' : 'application/json'
        };

        request({url:concurAccessTokenURL, headers:headers}, function(error, response, body){
            // Error with the actual request
            if (error){
                return deferred.reject(error);
            }

            // Non-200 HTTP response code
            if (response.statusCode != 200){
                return deferred.reject({'error':'Auth URL ('+concurAccessTokenURL+') returned HTTP status code '+response.statusCode});
            }

            var bodyJSON = JSON.parse(body);

            // 200, but Error in token payload
            if (bodyJSON.Error) return deferred.reject({'error':bodyJSON.Message});
            // parse and map access token
            var token = {};
            token.value = bodyJSON['Access_Token'].Token;
            token.instanceUrl = bodyJSON['Access_Token'].Instance_Url;
            token.expiration = bodyJSON['Access_Token'].Expiration_date;
            token.refreshToken = bodyJSON['Access_Token'].Refresh_Token;
            deferred.resolve(token);
        });

        return deferred.promise;
    }
};