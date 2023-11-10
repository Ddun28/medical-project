const login = document.querySelector('#login');
const inputL = document.querySelector('#input-login');
const inputP = document.querySelector('#pass');
const alerta = document.querySelector('#alerta');


login.addEventListener('submit', async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/admin', {
        method:'GET'
    });

    const administrador = await response.json()

    const admin = administrador.find(admin => admin.nombre === inputL.value);
    const passA = administrador.find(pass => pass.contrasena === inputP.value);

    if(admin && passA){
        localStorage.setItem('usuario', JSON.stringify(admin));
        window.location.href = '../admin/index.html'
    }

    const respuesta = await fetch('http://localhost:3000/usuario', {
        method: 'GET'
    });
    const usuarios = await respuesta.json();

    const usuario = usuarios.find(usuario => usuario.correo === inputL.value)
    const contrasena = usuarios.find(usuario => usuario.contrasena === inputP.value)
    
    if(!inputL.value && !inputP.value) {
        alerta.innerHTML = 'Todos los campos son obligatorios'
        alerta.classList.add('show-notification' , 'p-1')
        setTimeout(()=> {
            alerta.remove('show-notification', 'p-1')
        },2000)

    }else if (!usuario) {
        //console.log('contrasena incorrecta');
        alerta.innerHTML = 'El usuario no existe'
        alerta.classList.add('show-notification');
        setTimeout(()=> {
            alerta.remove('show-notification')
        },2000)
       
    }else if(!contrasena){
        alerta.innerHTML = 'Contrasena incorrecta'
        alerta.classList.add('show-notification')
        setTimeout(()=>{
            alerta.remove('show-notification')
        },2000)

    }else {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        window.location.href = '../principal/index.html'
    }

})