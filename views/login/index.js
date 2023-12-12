const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', async e => {
    e.preventDefault();
  
    try {
      const user = {
        email: emailInput.value,
        password: passwordInput.value
      };
      await axios.post('/api/login', user);
      window.location.pathname = '/principal/';
      createNotification(false,response.data.message)
    } catch (error) {
      console.log( error.response.data.error);
      createNotification(true, error.response.data.error);
    }
  });