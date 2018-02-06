/**
 * Allows you to manage shopping carts.
 */
module.exports = cart = {

    /**
     * Allows you to create an empty shopping cart.
     * @param {string} sessionId - Session ID
     * @param {string} storeId - Store view ID or code (optional)
     * @return {int} - ID of the created empty shopping cart
     */
    shoppingCartCreate: {
        mandatory: {
            'sessionId': 'string',
        },
        optionals: {
            'storeId': 'string',
        },
        origin: ['ns1:shoppingCartCreateResponse', 'quoteId']
    },

    /**
     * Allows you to retrieve full information about the shopping cart (quote).
     * @param {string} sessionId - Session ID
     * @param {int} quoteId	- Shopping cart ID (quote ID)
     * @param {string} store - Store view ID or code (optional)
     */
    shoppingCartInfo: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
        },
        optionals: {
            'storeId': 'string',
        },
        origin: ['ns1:shoppingCartInfoResponse', 'result']
    },

    /**
     * Allows you to retrieve total prices for a shopping cart (quote).
     * @param {string} sessionId -Session ID
     * @param {int} quoteId - Shopping cart ID (quote identifier)
     * @param {string} store - Store view ID or code (optional)
     */
    shoppingCartTotals: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
        },
        optionals: {
            'storeId': 'string',
        },
        origin: ['ns1:shoppingCartTotalsResponse', 'result', 'item']
    },

    /**
     * Allows you to create an order from a shopping cart (quote).
     * Before placing the order, you need to add the customer, customer address, shipping and payment methods.
     * @param {string} sessionId -Session ID
     * @param {int} quoteId - Shopping cart ID (quote identifier)
     * @param {string} store - Store view ID or code (optional)
     * @param {ArrayOfString} licenses - Website license ID (optional)
     */
    shoppingCartOrder: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
            'storeId': 'string',
        },
        optionals: {
            'licenses': 'stringArray'
        },
        origin: []
    },

    /**
     * Allows you to retrieve the website license agreement for
     * the quote according to the website (store).
     * @param {string} sessionId -Session ID
     * @param {int} quoteId - Shopping cart ID (quote identifier)
     * @param {string} store - Store view ID or code (optional)
     */
    shoppingCartLicense: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
        },
        optionals: {
            'storeId': 'string',
        },
        origin: ['ns1:shoppingCartLicenseResponse', 'result']
    }

};