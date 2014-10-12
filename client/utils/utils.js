var request = require('request');
    Q = require('q');

exports.serviceURL = "https://www.concursolutions.com";

exports.delete = function(options) {
    var deferred = Q.defer();

    var headers = {
        'Authorization': 'Oauth '+options.oauthToken,
        'Accept':'application/json'
    };

    var tempURL = options.URL;
    if (options.resourceId) {
        tempURL = tempURL +'/'+options.resourceId;
    }

    request.del({url: tempURL, headers:headers}, function(error, response, body) {
        // Error with the actual request
        if (error){
            return deferred.reject(error);
        }

        // Non-204 HTTP response code
        if (response.statusCode != 204){
            return deferred.reject({
                'statusCode':response.statusCode,
                'Message':JSON.parse(body).Message
            });
        }

        deferred.resolve(response.statusCode);

    });
    return deferred.promise;
};

exports.send = function(options) {
    var deferred = Q.defer();

    var headers = {
        'Authorization' : 'OAuth '+options.oauthToken,
        'Accept':'application/json',
        'Content-Type':'application/json'
    };

    request.post({url:options.resourceURL, headers:headers, body:JSON.stringify(options.body)}, function(error, response, body) {
        // Error with the actual request
        if (error) {
            return deferred.reject(error);
        }

        // Non-200 HTTP response code
        if (response.statusCode != 200) {
            return deferred.reject({'error':'Auth URL ('+options.resourceURL+') returned HTTP status code '+response.statusCode});
        }

        var bodyJSON = JSON.parse(body);

        // 200, but Error in token payload
        if (bodyJSON.Error) return deferred.reject({'error':bodyJSON.Message});

        deferred.resolve(bodyJSON);
    });
    return deferred.promise;
};

exports.get = function(options) {
    var deferred = Q.defer();

    var headers = {
        'Authorization' : 'OAuth ' + options.oauthToken,
        'Accept' : 'application/json'
    };

    var tempURL = options.resourceURL;
    if (options.resourceId) {
        tempURL = tempURL +'/'+options.resourceId;
    }

    request({url:tempURL, headers:headers}, function(error, response, body) {
        // Error with the actual request
        if (error) {
            return deferred.reject(error);
        }

        // Non-200 HTTP response code
        if (response.statusCode != 200) {
            return deferred.reject({'error':'Auth URL ('+tempURL+') returned HTTP status code '+response.statusCode});
        }

        var bodyJSON = JSON.parse(body);

        // 200, but Error in token payload
        if (bodyJSON.Error) return deferred.reject({'error':bodyJSON.Message});

        deferred.resolve(bodyJSON);
    });
    return deferred.promise;
};

exports.put = function(options) {
    var deferred = Q.defer();

    var headers = {
        'Authorization' : 'OAuth '+options.oauthToken,
        'Accept':'application/json',
        'Content-Type':'application/json'
    };

    var tempURL = options.resourceURL;
    if (options.resourceId) {
        tempURL = tempURL +'/'+options.resourceId;
    }

    request.put({url:tempURL, headers:headers, body:JSON.stringify(options.body)}, function(error, response, body) {
        // Error with the actual request
        if (error) {
            return deferred.reject(error);
        }

        // Non-204 HTTP response code
        if (response.statusCode != 204){
            return deferred.reject({
                'statusCode':response.statusCode,
                'Message':JSON.parse(body).Message
            });
        }

        deferred.resolve(response.statusCode);

    });
    return deferred.promise;
};