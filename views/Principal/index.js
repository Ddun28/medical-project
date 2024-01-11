//console.log(axios);
//selectores input
const inputEdad = document.querySelector('#edad');
const inputTlf = document.querySelector('#tlf');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');
const inputCedula = document.querySelector('#cedula');
const contenedor = document.querySelector('#container');
const formulario = document.querySelector('#citas');
const notificacion = document.querySelector('#alerta')
const userName = document.querySelector('#name');
let editar = false;
let editandoId = null;

window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    body.classList.remove('overflow-hidden')
    contenedor.classList.add('hidden');
})

document.addEventListener('DOMContentLoaded', formulario.reset());

//con esto validamos que el cliente no pueda seleccionar una fecha anterior a la actual
var fechaActual = new Date().toISOString().split("T")[0];
inputFecha.setAttribute("min", fechaActual);
inputFecha.setAttribute("min", fechaActual);
//console.log(fechaActual)

//se extrae el nombre de usuario de la bd
(async ( ) => {    
    const {data} = await axios.get('/api/users');
    userName.innerHTML =`${data.name}`;
  })();

//validacion REGEX
const valPhone = /^(?:(?:00|\+)58|0)(?:2(?:12|4[0-9]|5[1-9]|6[0-9]|7[0-8]|8[1-35-8]|9[1-5]|3[45789])|4(?:1[246]|2[46]))\d{7}$/

let Phoneval = false;


//se valida que el numero de telefono sea correcto
inputTlf.addEventListener('change', e => {
    Phoneval = valPhone.test(e.target.value);
    console.log('funciona');
    if(!Phoneval){
        createNotification(true, 'Numero invalido')
        return
    }
})

formulario.addEventListener('submit', async e => {
    e.preventDefault();

    if (!inputEdad.value ||  !inputTlf.value || !inputFecha.value || !inputHora.value || !inputSintomas.value){
        createNotification(true, "Llenar todos los campos")
        return
    }      
        try {
            //se crea un objeto para guardar en la bd
        const newCita = {
            Edad: inputEdad.value,
            Telefono: inputTlf.value,
            Cedula: inputCedula.value,
            Fecha: inputFecha.value,
            Hora: inputHora.value,
            Sintomas: inputSintomas.value
        }

        const response = await axios.post('/api/citas', newCita);
        //console.log(response);
        //console.log(newCita);
        //console.log(response.data.id);


        crearLIst(newCita.Edad, newCita.Cedula,newCita.Telefono, newCita.Fecha, newCita.Hora, newCita.Sintomas, response.data.id)
        formulario.reset();
        createNotification(false, 'Cita Agendada')
    } catch (error) {

        console.log(error);
        createNotification(true,error.response.data.error)
    }

})

//se crear las citas y se muestran
const crearLIst = ( Edad, Cedula,Telefono, Fecha, Hora, Sintomas, id) => {
    const listado = document.createElement('div');
    listado.classList.add('bg-gray-50' ,'rounded-2xl' ,'shadow-lg', 'w-64', 'mx-16' ,'p-4', 'justify-center' ,'flex-col'
    ,'gap-3' ,'md:w-64' ,'px-2' ,'flex', 'm-2', 'dark:bg-slate-900');
    //se le asigna un id a la lista
    listado.id = id;

    contenedor.classList.add('flex','flex-col', 'justify-center');
    console.log(Fecha);
    const fechaISO8601 = Fecha;

const fecha = new Date(fechaISO8601);
// Convierte la fecha a la zona horaria local
const dia = fecha.getUTCDate().toString().padStart(2, '0');
const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
const anio = fecha.getUTCFullYear().toString();
const fechaFormateada = `${dia}-${mes}-${anio}`;
console.log(fechaFormateada);

    listado.innerHTML = `<div class="p-4">
    <p>Edad: ${Edad}</p>
    <p>Cedula: ${Cedula}</p>
    <p>Telefono: ${Telefono}</p>
    <p>Fecha: ${fechaFormateada}</p>
    <p>Hora: ${Hora}</p>
    <p>Sintomas: ${Sintomas}</p>
    </div>
    `
    const btnEditar = document.createElement('button');
    btnEditar.classList.add('text-white',
        'border-solid', 'border-2', 
        'rounded-md', 'w-full', 'bg-blue-400', 'p-1', 
        'hover:bg-blue-800', 'ease-out', 'duration-300');
    btnEditar.innerHTML = 'Editar'
    btnEditar.onclick = async () =>cargarEdicion(id);
    listado.appendChild(btnEditar);
    

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('text-white', 'w-full', 
    'border-solid', 'border-2' ,
    'rounded-md', 'bg-red-400','p-1', 
    'hover:bg-red-800')
    btnEliminar.innerHTML= 'Eliminar'
    btnEliminar.onclick = async ()=> eliminarCita(id)
    listado.appendChild(btnEliminar);

    contenedor.appendChild(listado);
    //funcion al boton de eliminar, se pasa el parametro id como
    //identificador

    async function eliminarCita(id) {
         listado.remove();
         //se elimina de la bd
        createNotification(false, 'Se elimino correctamente')
        await axios.delete(`/api/citas/${id}`);

    }

    async function cargarEdicion(id){
        if(!editar){
         console.log('edit');
         editar = true;

         inputEdad.value= Edad,
         inputTlf.value= Telefono,
         inputFecha.value= Fecha,
         inputHora.value= Hora,
         inputSintomas.value= Sintomas,
 //cambiar el texto al boton
 btnEditar.textContent = 'Guardar';
             }else {
                editar = false;
                const editcita =  {
                Edad: inputEdad.value,
                Telefono: inputTlf.value,
                Fecha: inputFecha.value,
                Hora: inputHora.value,
                Sintomas: inputSintomas.value
            };
                formulario.reset();
                await axios.patch(`/api/citas/${id}`, editcita)
                createNotification(false, 'Cita modificada');
            console.log('editando x2');
        }
        return;
    }
}
    
    

//carga de la bd de la api
(async () => {
    try {
        const {data} = await axios.get('/api/citas', {
            withCredentials: true
        });
        //console.log(data);
        data.forEach(cita => {
            const { Edad, Cedula,Telefono, Fecha, Hora, Sintomas, id} = cita;
            crearLIst(Edad, Telefono, Fecha, Hora,Sintomas,id);
        })
        console.log(data);
    } catch (error) {
        window.location.pathname = '/login';
        console.log(error);
    }
})();

/*
(async ( ) => {
    const {data} = await axios.get('/api/citas');
    data.forEach(i => {
    const {Edad, Telefono, Fecha, Hora, Sintomas,id} = i;
    //userName.innerHTML = `${name}`;
    //console.log(data);
    
    const listado = document.createElement('div');
    listado.classList.add('bg-gray-50' ,'rounded-2xl' ,'shadow-lg', 'w-64', 'mx-16' ,'p-4', 'justify-center' ,'flex-col'
    ,'gap-3' ,'md:w-64' ,'px-2' ,'flex', 'm-2', 'dark:bg-slate-900');
    listado.id = id;

    contenedor.classList.add('flex','flex-col', 'justify-center');
    
    listado.innerHTML = `<div class="p-4">
    <p>Edad: ${Edad}</p>
    <p>Telefono: ${Telefono}</p>
    <p>Fecha: ${Fecha}</p>
    <p>Hora: ${Hora}</p>
    <p>Sintomas: ${Sintomas}</p>
    `

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('text-white',
        'border-solid', 'border-2', 
        'rounded-md', 'w-full', 'bg-blue-400', 'p-1', 
        'hover:bg-blue-800', 'ease-out', 'duration-300');
    btnEditar.innerHTML = 'Editar'
    btnEditar.onclick = () =>cargarEdicion(citas);
    listado.appendChild(btnEditar);
    

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('text-white', 'w-full', 
    'border-solid', 'border-2' ,
    'rounded-md', 'bg-red-400','p-1', 
    'hover:bg-red-800')
    btnEliminar.innerHTML= 'Eliminar'
    btnEliminar.onclick = async ()=> eliminarCita2(id)
    listado.appendChild(btnEliminar);

    async function eliminarCita2(id) {
        console.log('eliminar cita');
        listado.remove();
         await axios.delete(`/api/citas/${id}`);
        createNotification(false, "Se elimino correctamente")
        useri.imprimirCitas(administrarCitas);
    }
    
    contenedor.appendChild(listado);

});

})();




formulario.addEventListener('submit', async e =>{
    e.preventDefault();

    try {
        const newCita = {
            Edad: inputEdad.value,
            Telefono: inputTlf.value,
            Fecha: inputFecha.value,
            Hora: inputHora.value,
            Sintomas: inputSintomas.value
        }

        formulario.reset();

        const response = await axios.post('/api/citas', newCita);
        console.log(response);
        
        console.log(newCita);
    } catch (error) {
        console.log(error);
        createNotification(true,error.response.data.error)
        
    }
})


class citas{
    constructor(){
        this.citas = []
    }
    agregarCitas(cita){
        this.citas = [...this.citas,cita]
        console.log(this.citas);
    }
    eliminarCita(id){
        this.citas = this.citas.filter(citas=>citas.id !== id)
    }
    editarCita(citaAct){
        this.citas = this.citas.map(citas=>citas.id === citaAct.id ? citaAct : citas)
    }
}


class ui{

    imprimirCitas({citas}){
        this.limpiarHTML();
    
                citas.forEach(citas =>{
                    const {Edad,Telefono,Fecha,Hora,Sintomas,id} = citas;
                    //console.log(id);        
                    
                    const listado = document.createElement('div');
                    listado.classList.add('bg-gray-50' ,'rounded-2xl' ,'shadow-lg', 'w-64', 'mx-16' ,'p-4', 'justify-center' ,'flex-col'
                    ,'gap-3' ,'md:w-64' ,'px-2' ,'flex', 'm-2', 'dark:bg-slate-900');
                    listado.dataset.id = id;

                    contenedor.classList.add('flex','flex-col', 'justify-center');
                    
                    listado.innerHTML = `<div class="p-4">
                    <p>Edad: ${Edad}</p>
                    <p>Telefono: ${Telefono}</p>
                    <p>Fecha: ${Fecha}</p>
                    <p>Hora: ${Hora}</p>
                    <p>Sintomas: ${Sintomas}</p>
                    `

                    const btnEditar = document.createElement('button');
                    btnEditar.classList.add('text-white',
                        'border-solid', 'border-2', 
                        'rounded-md', 'w-full', 'bg-blue-400', 'p-1', 
                        'hover:bg-blue-800', 'ease-out', 'duration-300');
                    btnEditar.innerHTML = 'Editar'
                    btnEditar.onclick = () =>cargarEdicion(citas);
                    listado.appendChild(btnEditar);
                    

                    const btnEliminar = document.createElement('button');
                    btnEliminar.classList.add('text-white', 'w-full', 
                    'border-solid', 'border-2' ,
                    'rounded-md', 'bg-red-400','p-1', 
                    'hover:bg-red-800')
                    btnEliminar.innerHTML= 'Eliminar'
                    btnEliminar.onclick = ()=> eliminarCita(id)
                    listado.appendChild(btnEliminar);

                    
                    contenedor.appendChild(listado);

                     function eliminarCita(id) {
                        console.log('eliminar cita');
                        administrarCitas.eliminarCita(id);
                        createNotification(false, "Se elimino correctamente")
                        useri.imprimirCitas(administrarCitas);
                    }
                    

                })
    }
    limpiarHTML(){
        while(contenedor.firstChild){
         contenedor.removeChild(contenedor.firstChild);
        }
    }
}



const useri = new ui();
const administrarCitas = new citas ();

eventListener();
function eventListener(){
    inputEdad.addEventListener('input',datosCitas);
    inputTlf.addEventListener('input',datosCitas);
    inputFecha.addEventListener('input',datosCitas);
    inputHora.addEventListener('input',datosCitas);
    inputSintomas.addEventListener('input',datosCitas);
    formulario.addEventListener('submit',nuevaCita);
}

const citasObj ={
    Edad:'',
    Telefono:'',
    Fecha:'',
    Hora:'',
    Sintomas:'',
}

function datosCitas(e) {
    citasObj[e.target.name] = e.target.value;
    //console.log(citasObj);
}

function nuevaCita(e){
    e.preventDefault();
    //se extrae la informacion del objeto
    const {Edad,Telefono,Fecha,Hora,Sintomas}= citasObj
    
if (administrarCitas.citas.length >= 15) {
    console.log('se alcanzo el limite');
    return
}
    //se validan los campos
    if(Edad === '' || Telefono === '' || Fecha === '' || Hora === '' || Sintomas === ''){
        createNotification(true, "Llenar los campos")
        console.log('error');
         return;
    }else if(editar){
    // console.log('estoy editando');
     formulario.querySelector('button[type="submit"]').textContent = 'Agendar'
     editar = false;
     administrarCitas.editarCita({...citasObj})
     createNotification(false, "Se edito correctamente")
     
    }else{
       // console.log('creando una nueva cita');
        citasObj.id = Date.now();
        administrarCitas.agregarCitas({...citasObj})
        createNotification(false,"se creo correctamente");
    }
    formulario.reset();
    reiniciarObj();
    useri.imprimirCitas(administrarCitas);
    //console.log(citasObj);
}


function reiniciarObj(){
    citasObj.Edad = '';
    citasObj.Telefono = '';
    citasObj.Fecha = '';
    citasObj.Hora = '';
    citasObj.Sintomas = '';
}

function cargarEdicion(cita) {
    const {Edad,Telefono,Fecha,Hora,Sintomas,id} = cita;

    inputEdad.value = Edad;
    inputTlf.value = Telefono;
    inputFecha.value = Fecha;
    inputHora.value = Hora;
    inputSintomas.value = Sintomas;

    //llenamos el objeto
    citasObj.Edad = Edad;
    citasObj.Telefono = Telefono;
    citasObj.Fecha = Fecha;
    citasObj.Hora = Hora;
    citasObj.Sintomas = Sintomas;
    citasObj.id = id;

    //cambiar el texto al boton
    formulario.querySelector('button[type=submit]').textContent = 'Guardar';

    editar = true;
}
*/