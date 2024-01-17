const pagoRouter = require('express').Router();
const Pago= require('../model/pago');
const User = require('../model/user');
const Cita = require('../model/cita');

pagoRouter.get('/', async (request, response) => {
    const user = request.user;
    const pagos = await Pago.find({ user: user.id});
    return response.status(200).json(pagos)
});

pagoRouter.get('/cantidad', async (request, response) => {
    try {
        const user = request.user;
    const pagos = await Pago.find({ user: user.id});
    console.log(pagos);
    return response.status(200).json(pagos)
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Error al consultar las citas.' });
    }
    
});


pagoRouter.post('/', async (request, response) => {
const user = request.user;
const {Referencia, Cantidad, metodo} = request.body;
const NewPago = new Pago({
    Referencia,
    Cantidad,
    metodo,
    estado: 'En espera',
    user: user._id  
});

const savedPago = await NewPago.save();
user.pagos = user.pagos.concat(savedPago._id);
await user.save();

return response.status(201).json(savedPago)
})


pagoRouter.put('/:id', async (request, response) => {
    try {
      const pagoId = request.params.id;
      const { estado } = request.body;
  
      const pago = await Pago.findById(pagoId);
      if (!pago) {
        return response.status(404).json({ error: 'Pago no encontrado' });
      }
  
      pago.estado = estado;
      const updatedPago = await pago.save();
  
      return response.status(200).json(updatedPago);
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: 'Error al actualizar el estado del pago' });
    }
  });
  

pagoRouter.get('/:id', async (request,response) => {
    try {
        console.log(request.params.id);
        const idUsuario = request.params.id;
    
        const pago = await Pago.find({ user: idUsuario });;
        //devuelve pago como res
        return response.status(200).json(pago);
    } catch (error) {
        console.log(error);
        
    }
});

    pagoRouter.patch('/:id', async (request, response) => {
    const user = request.user;

    const {Referencia, Cantidad, metodo} = request.body;

    await Pago.findByIdAndUpdate(request.params.id, {Referencia, Cantidad, metodo});

    return response.sendStatus(200);
})

pagoRouter.delete('/:id', async (request, response) => {
    const user = request.user;

    await Pago.findByIdAndDelete(request.params.id);

    user.pagos = user.pagos.filter(id => id.toString() !== request.params.id);

    await user.save();

    return response.status(204);
});


module.exports = pagoRouter;