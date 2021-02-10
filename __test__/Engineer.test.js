const Engineer = require("../lib/Engineer");

describe('Engineer class', () => {
    it('Should return user input values', () => {
        const engineer = new Engineer('Michel',  123, 'mich@gmail.com','mich');
        expect(engineer.name).toBe('Michel');
        expect(engineer.email).toBe('mich@gmail.com');
        expect(engineer.id).toBe(123);
        expect(engineer.gitHub).toBe('mich');
    });

    test('it should return the value for each method of the object', () => {
        const myEng = new Engineer('Michel', 1, 'mich@gmail.com', 'mich');
        expect(myEng.getName()).toBe(myEng.name);
        expect(myEng.getId()).toBe(myEng.id);
        expect(myEng.getEmail()).toBe(myEng.email);
        expect(myEng.getGithub()).toBe(myEng.gitHub);
        expect(myEng.getRole()).toBe('Engineer');
    });
});