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
    }
};