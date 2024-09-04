export function isLeapYear(year) {
    if (year < 0) {
        throw new Error('Invalid argument');
    }
    if ( year === undefined) {
        throw new Error('Invalid argument');
    }
    if (year === null) {
        throw new Error('Invalid argument');
    }
    else return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0) 
}