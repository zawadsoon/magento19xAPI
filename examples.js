const Magento19xAPI = require("./src/magento19xapi");
const config = require("./config");

let magento = new Magento19xAPI (config.apiUrl, config.headers);
magento.log = false;

const cartProductDetails = (sku, qty) =>  '<products SOAP-ENC:arrayType="ns1:shoppingCartProductEntity[1]" xsi:type="ns1:shoppingCartProductEntityArray"><item xsi:type="ns1:shoppingCartProductEntity"><sku xsi:type="xsd:string">'+ sku +'</sku><qty xsi:type="xsd:double">'+ qty +'</qty></item></products>';

magento.login(config.username, config.apiKey).then((sessionId) => {
    console.log('SessionId:', sessionId);
    return magento.shoppingCartCreate();
}).then((cartId) => {
    let promises = [];
    cartId = 500;
    promises.push(magento.shoppingCartInfo({'quoteId': cartId}));
    promises.push(magento.shoppingCartProductList({'quoteId': cartId}));
    promises.push(magento.shoppingCartProductAdd({'quoteId': cartId, productsData: cartProductDetails('188833338081', 2)}));
    return Promise.all(promises);
}).then().then((results) => {
    console.log('Cart:', results[0].items.item);
    console.log('List:', results[1]);
    console.log('ID:', results[2]);
}).catch((error) => {
    console.error(error);
});