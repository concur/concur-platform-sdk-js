var concur = require('../'),
    config = require('config'),
    expect = require('chai').expect;


var oauthToken = config.get('oauthToken');

describe('Concur Quickexpense Test', function() {
    this.timeout(10000);
    var quickexpenseId;

    describe('#post', function() {
        it('should send a valid quickexpense to the expense list', function(done) {
            var quickexpenseJSON = {
                "Comment": "I am a Quick Expense",
                "CurrencyCode": "USD",
                "ExpenseTypeCode": "CARMI",
                "LocationCity": "Seattle",
                "LocationCountry": "US",
                "LocationSubdivision": "US-WA",
                "TransactionAmount": "12.23",
                "TransactionDate": "2014-10-10",
                "VendorDescription": "Testing"
            };

            var options = {
                oauthToken:oauthToken,
                contentType:'application/json',
                body:quickexpenseJSON
            };

            concur.quickexpense.send(options)
            .then(function(data){
                expect(data).to.be.ok;
                expect(data).to.have.property('ID');
                expect(data).to.have.property('URI');
                done();
            })
            .fail(function (error) {
                console.log("Failed to upload quick expense with error: ", error);
            });
        });

        it('should return a 400 bad request', function(done) {
            var options = {
                oauthToken:oauthToken,
                contentType:'application/json',
                body:{}
            };

            concur.quickexpense.send(options)
            .then(function(data){})
            .fail(function (error) {
                expect(error.error).to.contain('400');
                done();
            });
        });
    });

    describe('#get', function() {
        it('should get a list of quick expenses', function(done) {
            var options = {
                oauthToken:oauthToken
            };

            concur.quickexpense.get(options)
            .then(function(data) {
                quickexpenseId = data.Items[0].ID;
                expect(data.Items[0]).to.have.property('TransactionAmount');
                expect(data.Items[0]).to.have.property('TransactionDate');
                expect(data.Items[0]).to.have.property('ExpenseTypeName');
                expect(data.Items[0]).to.have.property('Comment');
                done();
            })
            .fail(function (error) {
                console.log("Failed to get the list of quick expenses with error: ", error);
            });
        });

        it('should get a single quickexpense', function(done) {
            var options = {
                oauthToken:oauthToken,
                quickexpenseId:quickexpenseId
            };

            concur.quickexpense.get(options)
            .then(function(data) {
                expect(data).to.have.property('TransactionAmount');
                expect(data).to.have.property('TransactionDate');
                expect(data).to.have.property('ExpenseTypeName');
                expect(data).to.have.property('Comment');
                expect(data).to.have.property('URI');
                done();
            })
            .fail(function (error) {
                console.log("Failed to get the single quick expense: ", error);
            });
        });
    });

    describe('#put', function() {
        it('should update the quick expense posted', function(done) {
            var quickexpenseJSON = {
                "TransactionAmount": "16.23"
            };

            var options = {
                oauthToken:oauthToken,
                contentType:'application/json',
                quickexpenseId:quickexpenseId,
                body:quickexpenseJSON
            };

            concur.quickexpense.put(options)
            .then(function(data){
                expect(data).to.be.equal(204);
                done();
            })
            .fail(function (error) {
                console.log("Failed to update quick expense with error: ", error);
            });
        });

        it('should return a 400 bad request', function(done) {
            var options = {
                oauthToken:oauthToken,
                contentType:'application/json',
                body:{}
            };

            concur.quickexpense.put(options)
            .then(function(data){})
            .fail(function (error) {
                expect(error.Message).to.contain('No HTTP resource was found that matches the request URI');
                expect(error.statusCode).to.be.equal(404);
                done();
            });
        });
    });

    describe('#delete', function() {
        it('should contain response code 204', function(done) {
            var options = {
                oauthToken:oauthToken,
                quickexpenseId:quickexpenseId
            };

            concur.quickexpense.delete(options)
            .then(function(data) {
                expect(data).to.be.equal(204);
                done();
            })
            .fail(function (error) {
                console.log("Failed to delete the expense ", error);
            });
        });

        it('should contain response code 404 ', function(done) {
            var options = {
                oauthToken:oauthToken,
                quickexpenseId:12345
            };

            concur.quickexpense.delete(options)
            .then(function(data) {})
            .fail(function (error) {
                expect(error.Message).to.be.equal('A resource with the specified ID could not be found.');
                expect(error.statusCode).to.be.equal(404);
                done();
            });
        });
    });
});
