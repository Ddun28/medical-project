//selectores input
const inputEdad = document.querySelector('#edad');
const inputTlf = document.querySelector('#tlf');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');
const contenedor = document.querySelector('#container');
const formulario = document.querySelector('#citas');
const notificacion = document.querySelector('#alerta')
let editar;

//con esto validamos que el cliente no pueda seleccionar una fecha anterior a la actual
var fechaActual = new Date().toISOString().split("T")[0];
inputFecha.setAttribute("min", fechaActual);
inputFecha.setAttribute("min", fechaActual);
//console.log(fechaActual)

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

                })
    }
    limpiarHTML(){
        while(contenedor.firstChild){
         contenedor.removeChild(contenedor.firstChild);
        }
    }
}

function eliminarCita(id) {
    console.log('eliminar cita');
    administrarCitas.eliminarCita(id);

    createNotification(false, "Se elimino correctamente")
    useri.imprimirCitas(administrarCitas);
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
