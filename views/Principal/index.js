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
        this.citas = this.citas.filter(i=>i.id !== id)
    }
    editarCita(citaAct){
        this.citas = this.citas.map(i=>i.id === citaAct.id ? citaAct : citas)
    }
}

class ui{
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add
    }
    imprimirCitas({citas}){
        this.limpiarHTML();
    
                citas.forEach(citas =>{
                    const {Edad,Telefono,Fecha,Hora,Sintomas} = citasObj;

                    const listado = document.createElement('div');
                    listado.classList.add('flex', 'flex-col');

                    contenedor.classList.add('rounded-2xl', 'shadow-lg');
                })
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
    console.log(citasObj);
}

function nuevaCita(e){
    e.preventDefault();
    //se extrae la informacion del objeto
    const {Edad,Telefono,Fecha,Hora,Sintomas}= citasObj

    //se validan los campos
    if(Edad === '' || Telefono === '' || Fecha === '' || Hora === '' || Sintomas === ''){
        console.log('error');
         return;
    }else {
        console.log('creando una nueva cita');
        citasObj.id = Date.now();
        administrarCitas.agregarCitas({...citasObj})
        console.log('se creo correctamente');
    }
    formulario.reset();
    reiniciarObj();
    console.log(citasObj);
    useri.imprimirCitas(administrarCitas)

}

function reiniciarObj(){
    citasObj.Edad = '';
    citasObj.Telefono = '';
    citasObj.Fecha = '';
    citasObj.Hora = '';
    citasObj.Sintomas = '';
}