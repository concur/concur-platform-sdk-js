 concur-receipt
==============

A helper library to submit receipts via [Concur's API](http://developer.concur.com). If you want an overview of the APIs check out the [page here!]
(https://developer.concur.com/get-started/webservices-overview)

## Installation

    npm install concur-receipt

## Usage

    var concur = require('concur-receipt');
    var oauthToken = config.get('oauthToken');
    var webserviceAdminoauthToken = config.get('webserviceAdminoauthToken');
        
    //To send just a receipt image to the Concur Receipt Store
    concur.sendReceipt({oauthToken:oauthToken, image:image, contentType:'image/jpg'})
    .then(function(imageId) {
        //ImageID is returned on success
    })
    .fail(function(error) {
        //Failure error is returned if receipt is unable to post
    });
    
    //To send an eReceipt to Concur without an Image
    concur.sendEReceipt({oauthToken:webserviceAdminoauthToken, data:eReceiptJSON, contentType:'application/json'})
    .then(function(ReceiptID) {
    	// Receipt ID is the id of the generated E-Receipt.
    ))
    .fail(function(error) {
        //Failure error is returned if receipt is unable to post
    });
    
    //To send an eReceipt to Concur with an Image. 
    var receiptDetails = {
        oauthToken:webserviceAdminoauthToken,
        data:eReceiptWithImageJSON,
        contentType:'application/json',
    };
    concur.sendReceipt(receiptDetails).then(function(data){
        expect(data).to.be.ok;
        console.log(data);
        done();
    })
    .fail(function (error) {
        console.log("EReceipt with Image failed to upload with error: ", error);
    });
    
## Content-Types for Receipt Image

Receipt documentation here: [Receipt Image](https://www.concursolutions.com/api/docs/index.html#!/ReceiptImages)

    * application/pdf
    * image/jpg
    * image/jpeg
    * image/png
    
eReceipt documentation here: [eReceipt](https://developer.concur.com/api-documentation/more-resources/draft-documentation/e-receipt-service)

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