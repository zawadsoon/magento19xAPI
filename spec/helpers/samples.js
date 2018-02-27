module.exports = {
    buildArrayOfStringsSample1: '' +
        '<example SOAP-ENC:arrayType="xsd:string[2]" xsi:type="ns1:ArrayOfString">' +
        '<item xsi:type="xsd:string">Example line 1</item>' +
        '<item xsi:type="xsd:string">Example line 2</item>' +
        '</example>',

    buildArrayOfStringsSample2: '' +
        '<example SOAP-ENC:arrayType="xsd:string[5]" xsi:type="ns1:ArrayOfString">' +
        '<item xsi:type="xsd:string">Example line 1</item>' +
        '<item xsi:type="xsd:string">Example line 2</item>' +
        '<item xsi:type="xsd:string">Example line 3</item>' +
        '<item xsi:type="xsd:string">Example line 4</item>' +
        '<item xsi:type="xsd:string">Example line 5</item>' +
        '</example>',

    buildParametersSample1: '' +
        '<name xsi:type="xsd:string">abc</name>' +
        '<value xsi:type="xsd:int">5</value>' +
        '<status xsi:type="xsd:boolean">false</status>' +
        '<array SOAP-ENC:arrayType="xsd:string[3]" xsi:type="ns1:ArrayOfString">' +
        '<item xsi:type="xsd:string">abc</item>' +
        '<item xsi:type="xsd:string">def</item>' +
        '<item xsi:type="xsd:string">ghi</item>' +
        '</array>',

    customerAddressEntityCreateSample1: '' +
        '<addressData xsi:type="urn:customerAddressEntityCreate">' +
            '<city xsi:type="xsd:string">Example city</city>' +
            '<company xsi:type="xsd:string">Example company</company>' +
            '<country_id xsi:type="xsd:string">Example country ID</country_id>' +
            '<fax xsi:type="xsd:string">123654789</fax>' +
            '<firstname xsi:type="xsd:string">John</firstname>' +
            '<lastname xsi:type="xsd:string">Doe</lastname>' +
            '<middlename xsi:type="xsd:string">Kowalsky</middlename>' +
            '<postcode xsi:type="xsd:string">11-89</postcode>' +
            '<prefix xsi:type="xsd:string">Prefix</prefix>' +
            '<region_id xsi:type="xsd:int">50</region_id>' +
            '<region xsi:type="xsd:string">Example region</region>' +
            '<street SOAP-ENC:arrayType="xsd:string[2]" xsi:type="ns1:ArrayOfString">' +
                '<item xsi:type="xsd:string">Street line 1</item>' +
                '<item xsi:type="xsd:string">Street line 2</item>' +
            '</street>' +
            '<suffix xsi:type="xsd:string">Suffix</suffix>' +
            '<telephone xsi:type="xsd:string">987456321</telephone>' +
            '<is_default_billing xsi:type="xsd:boolean">true</is_default_billing>' +
            '<is_default_shipping xsi:type="xsd:boolean">false</is_default_shipping>' +
        '</addressData>'

};