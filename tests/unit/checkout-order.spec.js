describe("Tests for checkout-orders module", function() {

    "use strict";

    var order;
    var expect;

    beforeEach(function() {
        if (typeof(module) === "undefined") {
            expect = chai.expect;
            order = lateRooms.kata.checkout.order;
        } else {
            expect = require("chai").expect;
            order = require("../../js/checkout-order");
        }
    });

    afterEach(function() {
        order.clear();
    });

    it("Add single order", function() {
        var key;

        key = "A";

        order.add(key);

        expect(order.count()).to.equal(1);
    });

    it("Add multiple orders", function() {

        order.add("A").add("B");

        expect(order.count()).to.equal(2);
    });

    it("Get order item", function() {
        var key1;
        var key2;
        var key3;

        key1 = "A";
        key2 = "B";
        key3 = "C";

        order.add(key1).add(key3).add(key2).add(key1).add(key1).add(key3);

        expect(order.getItem(key1)).to.equal(3);
        expect(order.getItem(key2)).to.equal(1);
        expect(order.getItem(key3)).to.equal(2);
    });

    it("Remove order item", function() {

        order.add("A").add("B").remove("B");

        expect(order.count()).to.equal(1);
    });

    it("Get all orders", function() {
        var key1;
        var key2;
        var ordered;

        key1 = "A";
        key2 = "B";

        order.add(key1);
        order.add(key2);

        ordered = order.get();

        expect(Object.keys(ordered)[0]).to.equal(key1);
        expect(Object.keys(ordered)[1]).to.equal(key2);
    });

    it("Count orders with key", function() {
        var key1;
        var key2;
        var key3;

        key1 = "A";
        key2 = "B";
        key3 = "C";

        order.add(key1).add(key2).add(key1).add(key1).add(key2).add(key3).add(key1);

        expect(order.countItem(key1)).to.equal(4);
        expect(order.countItem(key2)).to.equal(2);
        expect(order.countItem(key3)).to.equal(1);

    });

    it("Get order charge with multiple order items of same stock keeping unit", function() {
        var key1;
        var units;

        key1 = "A";

        order.add(key1).add(key1);

        units = {
            "A": {
                label: "Label for A",
                rule: {
                    params: {
                        price: 50
                    }
                }
            }
        };

        expect(order.setSKU(units).charge()).to.equal(100);
    });

    it("Get order charge with multiple order items of different stock keeping unit", function() {
        var key1;
        var key2;
        var units;

        key1 = "A";
        key2 = "B";

        units = {
            "A": {
                label: "Label for A",
                rule: {
                    params: {
                        price: 50
                    }
                }
            },
            "B": {
                label: "Label for B",
                rule: {
                    params: {
                        price: 100
                    }
                }
            }
        };

        order.add(key2).add(key1).add(key2).add(key1).add(key1).add(key1);

        expect(order.setSKU(units).charge()).to.equal(400);
    });
});