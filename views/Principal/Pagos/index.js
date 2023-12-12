const closeButton = document.querySelector('#close-modal');
const closeButton2 = document.querySelector('#close-modal2');
const closeButton3 = document.querySelector('#close-modal3');
const modalPago = document.querySelector('#modal-componet-container');
const modalCash = document.querySelector('#modal-componet-cash');
const modalPaypal = document.querySelector('#modal-componet-paypal')
const modalContainer = document.querySelector('#modal-container');
const buttonPago = document.querySelector('#pago');
const buttonCash = document.querySelector('#cash');
const buttonPaypal = document.querySelector('#Paypal');
const priceDolar = document.querySelector('#tasa');

window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    console.log('entra');
    contenedor.classList.add('hidden');
})

buttonPaypal.addEventListener("click", () => {
    modalPaypal.classList.remove('hidden');
})

const text = document.createElement('p')

buttonPago.addEventListener('click', () => {
    //openModal();
    modalPago.classList.remove('hidden');
})

closeButton.addEventListener('click', () => {
    //closeModal();
    modalPago.classList.add('hidden');
   
})

closeButton2.addEventListener('click', () =>{
    modalCash.classList.add('hidden');
})

closeButton3.addEventListener('click', () =>{
    modalPaypal.classList.add('hidden');
})

buttonCash.addEventListener('click', () => {
    modalCash.classList.remove('hidden');
})

//eventos
//agregar pagos a la db 

const addPagoMovil = document.querySelector('agg-pMovil');
const cantidad = document.querySelector('#cantidad');
const referencia = document.querySelector('#referencia');

(async () => {
   const NewPago = {
        referencia:referencia.value,
        cantidad:cantidad.value,
    }
})
const objtPago = {
    referencia,
    cantidad,
};



/*
function openModal(){
    showAndHide(modalContainer, 
    ["block","bg-fadeIn"], 
    ["hidden","bg-fadeOut"]
    );
    showAndHide(modalPago, ["modal-scaleIn"], ["modal-scaleOut"]);
}

function closeModal() {
    showAndHide(
        modalContainer, 
        ["bg-fadeOut"], 
        ["bg-fadeIn"]);
        showAndHide(modalPago, ["modal-scaleOut"], ["modal-scaleIn"]);
}

function showAndHide(element, classesToAdd, classesToRemove){
    element.classList.remove(...classesToRemove);
    element.classList.add(...classesToAdd);
} */
