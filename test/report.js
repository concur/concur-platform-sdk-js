var concur = require('../'),
    config = require('config'),
    _ = require('underscore');
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

      concur.reports.send(options)
      .then(function(data){
        expect(data).to.have.property('ID');
        expect(data).to.have.property('URI');
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

      concur.reports.send(options)
      .fail(function (error) {
        expect(error.statusCode).to.equal('400');
        done();
      });
    });
  });

  describe('#get', function() {
    it('should get a list of reports', function(done) {
      var options = {
        oauthToken:oauthToken
      };

      concur.reports.get(options)
      .then(function(data) {
        reportId = data.Items[0].ID;
        expect(data).to.have.property('Items');
        expect(data).to.have.property('NextPage');
        done();
      })
      .fail(function (error) {
        console.log('Failed to get the list of reports with error: ', error);
      });
    });

    it('should get reports that have not been submitted', function(done) {
      var options = {
        oauthToken:oauthToken,
        queryParameters: {
          approvalStatusCode:'A_NOTF'
        }
      };

      concur.reports.get(options)
      .then(function(data) {
        _.each(data.Items, function(report) {
          expect(report.ApprovalStatusCode).to.be.equal('A_NOTF');
        });
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

      concur.reports.get(options)
      .then(function(data) {
        expect(data).to.have.property('CurrencyCode');
        expect(data).to.have.property('Name');
        expect(data).to.have.property('ID');
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

      concur.reports.put(options)
      .fail(function (error) {
        expect(error.Message).to.contain('No HTTP resource was found that matches the request URI');
        expect(error.statusCode).to.be.equal(404);
        done();
      });
    });
  });
});
