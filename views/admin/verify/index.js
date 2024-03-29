window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    //console.log('entra');
    var body = document.querySelector("body");
    body.classList.remove('overflow-hidden')
    contenedor.classList.add('hidden');
})

const formCedula = document.querySelector("#filtroForm");   
const mostrarPagos = document.querySelector("#pagos");

formCedula.addEventListener('submit', async e => {
  e.preventDefault();
  eliminarBusqueda();
  
  const cedula = document.querySelector("#cedula").value; 
  
  if (cedula === '') {
    return;
  } else {
    try {
        const {data} = await axios.get(`/api/citas/buscar?cedula=${cedula}`)
      console.log(data);    
      
      data.forEach(i => {
        const {user} = i;
        
      
        let id = user.id;
        
    filtrarPagosPorCedula(id);
    filtrarPagosPorCedula2(id);
  }); 
    } catch (error) {
        console.log(error);
    }
  }
});

async function filtrarPagosPorCedula(id) {
 const {data} = await axios.get(`/api/pagos/${id}`)
  //console.log(data);
  data.forEach(pago => {
    const viewPagos = document.createElement('div');
    viewPagos.classList.add(
      'block', 'max-w-sm', 'p-6', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'hover:bg-gray-100',
      'dark:border-gray-700', 'dark:hover:bg-gray-700', 'dark:bg-gray-800'
    );

    let content = '';

    if (pago.metodo === 'Efectivo') {
      content += `<p class="font-normal text-gray-700 dark:text-white">Cantidad Pagada: ${pago.Cantidad}</p>`;
      content += `<p class="font-normal text-gray-700 dark:text-white">Metodo de pago: ${pago.metodo}</p>`;
      content += `<p class="font-medium text-gray-700 dark:text-white">Estado del Pago: ${pago.estado}</p>`;

    } else {
      content += `<h5 class="mb-2 font-normal tracking-tight text-gray-900 dark:text-white">Referencia del pago: ${pago.Referencia}</h5>`;
      content += `<p class="font-normal text-gray-700  dark:text-white">Cantidad Pagada: ${pago.Cantidad}</p>`;
      content += `<p class="font-normal text-gray-700 dark:text-white">Metodo de pago: ${pago.metodo}</p>`;
      content += `<p class="font-medium text-gray-700 dark:text-white">Estado del Pago: ${pago.estado}</p>`;
    }

    viewPagos.innerHTML = content;
    mostrarPagos.appendChild(viewPagos);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'justify-around');
    
    const buttonAprobar = document.createElement('button');
    buttonAprobar.classList.add('border', 'rounded', 'text-white', 'bg-green-500', 'p-1', 'mt-1', 'flex', 'justify-center');
    buttonAprobar.innerText = 'Aprobar';
    buttonAprobar.addEventListener('click', async e => {
      e.preventDefault();
      await axios.put(`/api/pagos/${pago.id}`, { estado: 'Aprobada' });
      location.reload();
    });
    buttonContainer.appendChild(buttonAprobar);
    
    const buttonCancelar = document.createElement('button');
    buttonCancelar.classList.add('border', 'rounded', 'text-white', 'bg-red-500', 'p-1', 'mt-1', 'flex', 'justify-center');
    buttonCancelar.innerText = 'Cancelar';
    buttonCancelar.addEventListener('click', async e => {
      e.preventDefault();
      await axios.put(`/api/pagos/${pago.id}`, { estado: 'Cancelada' });
      location.reload();
    });
    buttonContainer.appendChild(buttonCancelar);
    
    viewPagos.appendChild(buttonContainer);
  });
}

      
      const eliminarBusquedaBtn = document.getElementById('eliminarBusqueda');

      
      eliminarBusquedaBtn.addEventListener('click', () => {
        eliminarBusqueda();
      });
      
      function eliminarBusqueda() {
        while (mostrarPagos.firstChild) {
          mostrarPagos.removeChild(mostrarPagos.firstChild);
        }
        
        const paypalDiv = document.getElementById('paypal');
        while (paypalDiv.firstChild) {
          paypalDiv.removeChild(paypalDiv.firstChild);
        }
      }

async function filtrarPagosPorCedula2 (id){
  const paypalDiv = document.getElementById('paypal');
  axios.get(`/api/orders/${id}`)
    .then(response => {
      const paymentData = response.data;
      paymentData.forEach(i => {
        const { id, status } = i;
        const styleDiv = document.createElement('div');
        styleDiv.classList.add(
          'block','max-w-sm','p-6','bg-white','border','border-gray-200','rounded-lg','shadow','hover:bg-gray-100',
      'dark:bg-gray-800','dark:border-gray-700','dark:hover:bg-gray-700'
        );
      
        
        const paymentTitle = document.createElement('p');
        paymentTitle.classList.add('dark:text-white')
        paymentTitle.textContent = 'Pago Realizado con PayPal';
  
        const paymentId = document.createElement('p');
        paymentId.classList.add('dark:text-white')
        paymentId.textContent = `ID: ${id}`;
  
        const paymentStatus = document.createElement('p');
        paymentStatus.classList.add('dark:text-white')
        paymentStatus.textContent = `Estado del pago: ${status}`;
  
        
        styleDiv.appendChild(paymentTitle);
        styleDiv.appendChild(paymentId);
        styleDiv.appendChild(paymentStatus);
  
        
        paypalDiv.appendChild(styleDiv);
      });
    })
    .catch(error => {
      console.error(error);
    });
}     

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});