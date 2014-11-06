var concur = require('../'),
    assert = require('chai').assert;

var testXml = '<?xml version="1.0"?>'+
    '<Itinerary xmlns="http://www.concursolutions.com/api/travel/trip/2010/06">'+
        '<TripName>Kitten Comfort Rescue</TripName>'+
        '<StartDateLocal>2015-01-30T03:47:14</StartDateLocal>'+
        '<EndDateLocal>2015-02-06T03:47:14</EndDateLocal>'+
        '<Bookings>'+
            '<Booking>'+
                '<Segments>'+
                    '<Hotel>'+
                        '<Status>HK</Status>'+
                        '<StartCityCode>SJC</StartCityCode>'+
                        '<StartDateLocal>2015-01-30T07:47:14</StartDateLocal>'+
                        '<EndDateLocal>2015-01-06T03:47:14</EndDateLocal>'+
                        '<Name>ALoft Cupertino</Name>'+
                        '<RecordLocator>Hotel Locator</RecordLocator>'+
                        '<RoomDescription>1 KING BED ACCESSIBLE ROOM - K1RRC</RoomDescription>'+
                        '<Currency>USD</Currency>'+
                        '<CancellationPolicy>Cxl 1 day prior to Arrival</CancellationPolicy>'+
                        '<DailyRate>240.3500</DailyRate>'+
                        '<NumRooms>1</NumRooms>'+
                        '<NumPersons>1</NumPersons>'+
                        '<RateCode>LV4</RateCode>'+
                        '<Charges>'+
                            '<Rate>'+
                                '<Currency>USD</Currency>'+
                                '<Amount>220.00</Amount>'+
                                '<StartDatelocal>2015-01-30T07:47:14</StartDatelocal>'+
                                '<IsPrimary>false</IsPrimary>'+
                                '<SemanticsCode>ROOMRATE</SemanticsCode>'+
                                '<PerUnit>DAY</PerUnit>'+
                                '<NumUnits>3.00</NumUnits>'+
                            '</Rate>'+
                        '</Charges>'+
                    '</Hotel>'+
                '</Segments>'+
                '<RecordLocator>CodeCamp</RecordLocator>'+
                '<BookingSource>Sample Itin for CodeCamp</BookingSource>'+
                '<DateBookedLocal>2015-01-30T03:47:14</DateBookedLocal>'+
            '</Booking>'+
            '<Booking>'+
               '<Segments>'+
                    '<Air>'+
                        '<Vendor>AA</Vendor>'+
                        '<FlightNumber>425</FlightNumber>'+
                        '<StartCityCode>SEA</StartCityCode>'+
                        '<StartDateLocal>2015-01-30T03:47:14</StartDateLocal>'+
                        '<EndCityCode>SFO</EndCityCode>'+
                        '<EndDateLocal>2015-01-30T07:47:14</EndDateLocal>'+
                        '<Cabin>O</Cabin>'+
                        '<ClassOfService>O</ClassOfService>'+
                    '</Air>'+
                '</Segments>'+
                '<RecordLocator>Air Locator</RecordLocator>'+
                '<BookingSource>Sample Itin for CodeCamp</BookingSource>'+
                '<DateBookedLocal>2015-01-30T03:47:14</DateBookedLocal>'+
            '</Booking>'+
        '</Bookings>'+
    '</Itinerary>';

var expectedResults = '{"Itinerary":{'+
                        '"$":{"xmlns":"http://www.concursolutions.com/api/travel/trip/2010/06"},'+
                        '"TripName":"Kitten Comfort Rescue",'+
                        '"StartDateLocal":"2015-01-30T03:47:14",'+
                        '"EndDateLocal":"2015-02-06T03:47:14",'+
                        '"Bookings":{'+
                            '"Booking":[{'+
                                '"Segments":{'+
                                    '"Hotel":{'+
                                        '"Status":"HK",'+
                                        '"StartCityCode":"SJC",'+
                                        '"StartDateLocal":"2015-01-30T07:47:14",'+
                                        '"EndDateLocal":"2015-01-06T03:47:14",'+
                                        '"Name":"ALoft Cupertino",'+
                                        '"RecordLocator":"Hotel Locator",'+
                                        '"RoomDescription":"1 KING BED ACCESSIBLE ROOM - K1RRC",'+
                                        '"Currency":"USD",'+
                                        '"CancellationPolicy":"Cxl 1 day prior to Arrival",'+
                                        '"DailyRate":"240.3500",'+
                                        '"NumRooms":"1",'+
                                        '"NumPersons":"1",'+
                                        '"RateCode":"LV4",'+
                                        '"Charges":{'+
                                            '"Rate":{'+
                                                '"Currency":"USD",'+
                                                '"Amount":"220.00",'+
                                                '"StartDatelocal":"2015-01-30T07:47:14",'+
                                                '"IsPrimary":"false",'+
                                                '"SemanticsCode":"ROOMRATE",'+
                                                '"PerUnit":"DAY",'+
                                                '"NumUnits":"3.00"'+
                                            '}'+
                                        '}'+
                                    '}'+
                                '},'+
                                '"RecordLocator":"CodeCamp",'+
                                '"BookingSource":"Sample Itin for CodeCamp",'+
                                '"DateBookedLocal":"2015-01-30T03:47:14"'+
                            '},{'+
                                '"Segments":{'+
                                    '"Air":{'+
                                        '"Vendor":"AA",'+
                                        '"FlightNumber":"425",'+
                                        '"StartCityCode":"SEA",'+
                                        '"StartDateLocal":"2015-01-30T03:47:14",'+
                                        '"EndCityCode":"SFO",'+
                                        '"EndDateLocal":"2015-01-30T07:47:14",'+
                                        '"Cabin":"O",'+
                                        '"ClassOfService":"O"'+
                                    '}'+
                                '},'+
                                '"RecordLocator":"Air Locator",'+
                                '"BookingSource":"Sample Itin for CodeCamp",'+
                                '"DateBookedLocal":"2015-01-30T03:47:14"'+
                            '}]'+
                        '}'+
                    '}'+
                '}';

describe('Concur Utility XML Tests', function(){
    it('should parse the xml correctly', function(done) {
        concur.utils.xml.getCleansedObjectFromXmlBody(testXml, function (err, result) {
            if (err){
                assert(false, err);
            } else {
                assert.equal(JSON.stringify(result), expectedResults);
            }
            done();
        });
    });
});