/**
 * Allows you to retrieve a list of countries.
 */
module.exports = direcotry_country = {

    /**
     * Retrieve the list of countries from Magento.
     * @param {string} sessionId - Session ID
     * @return {array} An array of directoryCountryEntity
     */
    directoryCountryList: {
        mandatory: {
            sessionId: 'string',
        },
        optionals: {},
        origin: ['ns1:directoryCountryListResponse', 'countries', 'item']
    },

    /**
     * Retrieve the list of regions in the specified country.
     * @param {string} sessionId - session ID
     * @param {string} country - Country code in ISO2 or ISO3
     * @return {array} An array of directoryRegionEntity
     */
     directoryRegionList: {
        mandatory: {
            sessionId: 'string',
            country: 'string'
        },
        optionals: {},
        origin: ['ns1:directoryRegionListResponse', 'countries', 'item' ],
     }

};