var getImage = require('./loadImageFromURL'),
    image = require('./post'),
    utils = require('../utils/utils.js');

var serviceURL = utils.serviceURL,
    receiptImageURL = serviceURL + '/api/v3.0/expense/receiptimages',
    eReceiptURL = serviceURL + '/api/v3.0/ereceipt/receipts',
    eReceiptWithImageURL = serviceURL + '/api/v3.0/common/receipts',
    entryImageUrl = serviceURL + '/api/image/v1.0/expenseentry/',
    paymentRequest = serviceURL + '/api/image/v1.0/invoice/',
    reportImageUrl = serviceURL + '/api/image/v1.0/report/';

module.exports = {
    send: function(options) {
        var requestBody = {};
        requestBody.oauthToken = options.oauthToken;

        if (options.data && options.data.MatchingFact) {
            requestBody.url = eReceiptWithImageURL;
            requestBody.body = JSON.stringify(options.data);
            requestBody.error = "eReceipt with Image URL: " + eReceiptWithImageURL;
        } else if(options.entryId) {
            var tempURL = entryImageUrl;
            tempURL = tempURL +'/'+options.entryId;
            requestBody.body = options.image || options.imageURL;
            requestBody.url = tempURL;
            requestBody.error = "Entry image URL: " + entryImageUrl;
        } else if (options.requestId) {
            var tempPaymentRequestURL = paymentRequest;
            tempPaymentRequestURL = tempPaymentRequestURL +'/'+options.requestId;
            requestBody.body = options.image || options.imageURL;
            requestBody.url = tempPaymentRequestURL;
            requestBody.error = "Payment Request Image URL " + tempPaymentRequestURL;
        } else if (options.reportId) {
            var tempReceiptURL = reportImageUrl;
            tempReceiptURL = tempReceiptURL +'/'+options.reportId;
            requestBody.body = options.image || options.imageURL;
            requestBody.url = tempReceiptURL;
            requestBody.error = "Report Image URL " + tempReceiptURL;
        } else if (options.image) {
            requestBody.url = receiptImageURL;
            requestBody.body = options.image;
            requestBody.error = "Receipt Image URL: " + receiptImageURL;
        } else if (options.imageURL) {
            requestBody.url = receiptImageURL;
            requestBody.error = "Receipt Image URL: " + receiptImageURL;
        } else {
            requestBody.url = eReceiptURL;
            requestBody.body = JSON.stringify(options.data);
            requestBody.error = "eReceipt Image URL: " + eReceiptURL;
        }

        if (options.imageURL) {
            requestBody.imageURL = options.imageURL;
            return getImage.loadImageFromURLAndPost(requestBody);
        } else {
            requestBody.contentType = options.contentType;
            return image.post(requestBody);
        }
    },

    get: function (options) {
        if (options.receiptId) {
            options.id = options.receiptId;
        }
        options.resourceURL = receiptImageURL;
        return utils.get(options);
    },

    delete:function(options) {
        if (options.receiptId) {
            options.id = options.receiptId;
        }
        options.resourceURL = receiptImageURL;
        return utils.delete(options);
    }
};