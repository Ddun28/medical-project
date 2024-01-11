const citaRouter = require('express').Router();
const Cita = require('../model/cita');
const User = require('../model/user');
const Pago = require('../model/pago');


citaRouter.get('/', async (request, response) => {
    const user = request.user;
    const citas = await Cita.find({ user: user.id}).populate("pagos")
    console.log(citas);
    return response.status(200).json(citas)
});

citaRouter.get('/all', async (request, response) => {
    try {
        const citas = await Cita.find()
        .populate("user")
        .populate("pagos");
        response.json(citas);
        console.log(citas);
    } catch (error) {
        
        response.status(500).json({ error: 'Error al consultar los productos.' });
    }
});

citaRouter.get('/:id', async (request, response) => {
  const citaId = request.params.id;

  try {
    const cita = await Cita.findById(citaId).populate('user');
    if (!cita) {
      return response.status(404).json({ error: 'Cita no encontrada' });
    }

    response.json(cita);
  } catch (error) {
    response.status(500).json({ error: 'Error al obtener la cita' });
  }
})

citaRouter.post('/', async (request, response) => {
   const user = request.user;
   const {Edad,Telefono, Cedula,Fecha,Hora, Sintomas} = request.body;
   const newCita = new Cita({
    Edad,
    Telefono,
    Cedula,
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

// Función para filtrar citas por fecha
function filtrarCitasPorFecha(req, res) {
    const rangoFecha = req.params.rangoFecha;
    let fechaInicio;
    let fechaFin;
  
    // Obtener la fecha de inicio y fin según el rango seleccionado
    if (rangoFecha === 'Hoy') {
      fechaInicio = new Date();
      fechaFin = new Date();
    } else if (rangoFecha === '7 dias despues') {
      fechaInicio = new Date();
      fechaFin = new Date();
      fechaFin.setDate(fechaFin.getDate() + 7);
    } else if (rangoFecha === 'Mes') {
      fechaInicio = new Date();
      fechaFin = new Date();
      fechaFin.setMonth(fechaFin.getMonth() + 1);
    }
  
    // Realizar la consulta a la base de datos con el rango de fechas seleccionado
    Cita.find({
      Fecha: { $gte: fechaInicio, $lte: fechaFin }
    })  
    .populate("user")
    .populate("pagos")
      .then(citas => {
        // Enviar los resultados como respuesta
        res.status(200).json(citas);
      })
      .catch(error => {
        // Manejar el error de consulta a la base de datos
        console.error(error);
        res.status(500).json({ error: 'Error al filtrar citas por fecha' });
      });
  }
  
  // Ruta para filtrar citas por rango de fechas
  citaRouter.get('/filtro/:rangoFecha', filtrarCitasPorFecha);

module.exports = citaRouter;