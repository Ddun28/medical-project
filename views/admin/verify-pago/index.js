window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    console.log('entra');
    contenedor.classList.add('hidden');
})

const mostrarPagos = document.querySelector("#pagos");
(async () => {
  const id = window.location.pathname.split('/')[2];
  const { data } = await axios.get(`/api/pagos/${id}`);
  console.log(data);

  const mostrarPagos = document.getElementById('pagos'); // Reemplaza 'mostrarPagos' con el ID o selector correcto

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
      content += `<p class="font-medium text-gray-700 dark:text-gray-400">${pago.estado}</p>`;

    } else {
      content += `<h5 class="mb-2 font-normal tracking-tight text-gray-900 dark:text-white">Referencia del pago: ${pago.Referencia}</h5>`;
      content += `<p class="font-normal text-gray-700 dark:text-gray-400">Cantidad Pagada: ${pago.Cantidad}</p>`;
      content += `<p class="font-normal text-gray-700 dark:text-gray-400">Metodo de pago: ${pago.metodo}</p>`;
      content += `<p class="font-medium text-gray-700 dark:text-gray-400">${pago.estado}</p>`;
    }

    viewPagos.innerHTML = content;
    mostrarPagos.appendChild(viewPagos);

     // Agregar el código del botón aquí
    const button = document.createElement('button');
    button.classList.add('border', 'rounded', 'text-white', 'bg-green-500', 'p-1', 'mt-1', 'flex', 'justify-center');
    button.innerText = 'Aprobar Pago';
    button.addEventListener('click', async () => {
      // Lógica para aprobar el pago y generar el código QR
      await axios.put(`/api/pagos/${pago.id}`, { estado: 'Aprobado' });
      // generarCodigoQR();
      location.reload();
    });
    viewPagos.appendChild(button);
  });
})();