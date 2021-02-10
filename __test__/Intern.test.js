const Intern = require("../lib/Intern");

describe('Intern class', () => {
    it('Should return user input values', () => {
        const intern = new Intern('Michel',  123, 'mich@gmail.com','UNC');
        expect(intern.name).toBe('Michel');
        expect(intern.email).toBe('mich@gmail.com');
        expect(intern.id).toBe(123);
        expect(intern.school).toBe('UNC');
    });

    test('it should return the value for each method of the object', () => {
        const myInt = new Intern('Michel', 1, 'mich@gmail.com', 'UNC');
        expect(myInt.getName()).toBe(myInt.name);
        expect(myInt.getId()).toBe(myInt.id);
        expect(myInt.getEmail()).toBe(myInt.email);
        expect(myInt.getSchool()).toBe(myInt.school);
        expect(myInt.getRole()).toBe('Intern');
    });
});