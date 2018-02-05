#Introduction
Nice code! But what this do?? Hmm... It provides simple object with methods that can be found in Magento 1.9.x SOAP
documentation, of course they are implemented in JavaScript and can be use in Node and ReactNative. This is some kind of
connector that fetch data from Magento 1.9.x SOAP API.
This implementation do not use any XML builder, there are parts of XML hidden in files (performance + flexibility).
If you do not use it in ReactNative then it should work
because of `fetch` method