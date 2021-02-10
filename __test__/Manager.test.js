const Manager = require("../lib/manager");
describe('Manager class', () => {
    it('Should return user input values', () => {
        const manager = new Manager('Michel',  123, 'mich@gmail.com','B1F1C1');
        expect(manager.name).toBe('Michel');
        expect(manager.email).toBe('mich@gmail.com');
        expect(manager.id).toBe(123);
        expect(manager.officeNumber).toBe('B1F1C1');
    });

    test('it should return the value for each method of the object', () => {
        const myMgr = new Manager('Michel', 1, 'mich@gmail.com', 'B1F1C1');
        expect(myMgr.getName()).toBe(myMgr.name);
        expect(myMgr.getId()).toBe(myMgr.id);
        expect(myMgr.getEmail()).toBe(myMgr.email);
        expect(myMgr.getOfficeNumber()).toBe(myMgr.officeNumber);
        expect(myMgr.getRole()).toBe('Manager');
    });
});