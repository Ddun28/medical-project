window.addEventListener("load", function(){
  var contenedor = document.querySelector("#contenedor");
  body.classList.remove('overflow-hidden')
  contenedor.classList.add('hidden');
})


const filtroFormCedula = document.querySelector("#filtroFormCedula");

filtroFormCedula.addEventListener('submit', e => {
  e.preventDefault();
  
  const cedula = document.querySelector("#cedula").value; 
  
  if (cedula === '') {
    return;
  } else {
    filtrarCitasPorCedula(cedula); 
  }
});

function filtrarCitasPorCedula(cedula) {
  axios.get(`/api/citas/buscar?cedula=${cedula}`)
    .then(response => {
      const citas = response.data;
      console.log(citas);
      actualizarTablaCitas(citas);
    })
    .catch(error => {
      console.error(error);
    });
}

 const filtroForm = document.getElementById('filtroForm');
 filtroForm.addEventListener('submit', e => {
   e.preventDefault();
   const rangoFecha = document.getElementById('rangoFecha').value;
   if (rangoFecha === 'Seleccione la fecha') {
    return; // Hacer un return si el campo de selección no se ha seleccionado
  } else if (rangoFecha !== '') {
    filtrarCitasPorFecha(rangoFecha);
  } else {
    return; 
  }
 });

 
 function filtrarCitasPorFecha(rangoFecha) {
   axios.get(`/api/citas/filtro/${rangoFecha}`)
     .then(response => {
      
       const citas = response.data;
       //console.log(citas);
      
      actualizarTablaCitas(citas);
     })
     .catch(error => {
       
       console.error(error);
     });
 }

document.addEventListener('DOMContentLoaded', mostrarProductos);
const listado = document.querySelector("#usuarios");

async function mostrarProductos() {
  const { data } = await axios.get('/api/users/all');
  // console.log(data);

  data.forEach((i) => {
    const { name, pagos, citas, Telefono, Fecha, Hora, Sintomas, id } = i;
    let pago = id;
    let user = id;
    citas.forEach((cita) => {
      const { Edad, Cedula,Fecha, Sintomas, id: citaId } = cita;
      const fechaISO8601 = Fecha;
      const row = document.createElement('tr');
      row.id = citaId;
      let agendar = citaId;

      const fecha = new Date(fechaISO8601);
      const dia = fecha.getUTCDate().toString().padStart(2, '0');
      const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getUTCFullYear().toString();
      const fechaFormateada = `${dia}-${mes}-${anio}`;
      console.log(fechaFormateada);

      row.innerHTML += `<td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5 dark:text-white">${name}</p>
      </td>

      <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
      <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5 dark:text-white">${Cedula}</p>
    </td>
      
      <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5 dark:text-white">${fechaFormateada}</p>
      </td>

      <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5 dark:text-white">${Sintomas}</p>
      </td>
      
      <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        <a href="/agendar-recipe/${agendar}/${user}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Agendar</a>
      </td>

      <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
       <a href="/verify-pago/${pago}" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Verificar</a>
    </td>
     
      `;

      listado.appendChild(row);
    });
  });
}
async function actualizarTablaCitas(citas) {
    // Eliminar las filas existentes
    while (listado.firstChild) {
      listado.removeChild(listado.firstChild);
    }
    console.log(citas);
    // Crear las nuevas filas con los resultados filtrados
    citas.forEach(cita => {
      const { user, pagos, citas, Cedula,Telefono, Fecha, Hora, Sintomas, id } = cita;
      const row = document.createElement('tr');
      row.id = id;
     // let agendar = id;
      let pago = user.id;
      let userId = user.id;
    let agendar = id
        const fechaISO8601 = Fecha;
  
        const fecha = new Date(fechaISO8601);
        const dia = fecha.getUTCDate().toString().padStart(2, '0');
        const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getUTCFullYear().toString();
        const fechaFormateada = `${dia}-${mes}-${anio}`;
        console.log(fechaFormateada);

console.log(user.pagos);       
      
          row.innerHTML += `
          <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5 dark:text-white">${user.name}</p>
   </td>
   
   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
   <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5 dark:text-white">${Cedula}</p>
  </td>
   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5 dark:text-white">${fechaFormateada}</p>
   </td>

   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5 dark:text-white">${Sintomas}</p>
   </td>
   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
   <a href="/agendar-recipe/${agendar}/${userId}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Agendar</a>
 </td>
 
 <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
  <a href="/verify-pago/${pago}" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Verificar</a>
</td>
          `;
          listado.appendChild(row);
        });
  
      };
   
      
const eliminarBusquedaBtn = document.getElementById('eliminarBusqueda');


eliminarBusquedaBtn.addEventListener('click', () => {
  eliminarBusquedaYMostrarProductos();
});

// Función para eliminar la búsqueda y mostrar los productos
function eliminarBusquedaYMostrarProductos() {
  
  while (listado.firstChild) {
    listado.removeChild(listado.firstChild);
  }
  rangoFecha.selectedIndex = -1;

  const cedula = document.querySelector('#cedula');
  cedula.value = '';
  // Llama a la función para mostrar los productos nuevamente
  mostrarProductos();
}
  