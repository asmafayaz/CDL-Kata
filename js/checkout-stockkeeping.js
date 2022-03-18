// Responsible for managing stock keeping units. a set of stock items with price details and discount pricing rules

// Uses module pattern to encapsulate code and not pollute global namespace

(function() {
    "use strict";
    var stockKeepingUnits;

    stockKeepingUnits = (function() {
        var units;

        units = {};

        return {
            set: function(obj) {
                units = obj;
            },
            get: function() {
                return units;
            },
            addUnit: function(key, obj) {
                units[key] = obj;
            },
            setUnitProperty: function(key, property, value) {
                units[key][property] = value;
            },
            getUnit: function(key) {
                return units[key];
            },
            count: function() {
                return Object.keys(units).length;
            },
            clear: function() {
                units = {};
            }
        };
    }());

    if (typeof module === "undefined") {
        lateRooms.kata.checkout.stockKeepingUnits = stockKeepingUnits;
    } else {
        module.exports = stockKeepingUnits;
    }

}());