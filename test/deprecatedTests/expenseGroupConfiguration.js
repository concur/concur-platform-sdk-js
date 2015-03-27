//var concur = require('../'),
//    config = require('config'),
//    expect = require('chai').expect;
//
//
//var oauthToken = config.get('oauthToken');
//
//describe('Concur Expense Group Configuration Test', function() {
//  this.timeout(10000);
//
//  describe('#get', function() {
//    it('should get the expense group configuration', function(done) {
//      var options = {
//        oauthToken:oauthToken
//      };
//
//      concur.expenseGroupConfigurations.get(options)
//          .then(function(data) {
//            expect(data.Items[0]).to.have.property('Name');
//            expect(data.Items[0]).to.have.property('AttendeeListFormID');
//            expect(data.Items[0]).to.have.property('AttendeeListFormName');
//            expect(data.Items[0]).to.have.property('Policies');
//            done();
//          })
//          .fail(function (error) {
//            console.log("Failed to get the expense group configuration error: ", error);
//          });
//    });
//  });
//});
