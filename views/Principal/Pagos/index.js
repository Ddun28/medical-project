const closeButton = document.querySelector('#close-modal');
const closeButton2 = document.querySelector('#close-modal2');
const modalPago = document.querySelector('#modal-componet-container');
const modalCash = document.querySelector('#modal-componet-cash');
const modalContainer = document.querySelector('#modal-container');
const buttonPago = document.querySelector('#pago');
const buttonCash = document.querySelector('#cash');
const priceDolar = document.querySelector('#tasa');

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

buttonCash.addEventListener('click', () => {
    modalCash.classList.remove('hidden');
})


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
