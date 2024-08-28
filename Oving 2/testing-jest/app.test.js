import {isLeapYear} from './app.js';


describe('A year is not a leap year', () => {
    test('Year is not divisible by 4', () => {
        expect(isLeapYear(1981)).toBe(false);
    });
    
    test('Year is divisible by 100 but not by 400', () => {
        expect(isLeapYear(2100)).toBe(false);
    });
});