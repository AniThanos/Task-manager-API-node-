const {calculateSum, add} = require('../math')

test('sum',()=>{
    const total = calculateSum(1,2);
    expect(total).toBe(3)
})

test('check default value of 2nd parameter',() => {
    const total = calculateSum(2);
    expect(total).toBe(4)
})




// // test('async test',(done) => {
// //     setTimeout(()=>{
// //         expect(1).toBe(2)
// //         done();
// //     },2000)
// // })



// test ('addition wuth promise',(done) => {
//     add(12,12).then(sum=>{
//         expect(sum).toBe(24)
//         done();
//     })
// })

// test ('addition with async await',async () => {
//     const sum = await add(2,12);
//     expect(sum).toBe(14)
// })