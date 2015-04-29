var mock = require('mock');
var should = require('should');

var requestMockData = null;
var concur = null;

var entriesURL = 'https://www.concursolutions.com/api/v3.0/expense/allocations';

var sampleEntry = {
    'Comment': 'COMMENT',
    'ExpenseTypeCode': 'CODE',
    'ReportID': 'REPORTID',
    'TransactionAmount': 'AMOUNT',
    'TransactionDate': 'TRANSACTIONDATE',
    'TransactionCurrencyCode':'USD',
    'PaymentTypeID':'PAYMENTTYPEID'
};

var sampleRequest = {
    oauthToken: 'TOKEN',
    contentType: 'application/json',
    body: sampleEntry
};

var sampleRequestNoContentType = {
  oauthToken: 'TOKEN',
  body: sampleEntry
};

var sampleRequestQs = {
  oauthToken: 'TOKEN',
  contentType: 'application/json',
  body: sampleEntry,
  queryParameters: {
    parameter1:'USD',
    parameter2:'EUR'
  }
};

var sampleRequestXml = {
  oauthToken: 'TOKEN',
  contentType: 'application/xml',
  body: sampleEntry
};

var forbiddenResponse = 'Forbidden. Please check your Instance URL and OAuth token.';
var realResponse = '{"sample":"true"}';
var realError = '{"Error":{"Message":"Forbidden. Please check your Instance URL and OAuth token.","Server-Time":"2015-03-26T17:45:54","Id":"56054F41-53DC-404C-837D-258538F277F1"}}';
var sampleError = true;

describe('Allocations Unit Tests', function() {
  beforeEach(function() {
    requestMockData = {
      options: null,
      callback: null,
      called: false
    };

    concur = mock('../index.js', {
        '../client/allocations':null,
        '../client/utils/utils.js':null,
        'request': function (options,callback) {
          requestMockData.options = options;
          requestMockData.callback = callback;
          requestMockData.called = true;
        }},
      require);
  });

  describe('#GET', function() {
    it('should contain proper options',function(){
      concur.allocations.get(sampleRequest).then(function(){});
      requestMockData.options.url.should.equal(entriesURL);
      should.equal(requestMockData.options.qs, undefined);
      requestMockData.options.headers.Authorization.should.equal('OAuth TOKEN');
      requestMockData.options.headers.Accept.should.equal(sampleRequest.contentType);
      requestMockData.options.headers['Content-Type'].should.equal(sampleRequest.contentType);
      requestMockData.options.headers['User-Agent'].should.equal('Concur-platform-sdk-js');
      requestMockData.called.should.be.true;
    });

    it('request should contain proper options',function(){
      concur.allocations.get(sampleRequestQs).then(function(){});
      requestMockData.options.url.should.equal(entriesURL);
      should.equal(requestMockData.options.qs, sampleRequestQs.queryParameters);
      requestMockData.options.headers.Authorization.should.equal('OAuth TOKEN');
      requestMockData.options.headers.Accept.should.equal(sampleRequestQs.contentType);
      requestMockData.options.headers['Content-Type'].should.equal(sampleRequestQs.contentType);
      requestMockData.options.headers['User-Agent'].should.equal('Concur-platform-sdk-js');
      requestMockData.called.should.be.true;
    });

    it('should return an error if one is returned in the callback of request',function(){
      concur.allocations.get(sampleRequest)
      .then(function(){})
      .catch(function(error){
        error.should.be.true;
      });
      requestMockData.options.url.should.equal(entriesURL);
      requestMockData.called.should.be.true;
      requestMockData.callback(sampleError, null, null);
    });

    it('should return an error if response code is not 200',function(){
      concur.allocations.get(sampleRequest)
        .then(function(){})
        .catch(function(error){
          error.should.be.true;
          error.statusCode.should.equal(403);
          error.Message.should.equal(forbiddenResponse);
          error.resourceURL.should.equal(entriesURL);
        });
      requestMockData.options.url.should.equal(entriesURL);
      requestMockData.called.should.be.true;
      requestMockData.callback(null, {statusCode:403}, realError);
    });

    it('should parse XML response into JSON',function(){
      concur.allocations.get(sampleRequestXml)
      .then(function(data){
          data.sample.should.be.true;
      });
      requestMockData.options.url.should.equal(entriesURL);
      requestMockData.called.should.be.true;
      requestMockData.callback(null, {statusCode:200}, '<sample>true</sample>');
    });

    it('should parse the JSON',function(){
      concur.allocations.get(sampleRequestNoContentType)
        .then(function(data){
          data.sample.should.be.true;
        });
      requestMockData.options.url.should.equal(entriesURL);
      requestMockData.called.should.be.true;
      requestMockData.callback(null, {statusCode:200}, realResponse);
    });

    it('should parse the error response with statusCode of 200',function(){
      concur.allocations.get(sampleRequestNoContentType)
      .then(function(data) {
      })
      .catch(function(error) {
        error.should.equal(forbiddenResponse);
      });
      requestMockData.options.url.should.equal(entriesURL);
      requestMockData.called.should.be.true;
      requestMockData.callback(null, {statusCode:200}, realError);
    });
  });

  //describe('#POST', function() {
  //});
  //
  //describe('#PUT', function() {
  //
  //});
  //
  //describe('#DELETE', function() {
  //
  //});

});


