const create = document.querySelector('#registro');
const inputName = document.querySelector('#name')
const inputE = document.querySelector('#email-input');
const inputPass = document.querySelector('#pass-input');
const confirmPass = document.querySelector('#confirm');
const btnRegistro = document.querySelector('#form-btn')
const alerta = document.querySelector('#alerta');
const togglePassword = document.getElementById("toggle-password");
const togglePassword2 = document.getElementById("toggle-password2");

togglePassword.addEventListener("click", function () {
    if (inputPass.type === "password") {
      inputPass.type = "text";
      togglePassword.innerHTML = '<i class="far fa-eye-slash"></i>';
    } else {
      inputPass.type = "password";
      togglePassword.innerHTML = '<i class="far fa-eye"></i>';
    }
  });

  togglePassword2.addEventListener("click", function () {
    if (confirmPass.type === "password") {
      confirmPass.type = "text";
      togglePassword2.innerHTML = '<i class="far fa-eye-slash"></i>';
    } else {
      confirmPass.type = "password";
      togglePassword2.innerHTML = '<i class="far fa-eye"></i>';
    }
  });


//validamos
//validacion con regex
const nameVal = /^[A-Z\u00d1][a-zA-Z-ÿáéíóú\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿáéíóú\u00f1\u00d1\s]*)$/;
const emailVal =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&'*+/=?^_`<>,{|}~-]).{8,}$/gm;

let valname = false;
let valemail = false;
let valpass = false;
let valMacth = false;

inputName.addEventListener('input', e => {
    valname = nameVal.test(e.target.value);
    validar(inputName,valname)

    //console.log(valname);
})

inputE.addEventListener('input', e =>{
    valemail = emailVal.test(e.target.value);
    validar(inputE, valemail)
})

inputPass.addEventListener('input', e =>{
    valpass = passwordVal.test(e.target.value);
    validar(inputPass,valpass);
    validar(confirmPass,valpass)
})

confirmPass.addEventListener('input', e =>{
    valMacth = e.target.value === inputPass.value;
    validar(confirmPass,valMacth)
})



const validar = (input,value)=>{
    btnRegistro.disabled = valname && valemail && valpass && valMacth ? false : true;
    
    console.log(btnRegistro.disabled);
    if (value) {
        input.classList.remove('focus:outline-blue-600', 'outline-4');
        input.classList.remove('focus:outline-red-700', 'outline-4');
        input.classList.add('focus:outline-green-700', 'outline-4');
    }else if(input.value === ''){
        input.classList.remove('focus:outline-green-700', 'outline-4');
        input.classList.remove('focus:outline-red-700', 'outline-4');
        input.classList.add('focus:outline-blue-600', 'outline-4');
    }else{
        input.classList.remove('focus:outline-blue-600', 'outline-4');
        input.classList.remove('focus:outline-green-700', 'outline-4')
        input.classList.add('focus:outline-red-700', 'outline-4')
    }
}

create.addEventListener('submit', async e =>{
    e.preventDefault();

    try {
        const newUser = {
            name:inputName.value,
            email:inputE.value,
            password:inputPass.value,
            rol: 'Client'
        }        

        create.reset();

        const response = await axios.post('/api/users', newUser);
        console.log(response);
    
        console.log(newUser);
        createNotification(false,response.data.message)
    } catch (error) {
        console.log(error);
        createNotification(true,error.response.data.error)
    }
})
