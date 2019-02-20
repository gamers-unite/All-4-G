import { renderTeam } from './Request';


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
    })

    test('renderTeam() should return empty array when no parameters', () => {
        team = renderTeam();
        expect(team.length).toEqual(0);
    })
})
