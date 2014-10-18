var xml2js = require('xml2js');
var _ = require('underscore');

module.exports.getCleansedObjectFromXmlBody = function (xmlBody, callback){
    if (!callback || typeof xmlBody !== "string" || xmlBody === ""){
        callback && callback("invalid input", null);
        return;
    }

    var cleanseXmlObject = function (obj){   
        // collapse unnecessary arrays since every level of XML is returned in an array
        while (_.isArray(obj) && obj.length === 1){
            obj = obj[0];
        }

        if (typeof obj === "object"){
            _.keys(obj).forEach(function (item){
                obj[item] = cleanseXmlObject(obj[item]);
            });
        }

        return obj;
    };

    xml2js.parseString (xmlBody, function (err, result){
        callback(err, !err && cleanseXmlObject(result));
    });

    return true;
};
