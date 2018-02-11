/**
 * Allows you to manage products in a shopping cart.
 */
module.exports = cart = {

    /**
     * Allows you to add one or more products to the shopping cart (quote).
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {custom} productsData - An array with the list of shoppingCartProductEntity
     * @param {storeId} storeId - Store view ID or code (optional)
     * @return {int} - ID of the created empty shopping cart
     */
    shoppingCartProductAdd: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
            'productsData': 'custom'
        },
        optionals: {
            'storeId': 'string',
        },
        origin: ['ns1:shoppingCartProductAddResponse', 'result']
    },

    /**
     * Allows you to update one or several products in the shopping cart (quote).
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {custom} productsData - An array with the list of shoppingCartProductEntity
     * @param {storeId} storeId - Store view ID or code (optional)
     * @return {int} - ID of the created empty shopping cart
     */
    shoppingCartProductUpdate: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
            'productsData': 'custom'
        },
        optionals: {
            'storeId': 'string',
        },
        origin: []
    },

    /**
     * Allows you to remove one or several products from a shopping cart (quote).
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {custom} productsData - An array with the list of shoppingCartProductEntity
     * @param {storeId} storeId - Store view ID or code (optional)
     * @return {int} - ID of the created empty shopping cart
     */
    shoppingCartProductRemove: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
            'productsData': 'custom'
        },
        optionals: {
            'storeId': 'string',
        },
        origin: []
    },

    /**
     * Allows you to retrieve the list of products in the shopping cart (quote).
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {storeId} storeId - Store view ID or code (optional)
     * @return {int} - ID of the created empty shopping cart
     */
    shoppingCartProductList: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
        },
        optionals: {
            'storeId': 'string',
        },
        origin: ['ns1:shoppingCartProductListResponse', 'result', 'item']
    },

    /**
     * Allows you to move products from the current quote to a customer quote.
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {custom} productsData - An array with the list of shoppingCartProductEntity
     * @param {store} store - Store view ID or code (optional)
     * @return {int} - ID of the created empty shopping cart
     */
    shoppingCartProductMoveToCustomerQuote: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
            'productsData': 'custom'
        },
        optionals: {
            'store': 'string',
        },
        origin: []
    }

};