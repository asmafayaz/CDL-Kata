describe("Tests for stockKeepingUnits module", function() {

    "use strict";

    var sku;
    var expect;

    if (typeof(module) === "undefined") {
        expect = chai.expect;
        sku = lateRooms.kata.checkout.stockKeepingUnits;
    } else {
        expect = require("chai").expect;
        sku = require("../../js/stockkeepingunits");
    }

    // beforeEach(function () {
    // });

    afterEach(function() {
        sku.clear();
    });

    it("Set single stock keeping unit", function() {
        var unit;
        var key;
        var label;
        var price;
        var obj;

        key = "A";
        label = "Label for " + key;
        price = 50;
        obj = {
            label: label,
            price: price
        };

        sku.addUnit(key, obj);
        expect(sku.count()).to.equal(1);

        unit = sku.getUnit("A");
        expect(unit.label).to.equal(label);
        expect(unit.price).to.equal(price);
    });

    it("Set single stock keeping unit property", function() {
        var unit;
        var key;
        var property;
        var value;
        var obj;

        key = "A";
        obj = { label: "Label for " + key, price: 50 };
        property = "price";
        value = 100;

        sku.addUnit("A", obj);
        sku.setUnitProperty(key, property, value);
        unit = sku.getUnit("A");

        expect(unit[property]).to.equal(value);
    });

    it("Set multiple stock keeping units", function() {
        var units;
        var unit;

        units = {
            A: { label: "Label for A", price: 50 },
            B: { label: "Label for B", price: 30 },
            C: { label: "Label for C", price: 20 },
            D: { label: "Label for D", price: 15 }
        };

        sku.set(units);
        expect(sku.count()).to.equal(4);

        unit = sku.getUnit("A");
        expect(unit.price).to.equal(units.A.price);

        unit = sku.getUnit("C");
        expect(unit.price).to.equal(units.C.price);
    });
});