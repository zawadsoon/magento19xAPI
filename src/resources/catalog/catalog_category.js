/**
 * Allows you to manage categories and how products are assigned to categories.
 */
module.exports = catalog_category = {

    /**
     * catalogCategoryLevel (SOAP V2)
     * Allows you to retrieve one level of categories by a website, a store view, or a parent category.
     * {string} sessionId - Session ID
     * {string} website - Website ID or code (optional)
     * {string} storeView - Store view ID or code (optional)
     * {string} parentCategory - Parent category ID (optional)
     * @return {}
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
        origin: ['']
    }
};