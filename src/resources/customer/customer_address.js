/**
 * Allows you to create, retrieve, update, and delete address data for a required customer.
 */

module.exports = customer_address = {

    /**
     * Retrieve the list of customer addresses.
     * @param {string} sessionId - Session ID
     * @param {int} customerId - Customer ID
     * @return {array} result - Array of customeAddressEntity
     */
    customerAddressList : {
        mandatory: {
            sessionId: 'string',
            customerId: 'int'
        },
        optionals: {},
        origin: ['ns1:customerAddressListResponse', 'result'],
    },

    /**
     * Create a new address for the customer
     * @param {string} sessionId - Session ID
     * @param {int} customerId - Customer ID
     * @param {array} addressdata - Array of customerAddressEntityCreate
     * @return {int} result - ID of the created customer address
     */
    customerAddressCreate: {
        mandatory: {
            sessionId: 'string',
            customerId: 'int',
            addressdata: 'custom',
        },
        optionals: {},
        origin: []
    },

    /**
     * Retrieve information about the required customer address
     * @param {string} sessionId - Session ID
     * @param {int} addressId - Address ID
     * @return {array} info - Array of customerAddressEntityItem
     */
    customerAddressInfo: {
        mandatory: {
            sessionId: 'string',
            addressId: 'int',
        },
        optionals: {},
        origin: [],
    },

    /**
     * Update address data of the required customer
     * @param {string} sessionId - Session ID
     * @param {int} customerId - Customer ID
     * @param {array} addressdata - Array of customerAddressEntityCreate
     * @return {boolean} - True if the customer addresss is updated
     */
    customerAddressUpdate: {
        mandatory: {
            sessionId: 'string',
            addressId: 'int',
            addressdata: 'custom',
        },
        optionals: {},
        origin: []
    },

    /**
     * Delete the required customer address.
     * @param {string} sessionId - Session ID
     * @param {int} addressId - Address ID
     * @return {boolean} - True if the customer address is deleted
     */
    customerAddressDelete: {
        mandatory: {
            sessionId: 'string',
            addressId: 'int',
        },
        optionals: {},
        origin: [],
    }

};