const buildArrayOfStrings = (name, arr) => {
    let nodes = '', counter = 0;

    for (let i = 0; i < arr.length; i++, counter++)
        nodes += '<item xsi:type="xsd:string">'+arr[i]+'</item>';

    return '<'+name+' SOAP-ENC:arrayType="xsd:string['+counter+']" xsi:type="ns1:ArrayOfString">'+nodes+'</'+name+'>';
};

const buildParameters = (params, required) => {
    let nodes = '';

    for (let key in required) {
        if (!params.hasOwnProperty(key)) continue;

        if (typeof params[key] !== 'undefined') {
            if (required[key] === 'ArrayOfString')
                nodes += buildArrayOfStrings(key, params[key]);
            else
                nodes += '<' + key + ' xsi:type="xsd:' + required[key] + '">' + params[key] + '</' + key + '>';

        }
    }

    return nodes;
};

const customerAddressEntityCreate = (name, params) => {
    const required = {
        city: 'string',
        company: 'string',
        country_id: 'string',
        fax: 'string',
        firstname: 'string',
        lastname: 'string',
        middlename: 'string',
        postcode: 'string',
        prefix: 'string',
        region_id: 'int',
        region: 'string',
        street: 'ArrayOfString',
        suffix: 'string',
        telephone: 'string',
        is_default_billing: 'boolean',
        is_default_shipping: 'boolean',
    };

    let nodes = buildParameters(params, required);
    return '<'+name+' xsi:type="ns1:customerAddressEntityCreate">'+nodes+'</'+name+'>';
};

const customerCustomerEntityToCreate = (name, params) => {
    const required = {
        email: 'string',
        firstname: 'string',
        lastname: 'string',
        middlename: 'string',
        password: 'string',
        website_id: 'int',
        store_id: 'int',
        group_id: 'int',
        prefix: 'string',
        suffix: 'string',
        dob: 'string',
        taxvat: 'string',
        gender: 'int',
    };

    let nodes = buildParameters(params, required);
    return '<'+name+' xsi:type="ns1:customerCustomerEntityToCreate">'+nodes+'</'+name+'>';
};

const shoppingCartCustomerEntity = (name, params) => {
    const required = {
        mode: 'string',
        customer_id: 'int',
        email: 'string',
        firstname: 'string',
        lastname: 'string',
        password: 'string',
        confirmation: 'string',
        website_id: 'int',
        store_id: 'int',
        group_id: 'int',
    };

    let nodes = buildParameters(params, required);
    return '<'+name+' xsi:type="ns1:shoppingCartCustomerEntity">'+nodes+'</'+name+'>';
};

const shoppingCartProductEntityArray = (name, paramsArr) => {
    const required = {
        product_id: 'string',
        sku: 'string',
        qty: 'double',
        options: 'associativeArray ',
        bundle_option: 'associativeArray',
        bundle_option_qty: 'associativeArray',
        links: 'ArrayOfString'
    };

    let nodes = paramsArr.map(params => {
        return '<item xsi:type="ns1:shoppingCartProductEntity">' + buildParameters(params, required) + '</item>';
    });

    return '<'+name+' SOAP-ENC:arrayType="ns1:shoppingCartProductEntity['+nodes.length+']" ' +
        'xsi:type="ns1:shoppingCartProductEntityArray">' + nodes + '</'+name+'>';
};

const shoppingCartCustomerAddressEntityArray = (name, paramsArr) => {
    const required = {
        mode: 'string',
        address_id: 'string',
        firstname: 'string',
        lastname: 'string',
        company: 'string',
        street: 'string',
        city: 'string',
        region: 'string',
        region_id: 'string',
        postcode: 'string',
        country_id: 'string',
        telephone: 'string',
        fax: 'string',
        is_default_billing: 'int',
        is_default_shipping: 'int',
    };

    let nodes = paramsArr.map(params => {
        return '<item xsi:type="ns1:shoppingCartCustomerAddressEntity">' + buildParameters(params, required) + '</item>';
    });

    return '<'+name+' xsi:type="ns1:shoppingCartCustomerAddressEntityArray" ' +
        'soapenc:arrayType="ns1:shoppingCartCustomerAddressEntity['+nodes.length+']">'+nodes+'</'+name+'>';
};

const shoppingCartPaymentMethodEntity = (name, params) => {
    const required = {
        po_number: 'string',
        method: 'string',
        cc_cid: 'string',
        cc_owner: 'string',
        cc_number: 'string',
        cc_type: 'string',
        cc_exp_year: 'string',
        cc_exp_month: 'string',
    };

    let nodes = buildParameters(params, required);
    return '<'+name+' xsi:type="urn:shoppingCartPaymentMethodEntity">' + nodes + '</' + name + '>';
};

module.exports = {
    buildArrayOfStrings: buildArrayOfStrings,
    buildParameters: buildParameters,
    customerAddressEntityCreate: customerAddressEntityCreate,
    customerCustomerEntityToCreate: customerCustomerEntityToCreate,
    shoppingCartCustomerEntity: shoppingCartCustomerEntity,
    shoppingCartProductEntityArray: shoppingCartProductEntityArray,
    shoppingCartCustomerAddressEntityArray: shoppingCartCustomerAddressEntityArray,
    shoppingCartPaymentMethodEntity: shoppingCartPaymentMethodEntity
};