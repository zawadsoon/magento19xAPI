const Parser = require('react-native-xml2js');

/**
 * Parse and flatten XML
 * @param xml - xml string
 * @return {*} parsed object
 */
XMLParse = (xml) => {
    return new Promise((resolve, reject) => {
        Parser.parseString(xml, {explicitArray: false, trim: true, ignoreAttrs: true}, (error, result) => {
            if (error) reject(error);
            resolve(result['SOAP-ENV:Envelope']['SOAP-ENV:Body']);
        });
    });
};

module.exports = XMLParse;