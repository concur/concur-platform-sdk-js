var request = require('request'),
    Q = require('q');

exports.post = function(options) {
    var deferred = Q.defer();

    var headers = {
        'Authorization' : 'OAuth '+options.oauthToken,
        'Accept':'application/json',
        'Content-Type':options.contentType
    };

    request.post({url:options.url, headers:headers, body:options.body}, function(error, response, body){
        // Error with the actual request
        if (error){
            return deferred.reject(error);
        }

        // Non-200 HTTP response code
        if (response.statusCode != 200){
            return deferred.reject({'error':options.error+' returned HTTP status code '+response.statusCode, 'body':body});
        }

        var bodyJSON = JSON.parse(body);

        // 200, but Error in token payload
        if (bodyJSON.Message) return deferred.reject({'error':bodyJSON.Message});

        // parse and map receipt ID
        if (bodyJSON.ID) {
            deferred.resolve(bodyJSON.ID);
        } else {
            deferred.resolve(bodyJSON.ReceiptID);
        }

    });
    return deferred.promise;
};