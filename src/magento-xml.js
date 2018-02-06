/**
 * Parts of XML required to build requests. I decided that parts will be better than XML builder
 * because of performance and flexibility.
 */

const parts = {

    root: {
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
            if (typeof value === 'undefined' || value === null) return '';
            return '<' + name + ' xsi:type="xsd:string">' + value + '</' + name + '>';
        },
        stringArray: (name, array) => {
            if (!(array instanceof Array)) return '';
            let xml = '<' + name + ' SOAP-ENC:arrayType="xsd:string[' + array.length + ']" xsi:type="ns1:ArrayOfString">';
            for (let item in array)
                xml += '<item xsi:type="xsd:string">' + item + '</item>';
            xml += '</' + name + '>';
        },
        int: (name, value) => {
            if (typeof value === 'undefined' || value === null) return '';
            return '<' + name + ' xsi:type="xsd:int">' + value + '</' + name + '>';
        },
        custom: (name, xml) => {
            return xml;
        }
    },

    method: (name, content) => {
        return '<urn:' + name + ' soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
            content + '</urn:' + name + '>';
    },

};

/**
 * Helper function that puts your XML into common header/body
 * @param customXMLArray {array} - your custom xml
 * @param method {string} - name of called method in SOAP API
 * @return {string} + full XML request
 */
function build (method, customXMLArray) {
    let customXMLString = '';

    for (let xmlPart in customXMLArray)
        customXMLString += customXMLArray[xmlPart];

    return parts.root.start + parts.header.start + parts.header.end + parts.body.start +
        parts.method(method, customXMLString) + parts.body.end + parts.root.end;
}

module.exports = {
    parts: parts,
    build: build
};