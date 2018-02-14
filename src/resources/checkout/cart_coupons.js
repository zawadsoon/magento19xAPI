/**
 * Allows you to add and remove coupon codes for a shopping cart.
 */

module.exports = cart_coupon = {

    /**
     * Allows you to add a coupon code for a shopping cart (quote). The shopping cart must not be empty.
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {string} couponCode - Coupon code
     * @param {string} store - store view ID or code (optional)
     * @return {boolean} - True if the coupon code is added
     */

    shoppingCartCouponAdd: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
            'couponCode': 'string',
        },
        optionals: {
            'store': 'string',
        },
        origin: [],
    },

    /**
     * Allows you to remove a coupon code from a shopping cart (quote).
     * @param {string} sessionId - Session ID
     * @param {int} quoteId - Shopping cart ID (quote ID)
     * @param {string} store - store view ID or code (optional)
     * @return {boolean} - True if the coupon code is added
     */
    shoppingCartCouponRemove: {
        mandatory: {
            'sessionId': 'string',
            'quoteId': 'int',
        },
        optionals: {
            'store': 'string',
        },
        origin: [],
    }

};