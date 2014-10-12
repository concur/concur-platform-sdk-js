var request = require('request'),
    utils = require('../utils/utils.js'),
    parseString = require('xml2js').parseString,
    Q = require('q');

var itineraryURL = utils.serviceURL + '/api/travel/trip/v1.1';

module.exports = {
    get: function(options) {
        var deferred = Q.defer();

        var headers = {
            'Authorization' : 'OAuth ' + options.oauthToken,
            'Accept' : 'application/json'
        };


        var itinURL = itineraryURL;
        if (options.itineraryId) {
            itinURL =  itinURL + '/'+options.itineraryId;
        }

        request({url:itinURL, headers:headers}, function(error, response, body) {
            // Error with the actual request
            if (error) {
                return deferred.reject(error);
            }

            // Non-200 HTTP response code
            if (response.statusCode != 200) {
                return deferred.reject({'error':'Auth URL ('+itineraryURL+') returned HTTP status code '+response.statusCode});
            }

            if (options.itineraryId) {
                parseString(body, function (err, result) {
                    deferred.resolve(result);
                });
            } else {
                var bodyJSON = JSON.parse(body);

                // 200, but Error in token payload
                if (bodyJSON.Error) return deferred.reject({'error':bodyJSON.Message});
                // parse and map access token
                deferred.resolve(bodyJSON);
            }
        });
        return deferred.promise;
    },
    send: function(options) {
        var deferred = Q.defer();

        var headers = {
            'Authorization' : 'OAuth '+options.oauthToken,
            'Accept':'application/json',
            'Content-Type':options.contentType
        };

        request.post({url:itineraryURL, headers:headers, body:options.body}, function(error, response, body) {
            // Error with the actual request
            if (error) {
                return deferred.reject(error);
            }

            // Non-200 HTTP response code
            if (response.statusCode != 200) {
                return deferred.reject({'error':'Auth URL ('+itineraryURL+') returned HTTP status code '+response.statusCode});
            }

            parseString(body, function (err, result) {
                deferred.resolve(result);
            });
        });
        return deferred.promise;
    }
};