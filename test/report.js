var concur = require('../'),
    config = require('config'),
    expect = require('chai').expect;


var oauthToken = config.get('oauthToken');

describe('Concur Report Tests', function() {
  this.timeout(10000);
  var reportId;

  describe('#post', function() {
    it('should send a valid report to the report list', function(done) {
      var report = {
        'Name': 'Test Report for Client Library'
      };

      var options = {
        oauthToken:oauthToken,
        contentType:'application/json',
        body:report
      };

      concur.report.send(options)
      .then(function(data){
        expect(data).to.be.ok;
        done();
      })
      .fail(function (error) {
        console.log('Unable to send report with error: ', error);
      });

    });

    it('should return a 400 bad request', function(done) {
      var options = {
        oauthToken:oauthToken,
        contentType:'application/json',
        body:{}
      };

      concur.report.send(options)
      .then(function(data){})
      .fail(function (error) {
        expect(error.error).to.contain('400');
        done();
      });
    });
  });

  var reportId;

  describe('#get', function() {
    it('should get a list of reports', function(done) {
      var options = {
        oauthToken:oauthToken
      };

      concur.report.get(options)
      .then(function(data) {
        reportId = data.Items[0].ID;
        expect(data).to.be.ok;
        done();
      })
      .fail(function (error) {
        console.log('Failed to get the list of reports with error: ', error);
      });
    });

    it('should get a of report', function(done) {
      var options = {
        oauthToken:oauthToken,
        id:reportId
      };

      concur.report.get(options)
          .then(function(data) {
            console.log(data);
            expect(data).to.be.ok;
            done();
          })
          .fail(function (error) {
            console.log('Failed to get the list of reports with error: ', error);
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

      concur.report.put(options)
          .then(function(data){})
          .fail(function (error) {
            expect(error.Message).to.contain('No HTTP resource was found that matches the request URI');
            expect(error.statusCode).to.be.equal(404);
            done();
          });
    });
  });
});
