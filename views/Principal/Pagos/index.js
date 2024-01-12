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
const formulario = document.querySelector('#formulario');
const container = document.querySelector('#container');
const price = document.querySelector('#price');
const formularioEfectivo = document.querySelector('#formulario-efectivo');
const cantidadEfectivo = document.querySelector('#cantidad-efectivo');


window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    body.classList.remove('overflow-hidden')
    console.log('entra');
    contenedor.classList.add('hidden');
})

document.addEventListener('DOMContentLoaded', formulario.reset());

buttonPaypal.addEventListener("click", () => {
    modalPaypal.classList.remove('hidden');
})

const text = document.createElement('p')


//eventos del modal
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

const addPago = document.querySelector('agg-Pago');
const cantidad = document.querySelector('#cantidad');
const referencia = document.querySelector('#referencia');

//agregar pagos a la db 
formularioEfectivo.addEventListener('submit', async e  => {
    e.preventDefault();
    try {
        const NewPago = {
            Cantidad: cantidadEfectivo.value,
            metodo: 'Efectivo'
        }

        const response = await axios.post('/api/pagos', NewPago);
        if (response.data.metodo === 'Efectivo') {
            crearReciboEfectivo(NewPago.Cantidad, NewPago.metodo, response.data.id);
        } else {
            crearRecibo(NewPago.Cantidad, NewPago.metodo, response.data.id);
        }
        modalPago.classList.add('hidden');
        modalCash.classList.add('hidden');

        createNotification(false, 'Pago Registrado');

    } catch (error) {
        console.log(error);
    }
});

const crearReciboEfectivo = (Cantidad, metodo, estado,id) => {
    const List = document.createElement('div');
    List.id = id;
    List.classList.add('bg-gray-50', 'shadow-lg', 'w-64', 'mx-16', 'p-4', 'justify-center', 'flex-col', 'gap-3', 'md:w-64', 'px-2', 'flex', 'm-2', 'dark:bg-slate-900');

    List.innerHTML = `<div class="p-3">
    <p>Cantidad Pagada: ${Cantidad}</p>
    <p>Metodo de Pago: ${metodo}</p>
    <p>Estado del pago: ${estado}</p>
    </div>`;

    container.appendChild(List);

    
    if(estado === "Aprobado"){
      
const qrContainer = document.createElement('div');
qrContainer.id = `qr-${id}`;
List.appendChild(qrContainer);
qrContainer.classList.add('flex', 'justify-center', 'items-center"');

// Genera el Qr
const qr = new QRCode(document.getElementById(`qr-${id}`), {
text: `Metodo de pago: ${metodo}\nEstado del pago: ${estado}`,
width: 128,
height: 128
});
}
};

formulario.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const NewPago = {
            Referencia:referencia.value,
            Cantidad:cantidad.value,
            metodo:'Pago Móvil'
        }

        const response = await axios.post('/api/pagos', NewPago)
        crearRecibo(NewPago.Referencia, NewPago.Cantidad, NewPago.metodo,response.data.id);
        modalPago.classList.add('hidden');
        modalCash.classList.add('hidden');
        

        createNotification(false, 'Pago Registrado')
    } catch (error) {
        createNotification(true,error.response.data.error)
    }

})

const crearRecibo = (Referencia, Cantidad, metodo, estado,id) => {
    const List = document.createElement('div');
    List.id = id;
    List.classList.add('bg-gray-50', 'shadow-lg', 'w-64',  'mx-16' ,'p-4', 'justify-center' ,'flex-col'
    ,'gap-3' ,'md:w-64' ,'px-2' ,'flex', 'm-2', 'dark:bg-slate-900')

    List.innerHTML = `<div class="p-3">
    <p>Nro de Referencia: ${Referencia}</p>
    <p>Cantidad Pagada: ${Cantidad}</p>
    <p>Metodo de Pago: ${metodo}</p>
    <p>Estado: ${estado}</p>
    </div>`

    container.appendChild(List)
    
    if(estado === "Aprobado"){
          // Create a container for the QR code
  const qrContainer = document.createElement('div');
  qrContainer.classList.add('flex', 'justify-center', 'items-center"');
  qrContainer.id = `qr-${id}`;
     // Append the QR code container to the list
  List.appendChild(qrContainer);
  // Generate the QR code
  const qr = new QRCode(document.getElementById(`qr-${id}`), {
    text: `Nro de Referencia: ${Referencia}\nEstado del pago: ${estado}`,
    width: 128,
    height: 128
  });
 }
};

//boton de paypal
window.paypal
  .Buttons({
    style: {
      shape: "pill",
      layout: "vertical",
      color:  'blue',
    },
    async createOrder() {
      try {
        const response = await fetch("/api/orders/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // use the "body" param to optionally pass additional order information
          // like product ids and quantities
          body: JSON.stringify({
            cart: [
              {
                id: "Pago de consulta",
                quantity: "1",
              },
            ],
          }),
        });

        const orderData = await response.json();

        if (orderData.id) {
          return orderData.id;
        } else {
          const errorDetail = orderData?.details?.[0];
          const errorMessage = errorDetail
            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
            : JSON.stringify(orderData);

          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error(error);
        resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
      }
    },
    async onApprove(data, actions) {
      try {
        const response = await fetch(`/api/orders/${data.orderID}/capture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const orderData = await response.json();
        // Three cases to handle:
        //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        //   (2) Other non-recoverable errors -> Show a failure message
        //   (3) Successful transaction -> Show confirmation or thank you message

        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
          return actions.restart();
        } else if (errorDetail) {
          // (2) Other non-recoverable errors -> Show a failure message
          throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
        } else if (!orderData.purchase_units) {
          throw new Error(JSON.stringify(orderData));
        } else {
          // (3) Successful transaction -> Show confirmation or thank you message
          // Or go to another URL:  actions.redirect('thank_you.html');
          const transaction =
            orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
            orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
            createNotification(false,`Transaction ${transaction.status}: ${transaction.id}<br><br>Pago realizado con exito`,);
            modalPaypal.classList.add('hidden');
          console.log(
            "Capture result",
            orderData,
            JSON.stringify(orderData, null, 2),
          );
        }
      } catch (error) {
        console.error(error);
        resultMessage(
          `Sorry, your transaction could not be processed...<br><br>${error}`,
        );
      }
    },
  })
  .render("#paypal-button-container");

// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}



//carga de la bd de la api
(async () => {
    try {
        const {data} = await axios.get('/api/pagos', {
            withCredentials: true
        });
        //console.log(data);
        data.forEach(i => {
            const { Referencia, Cantidad, estado ,metodo,id} = i;
            if (metodo === 'Efectivo') {
              crearReciboEfectivo(Cantidad, metodo,estado ,id);
          } else {
              crearRecibo(Referencia, Cantidad, metodo,estado ,id);
          }
        })
        console.log(data);
    } catch (error) {
        window.location.pathname = '/login';
        console.log(error);
    }
})();


(async ( ) => {    
    const {data} = await axios.get('/api/citas');
    console.log(data);
    price.innerHTML =`$${data.length * 40} `;
  })();




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
