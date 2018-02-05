const Exception = require("./magento-exceptions");
const XML = require("./magento-xml");
const XMLParser = require("./magento-parser");
const fetch = require('node-fetch');

/**
 * Privides method to communicate with Magento 1.9.x SOAP API
 * @param apiUrl - SOAP API url (without &wsdl=1)
 * @param headers - Additional headers added to request (remember 'Host' property is required)
 * @param middleware - Addidtional function that will be called before response will be passed to parse.
 * Function takes as argument request response and should return this response or throw error.
 * @constructor
 */
function Magento19xAPI (apiUrl, headers, middleware) {

    if (typeof apiUrl === 'undefined')
        throw new Exception.MissingApiUrlException();

    if (typeof headers === 'undefined' || typeof headers.Host === 'undefined')
        throw new Exception.MissingApiHostException();

    this.sessionId = null;
    this.apiUrl = apiUrl;
    this.middleware = typeof middleware === 'function' ? middleware : function (obj) {
        return obj
    };

    this.headers = {
        'Accept-Encoding': 'gzip,deflate',
        'Connection': 'Keep-Alive',
        'Content-Type': 'text/xml;charset=utf-8',
        'Host': '',
        'SOAPAction': "urn:Mage_Api_Model_Server_V2_HandlerAction",
        ...headers
    };

    let parser = new XMLParser();
    this.parse = (xml) => parser.parse(xml);
}

/**
 * Wrapas fetch method to simplify code
 * @param body {string} - request body
 * @return {Promise} - fetch result
 */
Magento19xAPI.prototype.post = function (body) {
    let self = this;

    return fetch(this.apiUrl, {
        method: 'POST',
        headers: {...this.headers, 'Content-Length': body.length},
        body: body
    }).then((response) => {
        return (self.middleware(response)).text();
    }).then((body) => {
        let result = self.parse(body);

        //TODO catch special errors e.g Session Expire
        //Before pass data, check if magento return fault.
        if (typeof result['SOAP-ENV:Fault'] !== 'undefined')
            throw new Exception.MagentoFaultException(result['SOAP-ENV:Fault'].faultcode, result['SOAP-ENV:Fault'].faultstring);

        return result;
    });
};

/**
 * Check if session parameter is undefined.
 * If is undefined then tries to get session from class sessionId property.
 */
Magento19xAPI.prototype.checkSessionId = function (sessionId) {
    if (typeof sessionId !== 'undefined' && sessionId !== null)
        return sessionId;

    if (this.sessionId !== null)
        return this.sessionId;

    throw new Exception.MissingSessionIdException();
};

/**
 * Allows you to create an empty shopping cart.
 * @param sessionId {number} - Session ID
 * @param storeId {number} - Store view ID or code (optional)
 * @returns {Promise} - resolev(quoteId), ID of the created empty shopping cart
 */
Magento19xAPI.prototype.shoppingCartCreate = function (sessionId, storeId) {
    let body = XML.build('shoppingCartCreate', [
        XML.parts.variable.string('sessionId', this.checkSessionId (sessionId)),
        XML.parts.variable.string('storeId', storeId)
    ]);

    return this.post(body).then(function (result) {
        return(result['ns1:shoppingCartCreateResponse'].quoteId);
    });
};

/**
 * Allows you to create an order from a shopping cart (quote).
 * Before placing the order, you need to add the customer, customer address, shipping and payment methods.
 * @param sessionId {string} - Session ID
 * @param quoteId {int} - Shopping Cart ID (quote ID)
 * @param storeId {string} - Store view ID or code (optional)
 * @param licenses {ArrayOfString} - Website license ID (optional)
 * @returns {Promise} - resolve(string), Result of creating an order
 */
Magento19xAPI.prototype.shoppingCartOrder = function (sessionId, quoteId, storeId, licenses) {
    let self = this;

    if (typeof quoteId === 'undefined')
        throw new Exception.MissingArgumentException('quoteId');

    let body = XML.build('shoppingCartOrder', [
        XML.parts.variable.string('sessionId', this.checkSessionId (sessionId)),
        XML.parts.variable.int('quoteId', quoteId),
        XML.parts.variable.string('storeId', storeId),
        XML.parts.variable.stringArray('licenses', licenses),
    ]);

    return this.post(body).then(function (result) {
        //TODO complete cart and check what is result
        console.log(self.parse(result));
        //return(self.sessionId = self.parse(body)['ns1:loginResponse'].loginReturn);
    });
};
/**
 *
 * Allows you to retrieve full information about the shopping cart (quote).
 * @param {string} sessionId - Session ID
 * @param {int}	quoteId	- Shopping cart ID (quote ID)
 * @param {string} storeId - Store view ID or code (optional)
 * @return {array} - resolve(), Array of shoppingCartInfoEntity
 */
Magento19xAPI.prototype.shoppingCartInfo = function (sessionId, quoteId, storeId) {
    let body = XML.build('shoppingCartInfo', [
        XML.parts.variable.string('sessionId', this.checkSessionId (sessionId)),
        XML.parts.variable.int('quoteId', quoteId),
        XML.parts.variable.string('storeId', storeId)
    ]);

    return this.post(body).then(result => result['ns1:shoppingCartInfoResponse'].result);
};

/**
 * Start the API session, return the session ID, and authorize the API user.
 * @param apiUser
 * @param apiKey
 * @return {Promise} - resolve(sessionId), Session ID
 */
Magento19xAPI.prototype.login = function (apiUser, apiKey) {
    let self = this;
    let body = XML.build('login', [
        XML.parts.variable.string('username', apiUser),
        XML.parts.variable.string('apiKey', apiKey)
    ]);

    //Remembering sessionId for future use
    return this.post(body).then(result => self.sessionId = result['ns1:loginResponse'].loginReturn);
};

module.exports = Magento19xAPI;