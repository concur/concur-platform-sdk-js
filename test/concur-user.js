var concur = require('../'),
    config = require('config'),
    expect = require('chai').expect;



describe('Concur User API Tests', function(){
    it('should validate the userID matches user used', function(done) {
        this.timeout(10000);
        var options = {
            oauthToken:config.get('oauthToken'),
            loginId:config.get('username')
        }

        concur.user.get(options)
        .then(function(user) {
            expect(user.LoginId).to.equal(config.get('username'));
            done();
        })
        .fail(function(error) {
            console.log("Getting an OAuth token failed: ", error);
        });
    });
});