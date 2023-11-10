const userRouter = require('express').Router();

userRouter.post('/', (request, response) =>{
    const {name, email, password} = request.body;
    console.log(name,email,password);

    if(!name || !email || !password){
        console.log('campo vacio');
        return response.status(400).json({error:'Todos los campos son requeridos'})
    }else{
        return response.status(200).json({message:'Registrado sastifactoriamente'});
    }
})

module.exports = userRouter;