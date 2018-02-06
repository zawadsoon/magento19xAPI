/**
 * Allows you to manage shopping carts.
 */
module.exports = cart = {

    /**
     * Allows you to create an empty shopping cart.
     * {string} sessionId - Session ID
     * {string} storeId - Store view ID or code (optional)
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
    }
};