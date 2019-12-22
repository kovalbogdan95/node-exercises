const supertest = require('supertest')
const users = require('./users')
const app = require('./api')

const request = supertest(app)

// write some tests
describe('users', () => {
  test('Find user', async () => {
    let user = await users.findUser(0)
    expect(typeof(user)).toBe(typeof({}))
    expect(user.id).toBe(0);
  })
  test('Delete user', async () => {
    let id = await users.deleteUser(0)
    expect(typeof(id)).toBe(typeof({}))
    expect(id.id).toBe(0)
  })
})

describe('api', () => {
    test('get user', async done => {
        const res = await request.get('/user/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body.id).toBe(1)
        done()
    })
    test('delete user', async done => {
        const res = await request.delete('/user/1')
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body.id).toBe(1)
        done()
    })
    test('not found', async done => {
        const res = await request.get('/user/100')
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe("No user with id '100'")
        done()
    })
})