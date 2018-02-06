/**
 * Allows you to manage products.
 */
module.exports = catalog_product = {

    /**
     * Allows you to retrieve the list of products.
     * @param {string} sessionId - Session ID
     * @param {array} filters - Array of filters by attributes (optional)
     * @param {string} storeView - Store view ID or code (optional)
     */
    catalogProductList: {
        mandatory: {
            'sessionId': 'string',
        },
        optionals: {
            'filters': 'custom',
            'storeView': 'string',
        },
        origin: ['ns1:catalogProductListResponse', 'storeView', 'item']
    },

    /**
     * Allows you to retrieve information about the required product.
     * {string} sessionId - Session ID
     * {string} productId - Product ID or SKU
     * {string} storeView - Store view ID or code (optional)
     * {array} attributes - Array of catalogProductRequestAttributes (optional)
     * {string} identifierType - Defines whether the product ID or SKU value is passed in the "productId" parameter. (optional)
     */

    catalogProductInfo: {
        mandatory: {
            'sessionId': 'string',
            'productId': 'string',
        },
        optionals: {
            'storeView': 'string',
            'attributes': 'custom',
            'identifierType': 'string'
        },
        origin: ['ns1:catalogProductInfoResponse', 'info']
    },

};