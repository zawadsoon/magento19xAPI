const Exception = require("./magento-exceptions");
const XML = require("./magento-xml");
const XMLParse = require("./magento-parser");
//const fetch = require('node-fetch');

/**
 * Privides method to communicate with Magento 1.9.x SOAP API
 * @param apiUrl - SOAP API url (without &wsdl=1)
 * @param headers - Additional headers added to request (remember 'Host' property is required)
 * @param middleware - Addidtional function that will be called before response will be passed to parse.
 * Function takes as argument request response and should return this response or throw error.
 * @param custom - Defines user custom methods, have to be like this in resources
 * @constructor
 */
function Magento19xAPI (apiUrl, headers, middleware, custom) {
    let self = this;

    //for debug purposes
    this.mocks = {};
    this.log = false;

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

    this.findNested = function (obj, nestingArray, index) {
        if (nestingArray.length === 0) return obj;
        index = (typeof index === 'undefined') ? 0 : index;
        if (index ===  nestingArray.length - 1)
            return (typeof obj[nestingArray[index]] === 'undefined') ? {} : obj[nestingArray[index]];
        else
            return self.findNested(obj[nestingArray[index]], nestingArray, ++index);
    };

    //Loading resources
    let resources = {
        catalog_category: require('./resources/catalog/catalog_category'),
        catalog_product: require('./resources/catalog/catalog_product'),
        catalog_product_attribute_media: require('./resources/catalog/catalog_product_attribute_media'),
        checkout_cart: require('./resources/checkout/cart'),
        customer_customer: require('./resources/customer/customer'),
        custom: custom,
    };

    //Iterate over methods in resources
    for (let resource in resources) {
        for (let method in resources[resource]) {
            if (!resources[resource].hasOwnProperty(method)) continue;
            let details = resources[resource][method];

            /**
             * Generic prototyped method from resources
             * @param {array} args - Argument passed to method {key: value} object
             */
            this[method] = function(args) {
                if (typeof args === 'undefined')
                    args = [];

                if (typeof details.mandatory['sessionId'] !== 'undefined' && typeof args['sessionId'] === 'undefined')
                    args['sessionId'] = self.sessionId;

                //Test mandatory arguments
                for (let name in details.mandatory) {
                    if (!details.mandatory.hasOwnProperty(name)) continue;
                    if (typeof args[name] === 'undefined')
                        throw new Exception.MissingMandatoryArgumentException(name, method);
                }

                let allArgs = {...details.mandatory, ...details.optionals};
                let xmlItems = [];

                //Iterate over all argument and create proper xml type if argument exist
                for (let name in allArgs) {
                    if (typeof args[name] !== 'undefined')
                        xmlItems.push(XML.parts.variable[allArgs[name]](name, args[name]));
                }

                let debug = {
                    method: method,
                    args: args,
                    response: '',
                    body: ''
                };

                let mock = null;
                if (typeof self.mocks[method] === 'function')
                    mock = () => self.mocks[method](args);

                return self.post(XML.build(method, xmlItems), mock, debug).then(function (result) {
                    return(self.findNested(result, details.origin));
                });
            };
        }
    }
}

/**
 * Set methods mocks
 * @param mocks - object with function that will replace resources
 */
Magento19xAPI.prototype.mockMethods = function (mocks) {
    this.mocks = mocks;
};

/**
 * Wrapas fetch method to simplify code
 * @param body {string} - request body
 * @param mock {function} - function that will return content instead of fetch
 * @param debu {object} - additional debug data
 * @return {Promise} - fetch result
 */
Magento19xAPI.prototype.post = function (body, mock, debug) {
    let self = this;
    let request = null;

    debug.body = body;
    if (typeof mock === 'function') {
        request = mock();
        debug.mock = true;
    }

    if (request === null)
        request = fetch(this.apiUrl, {
            method: 'POST',
            headers: {...this.headers, 'Content-Length': body.length},
            body: body
        }).then((response) => self.middleware(response).text());

    return request.then((body) => {
        debug.response = body;
        if (self.log) console.log(debug);
        return body;
    }).then((body) => XMLParse(body)).then((result) => {

        //TODO catch special errors e.g Session Expire
        //Before pass data, check if magento return fault.
        if (typeof result['SOAP-ENV:Fault'] !== 'undefined')
            throw new Exception.MagentoFaultException(result['SOAP-ENV:Fault'].faultcode, result['SOAP-ENV:Fault'].faultstring);

        return result;
    });
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
    return this.post(body, null, {
        method: 'login',
        args: {apiUser: apiUser, apiKey: apiKey},
        response: '',
    }).then(result => self.sessionId = result['ns1:loginResponse'].loginReturn);
};

module.exports = Magento19xAPI;