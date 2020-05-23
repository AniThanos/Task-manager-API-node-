const calculateSum = (a,b=2) => {
    return a+b;
}

const add = (a, b) =>{
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            if(a < 0 || b <0 ){
                reject("number must be positive")
            }
            resolve(a+b)
        },2000)
    })
}

module.exports = {
    calculateSum,
    add
}