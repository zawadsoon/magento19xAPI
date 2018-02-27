const Magento19xAPI = require("./../src/magento19xapi");
const config = require("./../config");

let magento = new Magento19xAPI (config.apiUrl, config.headers);
//magento.log = true;

magento.login(config.username, config.apiKey).then((sessionId) => {
    console.log('SessionId:', sessionId);
    return magento.directoryCountryList();
}).then((countries) => {
    console.log('countries: ', countries);
    let code = countries[(Math.floor(Math.random() * countries.length))].iso3_code;
    return Promise.all([
        magento.directoryRegionList({country: code}),
        code
    ]);
}).then((results) => {
    console.log('regions (' + results[1] + '): ', results[0]);
}).catch((error) => {
    console.error(error);
});
