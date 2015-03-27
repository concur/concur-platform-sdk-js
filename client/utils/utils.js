var request = require('request'),
    xml = require('./xml'),
    Q = require('q');

exports.serviceURL = process.env.CONCUR_BASE_URI || "https://www.concursolutions.com";

var DEFAULTS = {
    userAgent:'Concur-platform-sdk-js',
    contentType: 'application/json'
};

var buildError = function(options, response, body) {
    var message;
    try {
      message = JSON.parse(body);
    } catch(e) {
      message = 'Failed to parse response body';
    }
    return {
        'statusCode': response && response.statusCode,
        'Message': message && message.Error && message.Error.Message || message,
        'resourceURL': options && options.resourceURL
    };
};

var buildHeader = function(options) {
    return {
      'Authorization' : 'OAuth '+ (options.oauthToken || options.token || options.oAuthToken),
      'Accept': DEFAULTS.contentType,
      'Content-Type': options.contentType || DEFAULTS.contentType,
      'User-Agent': DEFAULTS.userAgent
    };
};

var buildUrl = function(options) {
  if (options.id) {
    return options.resourceURL +'/'+ options.id;
  } else {
    return options.resourceURL;
  }
};

exports.delete = function(options) {
    var deferred = Q.defer();
    var headers = buildHeader(options);
    request.del({url: buildUrl(options), headers:headers}, function(error, response, body) {
        // Error with the actual request
        if (error){
            return deferred.reject(error);
        }
        // Non-204 HTTP response code
        if (response.statusCode != 204) {
            return deferred.reject(buildError(options, response, body));
        }
        deferred.resolve(response.statusCode);
    });
    return deferred.promise;
};

exports.send = function(options) {
    var deferred = Q.defer();
    var headers = buildHeader(options);
    request.post({url:options.resourceURL, headers:headers, body:JSON.stringify(options.body)}, function(error, response, body) {
        // Error with the actual request
        if (error) {
            return deferred.reject(error);
        }
        // Non-200 HTTP response code
        if (response.statusCode != 200) {
            return deferred.reject(buildError(options, response, body));
        }
        var bodyJSON = body ? JSON.parse(body) : {};
        // 200, but Error in token payload
        if (bodyJSON.Error) return deferred.reject({'error':bodyJSON.Message});
        deferred.resolve(bodyJSON);
    });
    return deferred.promise;
};

exports.get = function(options) {
    var deferred = Q.defer();
    var headers = buildHeader(options);
    request({url:buildUrl(options), qs:options.queryParameters, headers:headers}, function(error, response, body) {
        // Error with the actual request
        if (error) {
            return deferred.reject(error);
        }
        // Non-200 HTTP response code
        if (response.statusCode != 200) {
            return deferred.reject(buildError(options, response, body));
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
        if (parsedBody.Error) return deferred.reject({'error':parsedBody.Error.Message});
        deferred.resolve(parsedBody);
    });
    return deferred.promise;
};

exports.put = function(options) {
    var deferred = Q.defer();
    var headers = buildHeader(options);
    request.put({url:buildUrl(options), headers:headers, body:JSON.stringify(options.body)}, function(error, response, body) {
        // Error with the actual request
        if (error) {
            return deferred.reject(error);
        }
        // Non-204 HTTP response code
        if (response.statusCode != 204) {
            return deferred.reject(buildError(options, response, body));
        }
        deferred.resolve(response.statusCode);
    });
    return deferred.promise;
};
