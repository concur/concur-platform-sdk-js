var request = require('request'),
    utils = require('../utils/utils.js'),
    Q = require('q');

var userURL = utils.serviceURL + '/api/user/v1.0/User/';

module.exports = {
    get: function(options) {
        var deferred = Q.defer();


        var tempUserURL = userURL;
        if(options.loginId) {
            tempUserURL = userURL +'?'+ options.loginId;
        }

        var headers = {
            'Authorization' : 'OAuth ' + options.oauthToken,
            'Accept': 'application/json'
        };

        request({url:tempUserURL, headers:headers}, function(error, response, body){
            // Error with the actual request
            if (error) {
                return deferred.reject(error);
            }

            // Non-200 HTTP response code
            if (response.statusCode != 200) {
                return deferred.reject({'error':'Auth URL ('+concurUserURL+') returned HTTP status code '+response.statusCode});
            }

            var bodyJSON = JSON.parse(body);

            // 200, but Error in token payload
            if (bodyJSON.Error) return deferred.reject({'error':bodyJSON.Message});

            deferred.resolve(bodyJSON);
        });

        return deferred.promise;
    }
};