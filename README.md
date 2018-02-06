# Introduction
Nice code! But what this do?? Hmm... It provides simple object with methods that can be found in Magento 1.9.x SOAP
documentation, of course they are implemented in JavaScript and can be use in Node and ReactNative. This is some kind of
connector that fetch data from Magento 1.9.x SOAP API.
This implementation do not use any XML builder, there are parts of XML hidden in files (performance + flexibility).
# TODO
fix description
# Examples
If you have to run examples and test you have to move `config.example.js` to `example.js` and fill data.
# Testing
Added unit testing, run `npm test` to run test. For now test are weird, because
there is no requests mocks. I'm working on it.