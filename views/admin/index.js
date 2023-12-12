window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    console.log('entra');
    contenedor.classList.add('hidden');
})

document.addEventListener('DOMContentLoaded', mostrarProductos);
const listado = document.querySelector("#usuarios");

async function mostrarProductos() {
    const {data} = await axios.get('/api/citas')
    data.forEach(i => {
        const {Edad, Telefono, Fecha, Hora, Sintomas, id} = i;
        const row = document.createElement('tr');
        row.id = id;
console.log(data);
       row.innerHTML += `<td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${Edad}</p>
   </td>
   
   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">$40</p>
   </td>
   
   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${Fecha}</p>
   </td>

   <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${Sintomas}</p>
   </td>
  `
    listado.appendChild(row)
    });
}