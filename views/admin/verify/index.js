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
      'block','max-w-sm','p-6','bg-white','border','border-gray-200','rounded-lg','shadow','hover:bg-gray-100',
      'dark:bg-gray-800','dark:border-gray-700','dark:hover:bg-gray-700'
    );

    let content = '';

    if (pago.metodo === 'Efectivo') {
      content += `<p class="font-normal text-gray-700 dark:text-gray-400">Cantidad Pagada: ${pago.Cantidad}</p>`;
      content += `<p class="font-normal text-gray-700 dark:text-gray-400">Metodo de pago: ${pago.metodo}</p>`;
      content += `<p class="font-medium text-gray-700 dark:text-gray-400">Estado del Pago: ${pago.estado}</p>`;

    } else {
      content += `<h5 class="mb-2 font-normal tracking-tight text-gray-900 dark:text-white">Referencia del pago: ${pago.Referencia}</h5>`;
      content += `<p class="font-normal text-gray-700 dark:text-gray-400">Cantidad Pagada: ${pago.Cantidad}</p>`;
      content += `<p class="font-normal text-gray-700 dark:text-gray-400">Metodo de pago: ${pago.metodo}</p>`;
      content += `<p class="font-medium text-gray-700 dark:text-gray-400">Estado del Pago: ${pago.estado}</p>`;
    }

    viewPagos.innerHTML = content;
    mostrarPagos.appendChild(viewPagos);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex');
    
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
    
    const buttonPendiente = document.createElement('button');
    buttonPendiente.classList.add('border', 'rounded', 'text-white', 'bg-yellow-500', 'p-1', 'mt-1', 'flex', 'justify-center');
    buttonPendiente.innerText = 'Pendiente';
    buttonPendiente.addEventListener('click', async e => {
      e.preventDefault();
      await axios.put(`/api/pagos/${pago.id}`, { estado: 'En espera' });
      location.reload();
    });
    buttonContainer.appendChild(buttonPendiente);
    
    viewPagos.appendChild(buttonContainer);
  });
}

      // Obtén una referencia al botón de eliminar
      const eliminarBusquedaBtn = document.getElementById('eliminarBusqueda');

      // Agrega un evento de clic al botón
      eliminarBusquedaBtn.addEventListener('click', () => {
        eliminarBusquedaYMostrarProductos();
      });
      
      // Función para eliminar la búsqueda y mostrar los productos
      function eliminarBusquedaYMostrarProductos() {
        
        while (mostrarPagos.firstChild) {
          mostrarPagos.removeChild(mostrarPagos.firstChild);
        }
      }