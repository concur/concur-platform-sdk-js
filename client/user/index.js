var request = require('request'),
    utils = require('../utils/utils.js'),
    Q = require('q');

module.exports = {
    get: function(options) {
        var deferred = Q.defer();

        var concurUserURL = utils.serviceURL + '/api/user/v1.0/User/';

        if(options.loginId) {
            concurUserURL + options.loginId;
        }

        var headers = {
            'Authorization' : 'OAuth ' + options.oauthToken,
            'Accept': 'application/json'
        };

        request({url:concurUserURL, headers:headers}, function(error, response, body){
            // Error with the actual request
            if (error){
                return deferred.reject(error);
            }

            // Non-200 HTTP response code
            if (response.statusCode != 200){
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