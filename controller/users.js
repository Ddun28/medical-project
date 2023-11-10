const userRouter = require('express').Router();

userRouter.post('/', (request, response) =>{
    const {name, email, password} = request.body;
    console.log(name,email,password);
})

module.exports = userRouter;