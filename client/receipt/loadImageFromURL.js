var request = require('request'),
    image = require('./post');
    Q = require('q');

exports.loadImageFromURLAndPost = function (options) {
  var deferred = Q.defer();
  // Make request to the image url
  request({url: options.imageURL, encoding: null}, function (err, res, body) {
    // Error with the actual request
    if (err){
      return deferred.reject(err);
    }

    // Non-200 HTTP response code
    if (res.statusCode != 200){
      return deferred.reject({'error':res.statusCode, 'body':body});
    }

    options.contentType = res.headers['content-type'];
    options.body = body;
    image.post(options)
    .then(function (imageId) {
      deferred.resolve(imageId);
    })
    .fail(function (error) {
      deferred.reject(error);
    });
  });
  return deferred.promise;
};