var expect = require('chai').expect,
    concur = require('../'),
    config = require('config'),
    fs = require('fs');

var oauthToken = config.get('oauthToken');
var webserviceAdminoauthToken = config.get('webserviceAdminoauthToken');

describe('Concur Receipt Tests', function(){
    this.timeout(10000);
    it('should send a valid image to the receipt store', function(done) {
        fs.readFile('test/concurlogo.png', function(err, image) {
            if (!err) {
                concur.receipt.send({oauthToken:oauthToken, image:image, contentType:'image/png'})
                .then(function(imageId) {
                    expect(imageId).to.be.ok;
                    done();
                })
                .fail(function(error) {
                    console.log("fail", error);
                });
            } else {
                console.log(err);
            }
        });
    });

    it('should fail with invalid content type', function(done) {
        fs.readFile('test/concurlogo.png', function(err, image) {
            if (!err) {
                concur.receipt.send({oauthToken:oauthToken, image:image, contentType:'image/html'})
                .then({})
                .fail(function(error) {
                    expect(error.body).contain('"Message":"Content-Type \\"image/html\\" is unsupported."}');
                    done();
                });
            } else {
                console.log(err);
            }
        });
    });

    var receiptId;

    it('should get a list of receipts', function(done) {
       concur.receipt.get({oauthToken:oauthToken})
       .then(function(data) {
           receiptId = data.Items[0].ID;
           expect(data).to.be.ok;
           done();
       })
       .fail(function(error) {
           console.log('Error images not returned: ', error);
       });
    });

    it('should get a single receipt', function(done) {
        concur.receipt.get({oauthToken:oauthToken, receiptId:receiptId})
        .then(function(data) {
            expect(data).to.be.ok;
            done();
        })
        .fail(function(error) {
          console.log('Unable to retrive receipt by id: ', error);
        });
    });

    it('should get a 204 response', function(done) {
        concur.receipt.delete({oauthToken:oauthToken, receiptId:receiptId})
        .then(function(data) {
            expect(data.statusCode).to.equal(204);
            done();
        })
        .fail(function(error) {
            console.log('Error image not deleted: ', error)
        });
    });
});



//describe('Concur EReceipt Tests', function(){
//    this.timeout(10000);
//    it('should send a valid ereceipt to the Smart expense list', function(done) {
//        var eReceiptJSON = require('./ereceipt.json');
//        eReceiptJSON.MatchingFacts.OAuthToken = oauthToken;
//        concur.receipt.send({oauthToken:webserviceAdminoauthToken, data:eReceiptJSON, contentType:'application/json'})
//        .then(function(data){
//            expect(data).to.be.ok;
//            console.log(data);
//            done();
//        })
//        .fail(function (error) {
//            console.log("fail", error);
//        })
//
//
//    });
//});
//
//
//describe('Concur EReceipt with Image Test', function() {
//    this.timeout(10000);
//    it('should send a valid ereceipt with image to the Smart Expense list', function (done) {
//        var eReceiptWithImageJSON = require('./ridereceipt.json');
//        var receiptDetails = {
//            oauthToken:webserviceAdminoauthToken,
//            data:eReceiptWithImageJSON,
//            contentType:'application/json'
//        };
//        concur.receipt.send(receiptDetails).then(function(data){
//            expect(data).to.be.ok;
//            console.log(data);
//            done();
//        })
//        .fail(function (error) {
//            console.log("EReceipt with Image failed to upload with error: ", error);
//        });
//    });
//});
