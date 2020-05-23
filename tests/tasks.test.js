const app = require('../src/app');
const Task = require('../src/models/task');
const request = require('supertest');
const mongoose = require('mongoose');
const {setupDatabase,userOne,userOneID,userTwo,taskOne,taskTwo,taskThree} = require('./fixtures/db')

beforeEach(setupDatabase)

test('should create task',async ()=>{
    const response = await request(app).post('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            "description": "studying node" 
        })
        .expect(201)

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)    
})

test("should get task own by userOne",async() => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

     expect(response.body).toHaveLength(2)   
})


test('should not delete task of other users' , async() => {
    const response = await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskThree._id)
    expect(task).not.toBeNull()    
})