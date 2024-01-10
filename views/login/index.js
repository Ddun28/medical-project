const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const formulario = document.querySelector('#formulario');

const togglePassword = document.getElementById("toggle-password");

togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.innerHTML = '<i class="far fa-eye-slash"></i>';
  } else {
    passwordInput.type = "password";
    togglePassword.innerHTML = '<i class="far fa-eye"></i>';
  }
});

formulario.addEventListener('submit', async e => {
    e.preventDefault();
  
    try {
      const user = {
        email: emailInput.value,
        password: passwordInput.value
      };
      const response = await axios.post('/api/login', user);

      if (response.status === 200) {
        createNotification(false, response.data.message);
        if (response.data.isAdmin) {
          window.location.pathname = '/admin/';
        } else {
          window.location.pathname = '/principal/';
        }
        createNotification(false, response.data.message);
      } else {
        createNotification(true, response.data.error);
      }
  
      
    } catch (error) {
      console.log( error.response.data.error);
      createNotification(true, error.response.data.error);
    }
  });