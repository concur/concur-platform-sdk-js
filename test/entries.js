var concur = require('../'),
    config = require('config'),
    expect = require('chai').expect;


var oauthToken = config.get('oauthToken');

describe('Concur Entries Tests', function() {
  this.timeout(10000);

  describe('#post', function() {
    it('should send a valid entry to the entries list', function(done) {
      var entry = {
        "Comment": "Client Library Test",
        "ExpenseTypeCode": "AIRFR",
        "ReportID": "85A115024B9F4741B555",
        "TransactionAmount": "42.00",
        "TransactionDate": '2014-10-29T00:00:00',
        "TransactionCurrencyCode":'USD',
        "PaymentTypeID":'ngLqMhm1rUlu$p$peX$saN9aco4wfcU'
      };

      var options = {
        oauthToken:oauthToken,
        contentType:'application/json',
        body:entry
      };

      concur.entries.send(options)
      .then(function(data){
        expect(data).to.have.property('ID');
        expect(data).to.have.property('URI');
        done();
      })
      .fail(function (error) {
        console.log('Unable to send entries with error: ', error);
      });
    });

    it('should return a 400 bad request', function(done) {
      var options = {
        oauthToken:oauthToken,
        contentType:'application/json',
        body:{}
      };

      concur.entries.send(options)
      .fail(function (error) {
        expect(error.error).to.contain('400');
        done();
      });
    });
  });

  var entriesId;

  describe('#get', function() {
    it('should get a list of entriess', function(done) {
      var options = {
        oauthToken:oauthToken
      };

      concur.entries.get(options)
      .then(function(data) {
        entriesId = data.Items[0].ID;
        expect(data).to.have.property('Items');
        expect(data).to.have.property('NextPage');
        done();
      })
      .fail(function (error) {
        console.log('Failed to get the list of entries with error: ', error);
      });
    });

    it('should get an entry', function(done) {
      var options = {
        oauthToken:oauthToken,
        id:entriesId
      };

      concur.entries.get(options)
          .then(function(data) {
            expect(data).to.have.property('ID');
            done();
          })
          .fail(function (error) {
            console.log('Failed to get the list of entries with error: ', error);
          });
    });

  });

  describe('#put', function() {

    it('should return a 400 bad request', function(done) {
      var options = {
        oauthToken:oauthToken,
        contentType:'application/json',
        body:{}
      };

      concur.entries.put(options)
      .fail(function (error) {
        expect(error.Message).to.contain('No HTTP resource was found that matches the request URI');
        expect(error.statusCode).to.be.equal(404);
        done();
      });
    });
  });
});
