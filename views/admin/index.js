window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    //console.log('entra');
    //var body = document.querySelector("body");
    //body.classList.remove('overflow-hidden')
    contenedor.classList.add('hidden');
})

 const filtroForm = document.getElementById('filtroForm');
 filtroForm.addEventListener('submit', function(event) {
   event.preventDefault();
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
      const { Edad, Fecha, Sintomas, id: citaId } = cita;
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
        <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${name}</p>
      </td>
      
      <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        <a href="/verify-pago/${pago}" class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">Verificar Pago</a>
      </td>
      
      <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${fechaFormateada}</p>
      </td>

      <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${Sintomas}</p>
      </td>
      
      <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
        <a href="/agendar-recipe/${agendar}/${user}" class="text-teal-600 mr-5 hover:text-teal-900">Agendar Recipe</a>
      </td>`;

      listado.appendChild(row);
    });
  });
}
async function actualizarTablaCitas(citas) {
    // Obtener el tbody de la tabla
    // Eliminar las filas existentes
    while (listado.firstChild) {
      listado.removeChild(listado.firstChild);
    }
    // Crear las nuevas filas con los resultados filtrados
    citas.forEach(cita => {
      const { user, pagos, citas, Telefono, Fecha, Hora, Sintomas, id } = cita;
      const row = document.createElement('tr');
      row.id = id;
     // let agendar = id;
  
    
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
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${user.name}</p>
   </td>
   
   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <a href="/verify-pago/${user.pagos}" class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">Revisar Pago</a>
   </td>
   
   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${fechaFormateada}</p>
   </td>

   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${Sintomas}</p>
   </td>
   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <a href="/agendar-recipe/${user.id}" class="text-teal-600 mr-5 hover:text-teal-900">Agendar Recipe</a>
    </td>
          `;
          listado.appendChild(row);
        });
  
      };
   
      // Obtén una referencia al botón de eliminar
const eliminarBusquedaBtn = document.getElementById('eliminarBusqueda');

// Agrega un evento de clic al botón
eliminarBusquedaBtn.addEventListener('click', () => {
  eliminarBusquedaYMostrarProductos();
});

// Función para eliminar la búsqueda y mostrar los productos
function eliminarBusquedaYMostrarProductos() {
  // Aquí puedes agregar lógica para eliminar la búsqueda, por ejemplo, limpiando el valor del campo de búsqueda o restableciendo los filtros aplicados.
  while (listado.firstChild) {
    listado.removeChild(listado.firstChild);
  }
  rangoFecha.selectedIndex = -1;
  // Llama a la función para mostrar los productos nuevamente
  mostrarProductos();
}
  