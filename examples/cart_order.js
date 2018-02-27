const Entities = require('../src/entities');
const Magento19xAPI = require("./../src/magento19xapi");
const config = require("./../config");
const Exceptions = require("./../src/exceptions");

let magento = new Magento19xAPI (config.apiUrl, config.headers);
let orderDetails = {};

magento.login(config.username, config.apiKey).then((sessionId) => {
    console.log('SessionId:', sessionId);
    //Crate cart
    return magento.shoppingCartCreate({storeId: '1'});
    //return 259;
}).then((cartId) => {
    console.log('cartId: ', cartId);
    orderDetails.cartId = cartId;
    //return magento.shoppingCartInfo({quoteId: cartId});
    return magento.customerCustomerCreate({
        customerData: Entities.customerCustomerEntityToCreate('customerData', {
            email: 'test69@example.com',
            firstname: 'John',
            lastname: 'Doe',
            password: 'secret',
            gender: 1, //1 - male, 2 - famale
            website_id: 0,
            group_id: 1
        })
    })
    //return 17714;
}).then((customerId) => {
    console.log('customerId: ', customerId);
    orderDetails.customerId = customerId;
    return magento.customerCustomerInfo({customerId: customerId});
}).then((customer) => {
    console.log('customer', customer);
    customer.mode = 'customer';
    orderDetails.customer = customer;
    let myCustomer = Entities.shoppingCartCustomerEntity('customer', customer);
    console.log('my customer: ', myCustomer);
    return magento.shoppingCartCustomerSet({
        quoteId: orderDetails.cartId,
        customerData: myCustomer
    })
}).then((result) => {
    console.log('shoppingCartCustomerSet result', result);

    return magento.catalogProductList();
}).then((products) => {
    //console.log('products', products);
    orderDetails.products = products;
    let myProduct = products.filter((product) => product.type === 'simple')[0];
    console.log('myProduct', myProduct);
    orderDetails.product = myProduct;

    return magento.shoppingCartProductAdd({
        quoteId: orderDetails.cartId,
        productsData: Entities.shoppingCartProductEntityArray('products', [myProduct])
    });
}).then((result) => {
    console.log('shoppingCartProductAdd result', result);
    return magento.shoppingCartCustomerAddresses({
        quoteId: orderDetails.cartId,
        customerAddressData: Entities.shoppingCartCustomerAddressEntityArray('customer', [{
            mode: 'shipping',
            firstname: orderDetails.customer.firstname,
            lastname: orderDetails.customer.lastname,
            street: 'Georgstrasse 4-6',
            city: 'Gelsenkirchen',
            region_id: '80',
            telephone: '123456789',
            postcode: '45879',
            country_id: 'DE',
            is_default_shipping: 0,
            is_default_billing: 0
        }, {
            mode: 'billing',
            firstname: orderDetails.customer.firstname,
            lastname: orderDetails.customer.lastname,
            street: 'Georgstrasse 4-6',
            city: 'Gelsenkirchen',
            region_id: '80',
            telephone: '123456789',
            postcode: '45879',
            country_id: 'DE',
            is_default_shipping: 0,
            is_default_billing: 0
        }])
    });
}).then((result) => {
    console.log('shoppingCartCustomerAddresses result', result);
    return Promise.all([
        magento.shoppingCartShippingList({quoteId: orderDetails.cartId}),
        magento.shoppingCartPaymentList({quoteId: orderDetails.cartId}),
    ]);
}).then((results) => {
    let shippings = results[0] instanceof Array ? results[0] : [results[0]];
    console.log('shipping list: ', shippings);
    let payments = results[1] instanceof Array ? results[1] : [results[1]];
    console.log('payment list: ', payments);

    return Promise.all([
        magento.shoppingCartShippingMethod({
            quoteId: orderDetails.cartId,
            method: /*shippings[0].code*/ 'flatrate_flatrate',
            storeId: '1',
        }),
        magento.shoppingCartPaymentMethod({
            quoteId: orderDetails.cartId,
            store: '1',
            method: Entities.shoppingCartPaymentMethodEntity('method', {
                po_number: null,
                method: payments[0].code,
                cc_cid: null,
                cc_owner: null,
                cc_number: null,
                cc_type: null,
                cc_exp_year: null,
                cc_exp_month: null
            })
        })
    ]);
}).then((results) => {
    console.log('shoppingCartShippingMethod result: ', results[0]);
    console.log('shoppingCartPaymentMethod result: ', results[1]);

    return Promise.all([
        magento.shoppingCartTotals({quoteId: orderDetails.cartId}),
        magento.shoppingCartInfo({quoteId: orderDetails.cartId})
    ]);
}).then((results) => {
    console.log('totals: ', results[0]);
    console.log('info', results[1]);
    magento.log = true;
    return magento.shoppingCartOrder({quoteId: orderDetails.cartId});
}).then((result) => {
    console.log('shoppingCartOrder result: ', result);

    //Clear
    return Promise.all([
        magento.customerCustomerDelete({customerId: orderDetails.customerId}),
    ]);
}).then((results) => {
    console.log('customerCustomerDelete result: ', results);
}).catch((error) => {
    console.error(error);
});
