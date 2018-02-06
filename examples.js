const Magento19xAPI = require("./src/magento19xapi");
const config = require("./config");

let magento = new Magento19xAPI (config.apiUrl, config.headers);
magento.login(config.username, config.apiKey).then((sessionId) => {
    //Session is also stored in object property sessionId
    console.log('SessionId: ' + sessionId);

    //Fetching shopping cart Id, no parameters needed.
    //If not passed session will be retrieved from object sessionId property.
    //storeId is optional
    return magento.shoppingCartCreate();
}).then((quoteId) => {
    //retrieving result of request (chaining promises)
    console.log('quoteId: ', quoteId);

    //Shopping cart info
    magento.shoppingCartLicense({'quoteId': quoteId}).then((result) => {
        console.log('Cart: ', result);
    }).catch((error) => {
        console.error(error);
    })
}).catch((error) => {
    console.error(error);
});