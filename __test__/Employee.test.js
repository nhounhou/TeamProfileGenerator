const Employee = require('../lib/Employee');

describe('Employee class', () => {
    it('Should return user input values', () => {
        const employee = new Employee('Michel',  123, 'mich@gmail.com');
        expect(employee.name).toBe('Michel');
        expect(employee.email).toBe('mich@gmail.com');
        expect(employee.id).toBe(123);
    });
    test('it should return the value for each method of the object', () => {
        const myEmp = new Employee('Michel', 1, 'mich@gmail.com');
        expect(myEmp.getName()).toBe(myEmp.name);
        expect(myEmp.getId()).toBe(myEmp.id);
        expect(myEmp.getEmail()).toBe(myEmp.email);
    });
});