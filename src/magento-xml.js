/**
 * Parts of XML required to build requests. I decided that parts will be better than XML builder
 * because of performance and flexibility.
 */

const parts = {

    root: {
        // language=XML
        start: '' +
        '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
            'xmlns:urn="urn:Magento">',
        end: '</soapenv:Envelope>',
    },

    header: {
        start: '<soapenv:Header>',
        end: '</soapenv:Header>',
    },

    body: {
        start: '<soapenv:Body>',
        end: '</soapenv:Body>'
    },

    variable: {
        string: (name, value) => {
            return '<' + name + ' xsi:type="xsd:string">' + value + '</' + name + '>';
        }
    },

    method: (name, content) => {
        // language=XML
        return '<urn:' + name + ' soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' + content + '</urn:' + name + '>';
    },

};

/**
 * Helper function that puts your XML into common header/body
 * @param customXMLString {string} - your custom xml
 * @param method {string} - name of called method in SOAP API
 * @return {string} + full XML request
 */
function build (method, customXMLString) {
    return parts.root.start + parts.header.start + parts.header.end + parts.body.start + parts.method(method, customXMLString) + parts.body.end + parts.root.end;
}

module.exports = {
    parts: parts,
    build: build
};