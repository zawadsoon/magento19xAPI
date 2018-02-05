const Parser = require('xml2json');

/**
 * Wraps parser library and additionally flatten response.
 * @param xmlValueKey - key under witch the value is presented
 * @constructor
 */
function XMLParser (xmlValueKey) {
    this.xmlValueKey = typeof xmlValueKey !== 'undefined' ? xmlValueKey : '_t';
    this.reservedKeywords = [
        'length',
    ];

    /**
     * Replaces JS keyword to avoid wired errors. Just adds _ at beggining of name
     * @param key - some key
     * @return {*} - some fixed key if keyword
     */
    this.filterReservedKeywords = function (key) {
        for (let keyword in this.reservedKeywords) {
            if (key === keyword)
                return "_" + key;
        }
        return key;
    };

    /**
     * Removes attributes from leafs and sets value as leafs.
     * (there is no something._:value but something: value, after this operation)
     * @param obj - parsed xml object
     * @return {*} - flatten xml object (removed attributes from leafs)
     */
    this.flatten = function (obj) {
        let newObj = [];

        for (let key in obj) {
            if (!obj.hasOwnProperty(key))
                continue;

            if (key === this.xmlValueKey)
                return obj[key];

            key = this.filterReservedKeywords(key);

            try {
                if (typeof obj[key] === 'object')
                    newObj[key] = this.flatten(obj[key]);
                else
                    newObj[key] = obj[key];
            } catch (exception) {
                console.error(exception, key, obj[key]);
            }
        }

        return {...newObj};
    };
}

/**
 * Parse and flatten XML
 * @param xml - xml string
 * @return {*} parsed object
 */
XMLParser.prototype.parse = function (xml) {
    let result = Parser.toJson(xml, {
        object: true,
        reversible: false,
        coerce: true,
        sanitize: true,
        trim: true,
        arrayNotation: false,
        alternateTextNode: true
    });

    return this.flatten(result['SOAP-ENV:Envelope']['SOAP-ENV:Body']);
};

module.exports = XMLParser;