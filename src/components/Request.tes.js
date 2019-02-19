const request = require('./Request');
const team = require('./Request')

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
    })

})