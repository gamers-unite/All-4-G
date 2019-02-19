import { mapStateToProps } from './Home'

describe('Test', () => {

    const state = {
        user: {
            user: {
                id: 1
            }
        },
        games: {
            allOfGames:
                { games: [] }

        }
    }

    test('test', () => {
        const props = mapStateToProps(state)
        expect(props.user).toEqual(state.user.user)

    })
    test('test', () => {
        const props = mapStateToProps(state)

        expect(props.games).toEqual(state.games.allOfGames)
    })

})