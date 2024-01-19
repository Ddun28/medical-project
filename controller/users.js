//lo primero que vamos a hacer es un router
//router: registrar POST, GET, Delete
const userRouter = require('express').Router();
const { PAGE_URL } = require('../config');
const User = require('../model/user'); 
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userExtractor } = require('../middleware/auth');

//luego que definimos el router y los exportamos en app.js

//registrar lo que el usuario me envia 
userRouter.post('/', async (request, response) => {
    //console.log(request.body);
    const {name, email, password, rol} = request.body;
    console.log(name,email,password, rol);

    const userExist = await User.findOne({ email });
    if(userExist) {
      return response.status(400).json({error: 'El email ya se encuentra en uso' });
    }

    if(!name || !email || !password){
        //console.log('campo vacio');
        return response.status(400).json({error:'Todos los campos son requeridos'})
    }

const saltRounds = 10;

const passwordHash = await bcrypt.hash(password, saltRounds);

const newUser = new User({
    name,
    email,
    passwordHash,
    rol,
})

const savedUser =  await newUser.save();
const token = jwt.sign({ id: savedUser.id}, process.env.ACCES_TOKEN_SECRET, { expiresIn: '1d' });

   // create reusable transporter object using the default SMTP transport
   const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
   
});

await transporter.sendMail({
  from: process.env.EMAIL, // sender address
  to: savedUser.email, // list of receivers
  subject: 'Verificación de usuario', // Subject line
  html:`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Verificacion de usuario - Medical Health</title>
    <style>
      /* Estilo General */
      body {
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center; 
      }
  
      /* Dark blue box styles */
      .blue{
        background-color: #6666ff;
        color: #FFFFFF;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 10px; 
      }
  
      /* Title styles */
      .title {
        color: #13293D;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
  
      /* Verification link styles */
      .verification-link {
        display: inline-block;
        background-color: #13293D;
        color: #FFFFFF;
        padding: 10px 20px;
        font-weight: bold;
        text-decoration: none;
        margin-top: 20px;
        border-radius: 10px; /* Agrega bordes redondeados */
      }

      .text {
        font-family: Arial, Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="blue">
        <p>Bienvenido al consultorio medical Health</p>
        <p class="text" >Click en el Link para que lo redireccione a la pagina.</p>
      </div>
      
      <h1 class="title">Verificacion <span style="color: #FFFFFF">Medical Health</span></h1>
  
      <a class="verification-link" href="${PAGE_URL}/verify/${savedUser.id}/${token}" style="color: #FFFFFF;">Verify email.</a>
    </div>
  </body>
  </html>
  
  `, // html body
});

return response.status(201).json({message:'Usuario creado, Por favor verificar tu email'});

});

userRouter.patch('/:id/:token', async (request, response) => {
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return response.sendStatus(200);

  } catch (error) {
    // En contrar el email del usuario
    const id = request.params.id;
    const { email } = await User.findById(id);
    // Firmar el nuevo token
    const token = jwt.sign({ id: id }, process.env.ACCES_TOKEN_SECRET, { expiresIn: '1d' });
    // Enviar el email
    // create reusable transporter object using the default SMTP transport
    // Enviar email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    });


    await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: 'Verificación de usuario', // Subject line
      html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`, // html body
    });
    return response.status(400).json({ error: 'El link ya expiró. Se ha enviado un nuevo linkde verificación a su correo' });
  }
});

userRouter.get('/',userExtractor,async (request, response) => {
  const user = request.user
  //console.log(user);
  return response.status(200).json(user);
});

userRouter.get('/all', async (request, response) => {
  try {
      const users = await User.find()
      .populate("citas")
      .populate("pagos"); 
      response.json(users); 
      console.log(users);
  } catch (error) {
      response.status(500).json({ error: 'Error al consultar los productos.' });
  }
});

userRouter.get('/buscar', async (request, response) => {
  const { nombre } = request.query;

  try {
    const usuarios = await User.find({ name: { $regex: nombre, $options: 'i' } }).populate("citas");
    return response.status(200).json(usuarios);
  } catch (error) {
    return response.status(500).json({ error: 'Error al buscar los usuarios.' });
  }
});  

userRouter.get('/:id', async (request, response) => {
  try {
    const user = request.params.id
  const datos = await User.findById(user).populate("citas");

  //console.log(user);
  return response.status(200).json(datos);
  } catch (error) {
   console.log(error); 
  }
  
});

module.exports = userRouter; 
