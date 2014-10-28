var concur = require('../'),
    config = require('config'),
    expect = require('chai').expect;


var oauthToken = config.get('oauthToken');

describe('Concur Entries Tests', function() {
  this.timeout(10000);
  var entryId;

  describe('#post', function() {
    it('should send a valid entry to the entries list', function(done) {
      var entry = {
        'Comment': 'Test Mileage Entry',
        'Description': 'Client Meeting',
        'ExchangeRate': '1.234',
        'ExpenseTypeCode': 'MILEG',
        'IsBillable': 'true',
        'IsPersonal': 'false',
        'Journey': {
          'BusinessDistance': '100',
          'EndLocation': 'Bellevue',
          'NumberOfPassengers': '3',
          'OdometerEnd': '22222',
          'OdometerStart': '11111',
          'PersonalDistance': '0',
          'StartLocation': 'Seattle',
          'UnitOfMeasure': 'M',
          'VehicleID': 'vid'
        },
        'TaxReceiptType': 'T',
        'TransactionDate': '2014-10-27',
        'VendorDescription': 'Drive myself',
        'VendorListItemID': 'ven list ID',
        'reportid': '98877EEAF75F4F28BCCA'
      }

      var options = {
        oauthToken:oauthToken,
        contentType:'application/json',
        body:entry
      };

      concur.entries.send(options)
          .then(function(data){
            expect(data).to.be.ok;
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
      .then(function(data){})
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
            expect(data).to.be.ok;
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
            console.log(data);
            expect(data).to.be.ok;
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
          .then(function(data){})
          .fail(function (error) {
            expect(error.Message).to.contain('No HTTP resource was found that matches the request URI');
            expect(error.statusCode).to.be.equal(404);
            done();
          });
    });
  });
});
