//var concur = require('../'),
//    config = require('config'),
//    expect = require('chai').expect;
//
//
//
//var username = config.get('username');
//var password = config.get('password');
//var consumerKey = config.get('consumerKey');
//var client_secret = config.get('client_secret');
//
//describe('Concur Native Flow oAuth Tests', function(){
//    var tokenToRefresh;
//
//    it('should validate the server returned a valid payload', function(done) {
//        this.timeout(10000);
//        var options = {
//            username:username,
//            password:password,
//            consumerKey:consumerKey
//        };
//        concur.oauth.native(options)
//        .then(function(token) {
//            tokenToRefresh = token.refreshToken;
//            expect(token).to.have.property('value');
//            expect(token).to.have.property('refreshToken');
//            expect(token).to.have.property('instanceUrl');
//            expect(token).to.have.property('expiration');
//            done();
//        })
//        .fail(function(error) {
//            console.log("Getting an OAuth token failed: ", error);
//        });
//    });
//
//    it('should refresh the token', function(done) {
//      this.timeout(10000);
//      var options = {
//        client_id:consumerKey,
//        client_secret:client_secret,
//        refreshToken:tokenToRefresh
//      };
//      concur.oauth.refreshToken(options)
//      .then(function(token) {
//        expect(token.Access_Token).to.have.property('Token');
//        expect(token.Access_Token).to.have.property('Instance_Url');
//        expect(token.Access_Token).to.have.property('Expiration_date');
//        done();
//      })
//      .fail(function(error) {
//        console.log("Refreshing the OAuth Token failed:", error);
//      });
//    });
//
//
//
//    it('should fail if the username is incorrect', function(done) {
//        var options = {
//            username:'NOBODY!',
//            password:password,
//            consumerKey:consumerKey
//        };
//        concur.oauth.native(options)
//        .then({})
//        .fail(function(rejected){
//            expect(rejected.error).to.contain('403');
//            done();
//        });
//    });
//
//    it('should fail if the password is incorrect', function(done) {
//        var options = {
//            username:username,
//            password:'BLURGH!',
//            consumerKey:consumerKey
//        };
//        concur.oauth.native(options)
//        .then({})
//        .fail(function(rejected) {
//            expect(rejected.error).to.contain('403');
//            done();
//        });
//    });
//
//    it('should fail if the consumer key is incorrect', function(done) {
//        var options = {
//            username:username,
//            password:password,
//            consumerKey:'INVALIDCONSUMERKEY!'
//        };
//        concur.oauth.native(options)
//        .then({})
//        .fail(function(rejected){
//            expect(rejected.error).to.contain('403');
//            done();
//        });
//    });
//});
//
//
////TODO: Mock out the service to test appcenter flow.
////describe('Concur AppCenter Flow oAuth Tests', function(){
////    it('should validate the server returned a valid payload', function(done) {
////        this.timeout(10000);
////
////        concur.oauth.appCenter(options)
////        .then(function(token) {
////            console.log(token);
////            done();
////        })
////        .fail(function(error) {
////            console.log(error);
////        });
////    });
////
////
////});
//
//
//
//
