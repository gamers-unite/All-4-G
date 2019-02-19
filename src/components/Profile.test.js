import { mapStateToProps } from './Profile'

describe('Test', () => {

    const state = {
        user: {
            user: {
                id: 1
            }
        }
    }

    test('test', () => {
        const props = mapStateToProps(state)
        expect(props).toEqual(state.user)
    })

})