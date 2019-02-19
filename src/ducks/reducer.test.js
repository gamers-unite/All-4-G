import reducer, { login, addUser, update, getUser } from './userReducer'
import axios from 'axios'

describe('User tester', () => {
    const user = {};
    const otherUser = {};

    afterEach = () => {
        user = {};
        otherUser = {};
    }

    test('login should login', () => {
        const email = 'laura@fake.com'
        const password = 'password'
        const payload = axios.post("/users/login", {
            email,
            password
        })
        const action = login(email, password);
        expect(action).toEqual({
            payload: payload,
            type: "LOGIN"
        })

    })

    test('getUser should return user', () => {
        const id = 1
        const payload = axios.get("/users/", id)
        const action = getUser(id);
        expect(action).toEqual({
            payload: payload,
            type: "GET_USER"
        })
    })
})