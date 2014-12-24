var request = require('request'),
    xml = require('./xml'),
    Q = require('q');

exports.serviceURL = process.env.CONCUR_BASE_URI || "https://www.concursolutions.com";

var DEFAULTS = {
    userAgent:'Concur-platform-sdk-js',
    contentType: 'application/json'
    
};

exports.delete = function(options) {
    var deferred = Q.defer();

    var headers = {
        'Authorization': 'Oauth '+ options.oauthToken || options.token || options.oAuthToken,
        'Accept':options.contentType || DEFAULTS.contentType,
        'User-Agent': DEFAULTS.userAgent
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
                'Message':body && body.Message && JSON.parse(body).Message
            });
        }

        deferred.resolve(response.statusCode);

    });
    return deferred.promise;
};

exports.send = function(options) {
    var deferred = Q.defer();

    var headers = {
        'Authorization': 'Oauth '+ options.oauthToken || options.token || options.oAuthToken,
        'Accept': options.contentType || DEFAULTS.contentType,
        'Content-Type': options.contentType || DEFAULTS.contentType,
        'User-Agent':DEFAULTS.userAgent
    };

    request.post({url:options.resourceURL, headers:headers, body:JSON.stringify(options.body)}, function(error, response, body) {
        // Error with the actual request
        if (error) {
            return deferred.reject(error);
        }

        // Non-200 HTTP response code
        if (response.statusCode != 200) {
            return deferred.reject({
                'statusCode':response.statusCode,
                'Message':body && body.Message && JSON.parse(body).Message
            });
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
        'Authorization' : 'OAuth ' + options.oauthToken || options.token || options.oAuthToken,
        'Accept' : DEFAULTS.contentType,
        'User-Agent': DEFAULTS.userAgent
    };

    var tempURL = options.resourceURL;
    if (options.id) {
        tempURL = tempURL +'/'+options.id;
    }

    request({url:tempURL, qs:options.queryParameters, headers:headers}, function(error, response, body) {
        // Error with the actual request
        if (error) {
            return deferred.reject(error);
        }

        // Non-200 HTTP response code
        if (response.statusCode != 200) {
            return deferred.reject({
                'statusCode':response.statusCode,
                'Message':body && body.Message && JSON.parse(body).Message
            });
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
        'Authorization' : 'OAuth '+ options.oauthToken || options.token || options.oAuthToken,
        'Accept': DEFAULTS.contentType,
        'Content-Type': options.contentType || DEFAULTS.contentType,
        'User-Agent': DEFAULTS.userAgent
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
                'Message':body && body.Message && JSON.parse(body).Message
            });
        }

        deferred.resolve(response.statusCode);

    });
    return deferred.promise;
};