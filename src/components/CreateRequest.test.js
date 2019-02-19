import { createNumArray } from './CreateRequest';

describe('Num Array Methods:', () => {
    let numArr = [];
    afterEach = () => {
        numArr = [];
    };

    test('createNumArr() should return array equal to 1 less than number passed in.', () => {
        numArr = createNumArray(5);
        expect(numArr.length).toEqual(4);
    })

    test('createNumArr() should return array equal to 1 less than number passed in.', () => {
        numArr = createNumArray(10);
        expect(numArr.length).toEqual(9);
    })

    test('createNumArr() should return array equal to 1 less than number passed in.', () => {
        numArr = createNumArray(0);
        expect(numArr.length).toEqual(0);
    })
})