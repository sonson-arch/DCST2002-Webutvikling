import {isLeapYear} from './app.js';

// Oppgave 1

describe('A year is a leap year', () => {
    test.each([
        [1820, true],
        [1960, true],
        [2020, true]
    ])('Year %i is a leap year', (year, expected) => {
        expect(isLeapYear(year)).toBe(expected);
    });
});
 
// Oppgave 2 & 3 & 4 

describe('A year is not supported', () => {
    test.each([
        [-1, false]
    ])('Year %i is not supported', (year) => {
        expect(() => isLeapYear(year)).toThrow('Invalid argument');
    })
});

describe('A year is undefined', () => {
    test('Year is undefined', () => {
        expect(() => isLeapYear(undefined)).toThrow('Invalid argument');
    })
})

describe('A year is null', () => {
    test('Year is null', () => {
        expect(() => isLeapYear(null)).toThrow('Invalid argument');
    })
})

describe('A year is a leap year', () => {
    test.each([
        [1820, true],
        [1960, true],
        [2020, true],
        [1900, false], 
        [2000, true],    
    ])('Year %i is a leap year', (year, expected) => {
            expect(isLeapYear(year)).toBe(expected);

    });
})

