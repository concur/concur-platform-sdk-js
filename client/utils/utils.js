var request = require('request'),
    xml = require('./xml'),
    Q = require('q');

exports.serviceURL = "https://www.concursolutions.com";

exports.delete = function(options) {
    var deferred = Q.defer();

    var headers = {
        'Authorization': 'Oauth '+options.oauthToken,
        'Accept':options.contentType || 'application/json',
        'User-Agent':'Concur-platform-sdk-js'
    };

    var tempURL = options.resourceURL;
    if (options.id) {
        tempURL = tempURL +'/'+options.id;
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
        'Accept': options.contentType || 'application/json',
        'Content-Type': options.contentType || 'application/json',
        'User-Agent':'Concur-platform-sdk-js'
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
        'Accept' : 'application/json',
        'User-Agent':'Concur-platform-sdk-js'
    };

    var tempURL = options.resourceURL;
    if (options.id) {
        tempURL = tempURL +'/'+options.id;
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

        var parsedBody;
        if (options.contentType) {
            xml.getCleansedObjectFromXmlBody(body, function (err, result) {
                if (err){
                    parsedBody = err;
                } else {
                    parsedBody = result;
                }
            });
        } else {
            parsedBody = JSON.parse(body);
        }

        // 200, but Error in token payload
        if (parsedBody.Error) return deferred.reject({'error':parsedBody.Message});
        deferred.resolve(parsedBody);
    });
    return deferred.promise;
};

exports.put = function(options) {
    var deferred = Q.defer();

    var headers = {
        'Authorization' : 'OAuth '+options.oauthToken,
        'Accept':'application/json',
        'Content-Type':'application/json',
        'User-Agent':'Concur-platform-sdk-js'
    };

    var tempURL = options.resourceURL;
    if (options.id) {
        tempURL = tempURL +'/'+options.id;
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