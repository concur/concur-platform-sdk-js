var concur = require('../'),
    config = require('config'),
    expect = require('chai').expect;



describe('Concur Travel Profile API Tests', function(){

  describe('#get', function() {
    it('should validate the user profile matches user used', function(done) {
      this.timeout(10000);
      var options = {
        oauthToken:config.get('oauthToken')
      };

      concur.travelProfile.get(options)
        .then(function(user) {
          expect(user.ProfileResponse).to.have.property('General');
          expect(user.ProfileResponse).to.have.property('Air');
          expect(user.ProfileResponse).to.have.property('Car');
          expect(user.ProfileResponse).to.have.property('Hotel');
          done();
        })
        .fail(function(error) {
          console.log("Getting an Travel Profile failed: ", error);
        });
    });
  });


  //it('should validate the user matches the oauth token user', function(done) {
  //  this.timeout(10000);
  //  var options = {
  //    oauthToken:config.get('oauthToken')
  //  };
  //
  //
  //  concur.user.get(options)
  //      .then(function(user) {
  //        expect(user.LoginId).to.equal(config.get('username'));
  //        done();
  //      })
  //      .fail(function(error) {
  //        console.log("Getting an OAuth token failed: ", error);
  //      });
  //});
});