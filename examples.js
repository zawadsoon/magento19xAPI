const Magento19xAPI = require("./src/magento19xapi");

//if you have dev magento with not correctly working modrewrite then,
// path can be:  'http://some-host/index.php/api/v2_soap/index/';
const apiUrl   = 'http://some-host/api/v2_soap';
const headers  = {'Host': 'some-host'}; //have to be added in header (magento requirement)
const username = 'username';
const apiKey   = 'secret';

let magento = new Magento19xAPI (apiUrl, headers);

magento.login(username, apiKey).then((sessionId) => {
    //Session is also stored in object property sessionId
    console.log('SessionId: ' + sessionId);

    //Fetching shopping cart Id, no parameters needed.
    //If not passed session will be retrieved from object sessionId property.
    //storeId is optional
    return magento.shoppingCartCreate();
}).then((quoteId) => {
    //retrieving result of request (chaining promises)
    console.log('QuoteId: ' + quoteId);

    //Shopping cart info
    magento.shoppingCartInfo(null, quoteId, null).then((result) => {
        console.log('Cart info: ', result);
    }).catch((error) => {
        console.error(error);
    })
}).then().catch((error) => {
    console.error(error);
});