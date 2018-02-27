const Magento19xAPI = require("./src/magento19xapi");
const config = require("./config");

let magento = new Magento19xAPI (config.apiUrl, config.headers);
magento.log = false;

const productInfoAttributes = '<attributes xsi:type="ns1:catalogProductRequestAttributes"><attributes SOAP-ENC:arrayType="xsd:string[1]" xsi:type="ns1:ArrayOfString"><item xsi:type="xsd:string">*</item></attributes></attributes>';

const cartProductDetails = (sku, qty) =>  '<products SOAP-ENC:arrayType="ns1:shoppingCartProductEntity[1]" xsi:type="ns1:shoppingCartProductEntityArray"><item xsi:type="ns1:shoppingCartProductEntity"><sku xsi:type="xsd:string">'+ sku +'</sku><qty xsi:type="xsd:double">'+ qty +'</qty></item></products>';
const shoppingCartCustomerEntity = (customer_id, mode) => '<customer xsi:type="urn:shoppingCartCustomerEntity"><customer_id xsi:type="xsd:int">' + customer_id + '</customer_id><mode xsi:type="xsd:string">'+mode+'</mode></customer>';
const shoppingCartCustomerAddressEntityArray = (params) => {
    let required = {
        mode: 'string',
        firstname: 'string',
        lastname: 'string',
        company: 'string',
        street: 'string',
        city: 'string',
        region: 'string',
        postcode: 'string',
        country_id: 'string',
        telephone: 'string',
        is_default_shipping: 'int',
        is_default_billing: 'int'
    }, counter = 0, nodes = '';

    for (let key in required) {
        if (!required.hasOwnProperty(key)) continue;
        if (typeof params[key] !== 'undefined') {
            nodes += '<' + key + ' xsi:type="xsd:' + required[key] + '">' + params[key] + '</' + key + '>';
            counter++;
        }
    }

    let xml = '<customer xsi:type="urn:shoppingCartCustomerAddressEntityArray" soapenc:arrayType="urn:shoppingCartCustomerAddressEntity['+counter+']">'+nodes+'</customer>';
    console.log(xml);
    return xml;
};

magento.login(config.username, config.apiKey).then((sessionId) => {
    console.log('SessionId:', sessionId);
    //return magento.shoppingCartCreate();
    return 520;
}).then((cartId) => {
    return Promise.all([
        magento.shoppingCartCustomerSet({quoteId: cartId, customerData: shoppingCartCustomerEntity(17301, 'customer')}),
        magento.shoppingCartProductAdd({'quoteId': cartId, productsData: cartProductDetails('188833338081', 2)}),
        cartId
    ]);
}).then((results) => {
    console.log('customer set: ', results[0]);
    console.log('product add: ', results[1]);
    console.log('cartId', results[2]);
    return Promise.all([
        magento.shoppingCartCustomerAddresses({'quoteId': results[2], customerAddressData: shoppingCartCustomerAddressEntityArray({
                mode: 'billing',
                firstname: 'Marcin',
                lastname: 'Zawada',
                street: 'Wojska Polskiego',
                city: 'Szczecin',
                region: 'ZP',
                postcode: '77-123',
                country_id: 'IN',
                telephone: '123456987',
                is_default_shipping: 0,
                is_default_billing: 0,
            })
        }),
       /* magento.shoppingCartCustomerAddresses({'quoteId': results[2], customerAddressData: shoppingCartCustomerAddressEntityArray({
                mode: ' shipping',
                firstname: 'Marcin',
                lastname: 'Zawada',
                street: 'Wojska Polskiego',
                city: 'Szczecin',
                region: 'ZP',
                postcode: '77-123',
                country_id: 'PL',
                telephone: '123456987',
            })
        }),*/
        false,
        results[2]
    ]);

}).then().then((results) => {
    console.log('billing address:', results[0]);
    console.log('shipping addres:', results[1]);
    console.log('cartId', results[2]);
    return Promise.all([
        magento.shoppingCartPaymentList({'quoteId': results[2]}),
        magento.shoppingCartShippingList({'quoteId': results[2]}),
        results[2],
        magento.shoppingCartInfo({quoteId: results[2]})
    ]);
}).then((results) => {
    console.log('payment list:', results[0]);
    console.log('shipping list:', results[1]);
    console.log('cartId', results[2]);
    console.log('cartInfo: ', results[3]);
    return Promise.all([
        magento.shoppingCartPaymentMethod({'quoteId': results[2], method: 'banktransfer'}),

    ]);
}).catch((error) => {
    console.error(error);
});
