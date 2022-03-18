// Responsible for calculating the price of an order given items in an order and pricing defined in stock keeping units, including any applicable discount

// Uses module pattern to encapsulate code and reduce pollution of global namespace and module also acts to decouple dependency between order and stock keeping units
// Uses dependency injection to expose order and stock keeping unit methods

(function() {
    "use strict";
    var billing;

    billing = (function() {
        var bill;
        var charges;
        var calculateBill;

        bill = 0;
        charges = {};

        calculateBill = function() {
            var result;
            result = 0;
            Object.keys(charges).forEach(function(key) {
                result += charges[key];
            });
            return result;
        };

        return {
            addCharge: function(key, value) {
                charges[key] = value;
                return this;
            },
            //            setCharges: function (obj) {
            //                charges = obj;
            //                return this;
            //            },
            get: function() {
                return bill;
            },
            update: function() {
                bill = calculateBill();
                return this;
            },
            clear: function() {
                bill = null;
                return this;
            }
        };
    }());

    if (typeof module === "undefined") {
        fruits.kata.checkout.billing = billing;
    } else {
        module.exports = billing;
    }

}());