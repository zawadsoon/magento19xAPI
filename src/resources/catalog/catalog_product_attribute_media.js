/**
 * Allows you to retrieve product attributes and options
 */

module.exports = catalog_product_attribute_media = {

    /**
     * Allows you to retrieve the list of product images.
     * @param {string} sessionId - Session ID
     * @param {string} product\productId - Product ID or SKU
     * @param {string} storeView - Store view ID or code (optional)
     * @param {string} identifierType - Defines whether the product ID or sku is passed in the 'product' parameter
     */
    catalogProductAttributeMediaList: {
        mandatory: {
            'sessionId': 'string',
        },
        optionals: {
            'product': 'string',
            'storeView': 'string',
            'identifierType': 'string',
        },
        origin: ['ns1:catalogProductAttributeMediaListResponse', 'result', 'item']
    },
}