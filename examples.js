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
    console.log(sessionId);
}).catch((error) => {
    console.log(error);
});