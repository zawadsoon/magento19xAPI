const Entities = require('../src/entities');
const Samples  = require('../spec/helpers/samples');

describe("Test entities builder functions", function() {

    it("ArrayOfString should match sample result", function(){
        expect(Entities.buildArrayOfStrings('example', ['Example line 1', 'Example line 2']))
            .toBe(Samples.buildArrayOfStringsSample1);
    });

    it("ArrayOfString should match sample result", function(){
        expect(Entities.buildArrayOfStrings('example', [
            'Example line 1',
            'Example line 2',
            'Example line 3',
            'Example line 4',
            'Example line 5',
        ])).toBe(Samples.buildArrayOfStringsSample2);
    });


    it("Builded params should match sample result", function() {
        expect(Entities.buildParameters({
            'name': 'abc',
            'value': 5,
            'status': false,
            'array': ['abc', 'def', 'ghi']
        }, {
            'name': 'string',
            'value': 'int',
            'status': 'boolean',
            'array': 'ArrayOfString',
        })).toBe(Samples.buildParametersSample1);
    });

});

describe("Test customerAddressEntityCreate", function() {
  
    it("Should match sample", function () {
        expect(Entities.customerAddressEntityCreate('addressData', {
            city: 'Example city',
            company: 'Example company',
            country_id: 'Example country ID',
            fax: '123654789',
            firstname: 'John',
            lastname: 'Doe',
            middlename: 'Kowalsky',
            postcode: '11-89',
            prefix: 'Prefix',
            region_id: '50',
            region: 'Example region',
            street: ['Street line 1', 'Street line 2'],
            suffix: 'Suffix',
            telephone: '987456321',
            is_default_billing: true,
            is_default_shipping: false,
        })).toBe(Samples.customerAddressEntityCreateSample1);
    });
    
});

