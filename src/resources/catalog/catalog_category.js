/**
 * Allows you to manage categories and how products are assigned to categories.
 */
module.exports = catalog_category = {

    /**
     * catalogCategoryLevel (SOAP V2)
     * Allows you to retrieve one level of categories by a website, a store view, or a parent category.
     * @param {string} sessionId - Session ID
     * @param {string} website - Website ID or code (optional)
     * @param {string} storeView - Store view ID or code (optional)
     * @param {string} parentCategory - Parent category ID (optional)
     */
    catalogCategoryLevel: {
        mandatory: {
            'sessionId': 'string',
        },
        optionals: {
            'website': 'string',
            'storeView': 'string',
            'parentCategory': 'string',
        },
        origin: ['ns1:catalogCategoryLevelResponse', 'tree', 'item']
    },

    /**
     * Allows you to retrieve information about the required category.
     * @param {string} sessionId - Session ID
     * @param {int} categoryId - Category ID
     * @param {string} storeView - Store view ID or code (optional)
     * @param {ArrayOfString} attributes - Array of attributes (optional)
     */
    catalogCategoryInfo: {
        mandatory: {
            'sessionId': 'string',
            'categoryId': 'int',
        },
        optionals: {
            'storeView': 'string',
            'attributes': 'stringArray',
        },
        origin: ['ns1:catalogCategoryInfoResponse', 'info']
    },

    /**
     * Retrieve the list of products assigned to a required category.
     * @param {string} sessionId - Session ID
     * @param {int} categoryId - ID of the required category
     */
    catalogCategoryAssignedProducts: {
        mandatory: {
            'sessionId': 'string',
            'categoryId': 'int',
        },
        optionals: {},
        origin: ['ns1:catalogCategoryAssignedProductsResponse', 'result', 'item']
    },
};