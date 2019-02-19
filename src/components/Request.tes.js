import { renderTeam } from './Request';

<<<<<<< HEAD:src/components/Request.tes.js
describe('Request Properties:', () => {
    test('Request default as an empty array', () => {
        expect(Array.isArray(request)).toEqual(true);
        expect(request.length).toEqual(1);
    });

    test('Team should default to 1', () => {
        expect(Array.isArray(team)).toEqual(true);
        expect(team.length).toEqual(1);
    });
});

describe('Team Methods:', () => {
    afterEach = () => {
        request = [];
        team = [];
    };

    test('renderTeam() should add a user to the team array.', () => {
        Request.renderTeam(request[0]);
        Request.renderTeam(request[1]);

        expect(request.length).toEqual(2);
        expect(request[0]).toEqual
=======

describe('Team Methods:', () => {
    let team = [];
    let request = [];
    afterEach = () => {
        team = [];
        request = [];
    };

    test('renderTeam() should add a user to the team array.', () => {
        team = renderTeam(5, []);
        expect(team.length).toEqual(5);
    })
    test('renderTeam() should add a user to the team array.', () => {
        team = renderTeam(2, []);
        expect(team.length).toEqual(2);
>>>>>>> master:src/components/Request.test.js
    })

    test('renderTeam() should return empty array when no parameters', () => {
        team = renderTeam();
        expect(team.length).toEqual(0);
    })
})