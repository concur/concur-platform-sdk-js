Concur SDK for Javascript
==============

Javascript SDK to interact with [Concur's API](http://developer.concur.com). If you want an overview of the APIs check out the [page here!]
(https://developer.concur.com/get-started/webservices-overview)

## Installation

    npm install concur-platform

## Usage

    var concur = require('concur-platform');

## Contains

###Oauth

Helper functions to get an [OAuth token](https://developer.concur.com/api-documentation/oauth-20-0).

####Usage
    var concur = require('concur-platform');

    var parameters = {
        username:username,
        password:password,
        consumerKey:consumerKey
    }
    concur.oauth.native(parameters)
    .then(function(token) {
        // token will contain the value, instanceUrl, refreshToken, and expiration details
    })
    .fail(function(error) {
        // error will contain the error message returned
    });


###Receipt

Receipt documentation here: [Receipt Image](https://www.concursolutions.com/api/docs/index.html#!/ReceiptImages)
eReceipt documentation here: [eReceipt](https://developer.concur.com/api-documentation/more-resources/draft-documentation/e-receipt-service)

####Usage

    var concur = require('concur-platform');

    //Sending a receipt
    concur.receipt.send({oauthToken:oauthToken, image:image, contentType:'image/png'})
    .then(function(receiptID) {
        //receiptID is returned on success
    })
    .fail(function(error) {
        // error will contain the error message returned
    });

    //Getting receipts
    concur.receipt.get({oauthToken:oauthToken})
    .then(function(data) {
        //data will contain a list of receipts
    })
    .fail(function(error) {
        // error will contain the error message returned
    });

    //Deleting a receipt
    concur.receipt.delete({oauthToken:oauthToken, receiptId:receiptId})
    .then(function(data.statusCode) {
        // data.statusCode will be equal to 204, the receipt was deleted
    })
    .fail(function(error) {
        // error will contain the error message returned
    });



## Tests

To test, in the config folder, create a default.json file containing the credentials of the account that you would like to test with. You can
use template.json as a template. Then, run the standard npm test:

    npm test

The test will upload the concur logo to the expense receipt store associated with the oAuth token. It will also upload an E-Receipt to the user given by the OauthToken. 

## License

Copyright 2014 [Concur Technologies](http://www.concur.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.