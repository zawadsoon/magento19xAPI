/**
 * Allows you to retrieve and set shipping methods for a shopping cart.
 */

module.exports = cart_product = {

    /** Allows you to set a shipping method for a shopping cart (quote).
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {string} method - Shipping method code
     * @param {string} storeId - Store view ID or code (optional)
     * @return {boolean} result - True if the shipping method is set
     */
    shoppingCartShippingMethod: {
        mandatory: {
            sessionId: 'string',
            quoteId: 'int',
            method: 'string',
        },
        optionals: {
            storeId: 'string'
        },
        origin: []
    },

    /**
     * Allows you to retrieve the list of available shipping methods for a shopping cart (quote)
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {string} storeId - Store view ID or code (optional)
     * @return {boolean} result - Array of shoppingCartShippingMethodEntity
     */
    shoppingCartShippingList: {
        mandatory: {
            sessionId: 'string',
            quoteId: 'int',
        },
        optionals: {
            storeId: 'string',
        },
        origin: []
    }

};