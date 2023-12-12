const citaRouter = require('express').Router();
const Cita = require('../model/cita');
const User = require('../model/user');


citaRouter.get('/', async (request, response) => {
    const user = request.user;
    const citas = await Cita.find({ user: user.id});
    return response.status(200).json(citas)
});

citaRouter.post('/', async (request, response) => {
   const user = request.user;
   const {Edad,Telefono,Fecha,Hora, Sintomas} = request.body;
   const newCita = new Cita({
    Edad,
    Telefono,
    Fecha,
    Hora,
    Sintomas,
    user: user._id
   });

   const savedCita = await newCita.save();
   user.citas = user.citas.concat(savedCita._id);
   await user.save();

   return response.status(201).json(savedCita);
})

citaRouter.delete('/:id', async (request, response) => {
    const user = request.user;

    await Cita.findByIdAndDelete(request.params.id);

    user.citas = user.citas.filter(id => id.toString() !== request.params.id);

    await user.save();

    return response.status(204);
});

citaRouter.patch('/:id', async (request, response) => {
    const user = request.user;

    const {Edad, Telefono, Fecha, Hora, Sintomas} = request.body;

    await Cita.findByIdAndUpdate(request.params.id, {Edad, Telefono, Fecha, Hora, Sintomas});

    return response.sendStatus(200);
})

module.exports = citaRouter;