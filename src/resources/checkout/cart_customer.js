/**
 * Allows you to add customer information and addresses into a shopping cart
 */

module.exports = cart_customer = {

    /**
     * Allows you to add information about the customer to a shopping cart (quote)
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {array} customerData - Array of shoppingCartCustomerEntity
     * @param {store} store - Store view ID or code (optional)
     * @return {boolean} result - True if information is added
     */
    shoppingCartCustomerSet: {
        mandatory: {
            sessionId: 'string',
            quoteId: 'int',
            customerData: 'custom',
        },
        optionals: {
            store: 'string',
        },
        origin: ['ns1:shoppingCartCustomerSetResponse', 'result'],
    },

    /**
     * Allows you to set the customer addresses in the shopping cart (quote)
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {array} customerDataAddress - Array of shoppingCartCustomerAddressEntity
     * @param {store} store - Store view ID or code (optional)
     * @return {boolean} result - True if address is set
     */
    shoppingCartCustomerAddresses: {
        mandatory: {
            sessionId: 'string',
            quoteId: 'int',
            customerAddressData : 'custom',
        },
        optionals: {
            store: 'string',
        },
        origin: [],
    }

};