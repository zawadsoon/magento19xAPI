/**
 * Allows you to create, retrieve, update, and delete data about customers.
 */
module.exports = customer_customer = {

    /**
     * Allows you to retrieve the list of products.
     * @param {string} sessionId - Session ID
     * @param {array} filters - Allows you to retrieve the list of customers. (optional)
     */
    customerCustomerList: {
        mandatory: {
            'sessionId': 'string',
        },
        optionals: {
            'filters': 'custom',
        },
        origin: ['ns1:customerCustomerListResponse', 'storeView', 'item']
    },

    /**
     * Create a new customer.
     * @param {string} sessionId - Session ID
     * @param {array} customerData - Array of customerCustomerEntityToCreate
     */
    customerCustomerCreate: {
        mandatory: {
            'sessionId': 'string',
            'customerData': 'custom'
        },
        optionals: {},
        origin: []
    },

    /**
     * Retrieve information about the specified customer.
     * @param {string} sessionId - Session ID
     * @param {string} customerId - ID of the required customer
     * @param {array} attributes - Array of attributes (defines attrs that will be returned)
     */
    customerCustomerInfo: {
        mandatory: {
            'sessionId': 'string',
            'customerId': 'int'
        },
        optionals: {
            'attributes': 'custom',
        },
        origin: ['ns1:customerCustomerInfoResponse', 'customerInfo']
    },

    /**
     * Update information about the required customer.
     * Note that you need to pass only those arguments which you want to be updated.
     * @param {string} sessionId - Session ID
     * @param {string} customerId - ID of the required customer
     * @param {array} customerData - Array of customerCustomerEntityToCreate
     */
    customerCustomerUpdate: {
        mandatory: {
            'sessionId': 'string',
            'customerId': 'int',
            'customerData': 'custom',
        },
        optionals: {},
        origin: []
    },

    /**
     * Delete the required customer.
     * @param {string} sessionId - Session ID
     * @param {string} customerId - ID of the required customer
     */
    customerCustomerDelete: {
        mandatory: {
            'sessionId': 'string',
            'customerId': 'int',
        },
        optionals: {},
        origin: []
    }
};