/**
 * Allows you to retrieve and set payment methods for a shopping cart
 */

module.exports = cart_payment = {

    /**
     * Allows you to set a payment method for a shopping cart (quote)
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {array} method - Array fo shoppingCartPaymentMethodEntity
     * @param {string} store - Store view ID or code (optional)
     * @return {boolean} - True on success
     */
    shoppingCartPaymentMethod: {
        mandatory: {
            sessionId: 'string',
            quoteId: 'int',
            method: 'custom'
        },
        optionals: {
            'store': 'string',
        },
        origin: ['ns1:shoppingCartPaymentMethodResponse', 'result']
    },

    /**
     * Allows you to retrieve a list of available payment methods for a shopping cart (quote)
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {string} store - Store view ID or code (optional)
     * @return {array} result - Array of hoppingCartPaymentMethodReponseEntity
     */

    shoppingCartPaymentList: {
        mandatory: {
            sessionId: 'string',
            quoteId: 'int',
        },
        optionals: {
            store: 'string'
        },
        origin: ['ns1:shoppingCartPaymentListResponse', 'result', 'item'],
    }


};