describe("Tests for checkout-billing module", function() {

    "use strict";

    var sku;
    var order;
    var bill;
    var expect;

    beforeEach(function() {
        if (typeof(module) === "undefined") {
            expect = chai.expect;
            sku = lateRooms.kata.checkout.stockKeepingUnits;
            order = lateRooms.kata.checkout.order;
            bill = lateRooms.kata.checkout.billing;
        } else {
            expect = require("chai").expect;
            sku = require("../../js/checkout-stockkeepingunits");
            order = require("../../js/checkout-order");
            bill = require("../../js/checkout-billing");
        }
    });

    afterEach(function() {
        order.clear();
        sku.clear();
        bill.clear();
    });

    it("Calculating a simple bill with single item type in order, no discounts", function() {
        var key1;

        key1 = "A";

        sku.set({ "A": { label: "Label for A", price: 50 } });

        order.setSKU(sku.get()).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(100);
    });

    it("Calculating a simple bill with multiple item type in order, no discounts", function() {
        var key1;
        var key2;
        var key3;

        key1 = "A";
        key2 = "B";
        key3 = "C";

        sku.set({
            "A": { label: "Label for A", price: 50 },
            "B": { label: "Label for B", price: 30 },
            "C": { label: "Label for C", price: 15 }
        });

        order.setSKU(sku.get()).add(key1).add(key2).add(key1).add(key1).add(key3);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(195);
    });

    it("Calculating a bill with single item type in order, with discount but discount limit not reached", function() {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function() {
                        return 45;
                    },
                    limit: 3
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(100);
    });

    it("Calculating a bill with single item type in order, with discount and discount limit reached", function() {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function() {
                        return 130 / 3;
                    },
                    limit: 3
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(130);
    });

    it("Calculating a bill with single item type in order, with discount and discount limit exceeded", function() {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function() {
                        return 130 / 3;
                    },
                    limit: 3
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(230);
    });

    it("Calculating a bill with single item type in order, with discount and discount limit exceeded twice", function() {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function() {
                        return 130 / 3;
                    },
                    limit: 3
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(260);
    });

    it("Calculating a bill with two item types in order, with and without discount and discount limit exceeded", function() {
        var key1;
        var key2;

        key1 = "A";
        key2 = "B";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function() {
                        return 130 / 3;
                    },
                    limit: 3
                }
            },
            "B": {
                label: "Label for B",
                price: 30,
                discount: {
                    price: function() {
                        return 45 / 2;
                    },
                    limit: 2
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key2).add(key1).add(key1).add(key2).add(key2).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(255);

    });

    it("Calculating a bill with four item types in order, with and without discount and discount limit exceeded", function() {
        var key1;
        var key2;
        var key3;
        var key4;

        key1 = "A";
        key2 = "B";
        key3 = "C";
        key4 = "D";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function() {
                        return 130 / 3;
                    },
                    limit: 3
                }
            },
            "B": {
                label: "Label for B",
                price: 30,
                discount: {
                    price: function() {
                        return 45 / 2;
                    },
                    limit: 2
                }
            },
            "C": {
                label: "Label for C",
                price: 20
            },
            "D": {
                label: "Label for D",
                price: 15
            }
        });

        order.setSKU(sku.get()).add(key1).add(key2).add(key1).add(key1).add(key2).add(key2).add(key1).add(key4).add(key3).add(key4).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(355);
    });

    it("Calculating a simple bill with single item type in order", function() {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                rule: {
                    params: {
                        price: 25
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(75);
    });

    it("Calculating a simple bill with multiple item types in order", function() {
        var key1;
        var key2;

        key1 = "A";
        key2 = "B";

        sku.set({
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
                        price: 10
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key2).add(key1).add(key2).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(220);
    });

    it("Calculating a simple bill with single item type in order", function() {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                rule: {
                    params: {
                        fullPrice: 25,
                        discountPrice: 20,
                        discountLimit: 4
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(75);
    });

    it("Calculating a simple bill with single item type in order", function() {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                rule: {
                    params: {
                        fullPrice: 25,
                        discountPrice: 20,
                        discountLimit: 4
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(80);
    });

    it("Calculating a simple bill with single item type in order", function() {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                rule: {
                    params: {
                        fullPrice: 25,
                        discountPrice: 20,
                        discountLimit: 4
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(130);
    });

    it("Calculating a simple bill with single order item", function() {
        var key1;

        key1 = "A";

        sku.set({ "A": { label: "Label for A", price: 50 } });

        order.setSKU(sku.get()).add(key1).add(key1);

        bill.addCharge("order", order.charge());

        expect(bill.get()).to.equal(105);
    });
});