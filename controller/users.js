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
    const {name, email, password} = request.body;
    console.log(name,email,password);

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
  html: `<a href="${PAGE_URL}verify/${savedUser.id}/${token}">Verificar correo</a>`, // html body
});

return response.status(201).json({message:'Usuario creado, Por favor verificar tu email'});

});

// Expiró el token
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


module.exports = userRouter; 
