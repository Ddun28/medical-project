const loginRouter = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  //console.log(email, password);
  const userExist = await User.findOne({ email })
  
  if (!userExist) {
    return response.status(400).json({ error: 'Email o contraseña invalidos' });
    
  }
  if (!userExist.verified) {
    return response.status(400).json({ error: 'Tu email no ha sido verificado' });
  }

  const isCorrect = await bcrypt.compare(password, userExist.passwordHash);

  if (!isCorrect) {
    return response.status(400).json({ error: 'Email o contraseña invalidos' });
  }

    // Verificar si el usuario tiene el rol de "admin"
    const isAdmin = userExist.rol === 'Admin';

  const userForToken = {
    id: userExist.id,
    isAdmin: isAdmin
  };

  const accessToken = jwt.sign(userForToken, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: '1d'
  });

  response.cookie('accessToken', accessToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  });

  
if (isAdmin) {
  return response.status(200).json({ message: 'Inicio de sesión exitoso', isAdmin: true });
} else {
  return response.status(200).json({ message: 'Inicio de sesión exitoso', isAdmin: false });
}
  
  return response.sendStatus(200);

});

module.exports = loginRouter;