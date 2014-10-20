var request = require('request'),
    getImage = require('./loadImageFromURL'),
    image = require('./post'),
    utils = require('../utils/utils.js');
    Q = require('q');

var serviceURL = utils.serviceURL,
    receiptImageURL = serviceURL + '/api/v3.0/expense/receiptimages',
    eReceiptURL = serviceURL + '/api/v3.0/ereceipt/receipts',
    eReceiptWithImageURL = serviceURL + '/api/v3.0/common/receipts';

module.exports = {
    send: function(receiptDetails) {
        var requestBody = {};
        requestBody.oauthToken = receiptDetails.oauthToken;
        if (receiptDetails.eReceiptWithImage) {
            requestBody.url = eReceiptWithImageURL;
            requestBody.body = JSON.stringify(receiptDetails.eReceiptWithImage);
            requestBody.error = "eReceipt with Image URL: " + eReceiptWithImageURL;
        } else if (receiptDetails.image) {
            requestBody.url = receiptImageURL;
            requestBody.body = receiptDetails.image;
            requestBody.error = "Receipt Image URL: " + receiptImageURL;
        } else if (receiptDetails.imageURL) {
            requestBody.url = receiptImageURL;
            requestBody.error = "Receipt Image URL: " + receiptImageURL;
        } else {
            requestBody.url = eReceiptURL;
            requestBody.body = JSON.stringify(receiptDetails.data);
            requestBody.error = "eReceipt Image URL: " + eReceiptURL;
        }

        if (receiptDetails.imageURL) {
            requestBody.imageURL = receiptDetails.imageURL;
            return getImage.loadImageFromURLAndPost(requestBody);
        } else {
            requestBody.contentType = receiptDetails.contentType;
            return image.post(requestBody);
        }
    },

    get:function(receiptDetails) {
        var deferred = Q.defer();

        var headers = {
            'Authorization': 'Oauth '+receiptDetails.oauthToken,
            'Accept':'application/json'
        };

        var receiptURL = receiptImageURL;
        if (receiptDetails.receiptId) {
            receiptURL =  receiptURL + '/'+receiptDetails.receiptId;
        }

        request.get({url:receiptURL, headers:headers}, function(error, response, body) {
            // Error with the actual request
            if (error){
                return deferred.reject(error);
            }

            // Non-200 HTTP response code
            if (response.statusCode != 200){
                return deferred.reject({'error':'returned HTTP status code '+response.statusCode, 'body':body});
            }

            var bodyJSON = JSON.parse(body);

            // 200, but Error in token payload
            if (bodyJSON.Message) return deferred.reject({'error':bodyJSON.Message});

            deferred.resolve(bodyJSON);

        });
        return deferred.promise;
    },

    delete:function(receiptDetails) {
        var deferred = Q.defer();

        var headers = {
            'Authorization': 'Oauth '+receiptDetails.oauthToken,
            'Accept':'application/json'
        };

        var receiptURL = receiptImageURL;
        if (receiptDetails.receiptId) {
            receiptURL =  receiptURL + '/'+receiptDetails.receiptId;
        }

        request.del({url: receiptURL, headers:headers}, function(error, response, body) {
            // Error with the actual request
            if (error){
                return deferred.reject(error);
            }

            // Non-204 HTTP response code
            if (response.statusCode != 204){
                return deferred.reject({'error':'returned HTTP status code '+response.statusCode, 'body':body});
            }

            deferred.resolve(response);

        });
        return deferred.promise;
    }
};