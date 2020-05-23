const request = require('supertest');
const app = require('../src/app')
const User = require('../src/models/user')
const {setupDatabase,userOne,userOneID} = require('./fixtures/db')

beforeEach(setupDatabase)

test('test user registration (create)',async ()=>{
    const response = await request(app).post('/users').send({
        'name':'Animesh',
        'email':'animesh@gmail.com',
        'password': '12345678'
    }).expect(201)


    //assert that database was changed successfully
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //assertion about response body
    expect(response.body).toMatchObject({
        user:{
            'name':'Animesh',
            'email':'animesh@gmail.com'
        }
        ,
        token : user.tokens[0].token
    })

    //password not saved as plain text
    expect(user.password).not.toBe('12345678')
})

test('User Login',async () => {
    const response =await request(app).post("/users/login").send({
        'email': userOne.email,
        'password':userOne.password
    }).expect(200)

    //validate new token saved
    const user = await User.findById(response.body.user._id);
    expect(user.tokens[1].token).toBe(response.body.token)

})

test('login should fail for non users',async()=>{
    await request(app).post('/users/login').send({
        'email':'xyz@xyz.com',
        'password':'1234567'
    }).expect(400)
})


test('should get profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('should not get profile for unauth users', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)    
})

test('should delete account auth', async () => {
   const response = await request(app).delete('/users/me')
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        //check whether user is removed from database
   const user = await User.findById(userOneID)
   expect(user).toBeNull()     
})

test('should not delete account unauth', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test("check for profile pic", async() => {
    await request(app).post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/avatar.jpg')
    .expect(200)
    const user= await User.findById(userOneID);
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update user field', async () => {
    const response = await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        'name':'Raj'
    })
    .expect(200)

    const user = await User.findById(userOneID);
    expect(user.name).toEqual('Raj')
})


test('should not update invalid field', async () => {
    const response = await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        'location':'axc'
    })
    .expect(400)
})