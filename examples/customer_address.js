const Magento19xAPI = require("./../src/magento19xapi");
const config = require("./../config");

let magento = new Magento19xAPI (config.apiUrl, config.headers);
let customerId = 17678;

magento.login(config.username, config.apiKey).then((sessionId) => {
    console.log('SessionId:', sessionId);

    return magento.customerAddressList({customerId: customerId});

}).then((list) => {
    console.log('Address list: ', list);
}).catch((error) => {
    console.error(error);
});
