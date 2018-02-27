const Entities = require('../src/entities');
const Magento19xAPI = require("./../src/magento19xapi");
const config = require("./../config");

let magento = new Magento19xAPI (config.apiUrl, config.headers);
//magento.log = true;

magento.login(config.username, config.apiKey).then((sessionId) => {
    console.log('SessionId:', sessionId);
    return magento.customerCustomerCreate({
        customerData: Entities.customerCustomerEntityToCreate('customerData', {
            email: 'test@example.com',
            fistname: 'John',
            lastname: 'Doe',
            password: 'secret',
            gender: 1, //1 - male, 2 - famale
            website_id: 0,
            group_id: 1
        })
    })
}).then((custeomerId) => {
    console.log('customerId: ', custeomerId);
    //Clear - remove customer
    return magento.customerCustomerDelete({customerId: custeomerId});
}).then((result) => {
    console.log('result: ', result);
}).catch((error) => {
    console.error(error);
});
