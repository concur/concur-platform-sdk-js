var concur = require('../'),
    config = require('config'),
    fs = require('fs');
    expect = require('chai').expect;



var oauthToken = config.get('oauthToken');

describe('Concur Itinerary Tests', function(){

    var itineraryid;

    it('should send a valid itinerary to the trip library', function(done) {
        fs.readFile('test/itinerarysample.xml', function(err, body) {
            if (!err) {
                concur.itinerary.send({oauthToken:oauthToken, contentType:'application/xml', body:body})
                .then(function(trip) {
                    expect(trip.Itinerary).to.have.property('id');
                    done();
                })
                .fail(function(error) {
                    console.log("fail", error);
                });
            } else {
                console.log(err);
            }
        });
    });


    it('should contain a list of trips', function(done) {
        this.timeout(10000);
        var options = {
            oauthToken:oauthToken
        };
        concur.itinerary.get(options)
        .then(function(trips) {
            expect(trips[0]).to.have.property('UserLoginId');
            expect(trips[0]).to.have.property('TripId');
            expect(trips[0]).to.have.property('id');
            expect(trips[0]).to.have.property('TripName');
            expect(trips[0]).to.have.property('StartDateLocal');
            expect(trips[0]).to.have.property('EndDateLocal');
            itineraryid = trips[0].TripId;
            done();
        })
        .fail(function(error) {
            console.log("Getting the list of trips have failed: ", error);
        });
    });

    it('should contain a single trip', function(done) {
        this.timeout(10000);
        var options = {
            oauthToken:oauthToken,
            id:itineraryid
        };
        concur.itinerary.get(options)
        .then(function(trip) {
            expect(trip.Itinerary.TripId).to.equal(itineraryid);
            done();
        })
        .fail(function(error) {
            console.log("Getting the list of trips have failed: ", error);
        });
    });

    it('should contain a single trip with the next call', function(done) {
        this.timeout(10000);
        var options = {
            oauthToken:oauthToken,
            id:itineraryid
        };
        concur.itinerary.get(options)
            .then(function(trip) {
                expect(trip.Itinerary.TripId).to.equal(itineraryid);
                done();
            })
            .fail(function(error) {
                console.log("Getting the list of trips have failed: ", error);
            });
    });



});






