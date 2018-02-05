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
    return fetch(this.apiUrl, {
        method: 'POST',
        headers: {...this.headers, 'Content-Length': body.length},
        body: body
    }).then(response => response.text()).then(this.middleware);
};

/**
 * Check if session parameter is undefined.
 * If is undefined then tries to get session from class sessionId property.
 */
Magento19xAPI.prototype.checkSessionId = function (sessionId) {
    if (typeof sessionId !== 'undefined')
        return sessionId;

    if (this.sessionId !== null)
        return this.sessionId;

    throw new Exception.MissingSessionIdException();
};

/**
 * Allows you to create an empty shopping cart.
 * @param sessionId {number} - Session ID
 * @param storeId {number} - Store view ID or code (optional)
 * @returns {number} - ID of the created empty shopping cart
 */
Magento19xAPI.prototype.shoppingCartCreate = function (sessionId, storeId) {
    sessionId = this.checkSessionId (sessionId);
};

/**
 * Start the API session, return the session ID, and authorize the API user.
 * @param apiUser
 * @param apiKey
 * @return {Promise} - Session ID
 */
Magento19xAPI.prototype.login = function (apiUser, apiKey) {
    let self = this;
    let body = XML.build(
        'login',
        XML.parts.variable.string('username', apiUser) +
        XML.parts.variable.string('apiKey', apiKey)
    );

    return this.post(body).then(function (body) {
        return(this.sessionId = self.parse(body)['ns1:loginResponse'].loginReturn);
    });
};

module.exports = Magento19xAPI;