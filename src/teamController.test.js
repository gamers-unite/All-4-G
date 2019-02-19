import axios from 'axios'

describe('team Controller:', () => {

    test('getTeamMember returns Promise', () => {
        const response = axios.post('/api/teams/user', { req_id: 1 })
        expect(response instanceof Promise).toEqual(true)
    })

    test('getTeams returns Promise', () => {
        const response = axios.get("/api/teams", { user_id: 1 })
        expect(response instanceof Promise).toEqual(true)
    })

})

describe('user Controller:', () => {

    test('getUser returns Promise', () => {
        const response = axios.get("/users", { email: 'laura@fake.com' })
        expect(response instanceof Promise).toEqual(true)
    })

    test('logout returns Promise', () => {
        const response = axios.post("/users/logout")
        expect(response instanceof Promise).toEqual(true)
    })

})