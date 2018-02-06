const Magento19xAPI = require('../src/magento19xapi');
const config = require('../config');

describe("Test basic methods", function() {

    it("login method returns sessionId that is type of string", function(done){
        let magento = new Magento19xAPI (config.apiUrl, config.headers);
        magento.login(config.username, config.apiKey).then((sessionId) => {
            expect(typeof sessionId).toBe('string');
            done();
        });
    });

});

describe("Test if can call API methods", function() {
    let magento;

    beforeAll(function(done) {
        magento = new Magento19xAPI (config.apiUrl, config.headers);
        magento.login(config.username, config.apiKey).then((sessionId) => done());
    });

    describe("Cart", function() {

        it("shoppingCartCreate should return quoteId that is type of number", function (done) {
            magento.shoppingCartCreate().then((quoteId) => {
                expect(typeof quoteId).toBe('number');
                done();
            });
        });

        it("shoppingCartInfo should return restult that is type of object", function (done) {
            magento.shoppingCartCreate().then((quoteId) => {
                return magento.shoppingCartInfo({'quoteId':quoteId});
            }).then((result) => {
                expect(typeof result).toBe('object');
                done();
            });
        });

    });
});