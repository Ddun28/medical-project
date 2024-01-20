const mostrarPagos = document.querySelector("#pagos");
const paypalDiv = document.getElementById('paypal');

window.addEventListener("load", function() {
  var contenedor = document.querySelector("#contenedor");
  console.log('entra');
  body.classList.remove('overflow-hidden')
  contenedor.classList.add('hidden');
});

(async () => {
  const id = window.location.pathname.split('/')[2];
  const { data } = await axios.get(`/api/pagos/${id}`);
  console.log(data);

  const selectEstadoPago = document.querySelector("#estado-pago");
  const limpiarBusquedaBtn = document.querySelector("#limpiar-busqueda");

  selectEstadoPago.addEventListener("change", () => {
    const estadoSeleccionado = selectEstadoPago.value;
    mostrarPagosFiltrados(estadoSeleccionado, data);
  });

  limpiarBusquedaBtn.addEventListener("click", () => {
    selectEstadoPago.value = ""; // Restablecer el valor del select a vacío
    mostrarPagosFiltrados("", data); // Mostrar todos los pagos
  });

  const mostrarPagosFiltrados = (estado, pagos) => {
    mostrarPagos.innerHTML = ""; // Limpiar la lista de pagos antes de mostrar los filtrados
    paypalDiv.innerHTML = ""; // Limpiar la sección de PayPal antes de volver a mostrar los pagos filtrados

    pagos.forEach(pago => {
      if (estado === "" || estado === pago.estado) {
        const viewPagos = document.createElement('div');
        viewPagos.classList.add(
          'block','max-w-sm','p-6','bg-white','border','border-gray-200','rounded-lg','shadow','hover:bg-gray-100',
          'dark:bg-gray-800','dark:border-gray-700','dark:hover:bg-gray-700'
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
        buttonContainer.classList.add('flex', 'justify-evenly');

        const buttonAprobar = document.createElement('button');
        buttonAprobar.classList.add('border', 'rounded', 'text-white', 'bg-green-500', 'p-1', 'mt-1', 'flex', 'justify-center');
        buttonAprobar.innerText = 'Aprobar';
        buttonAprobar.addEventListener('click', async e => {
          e.preventDefault();
          await axios.put(`/api/pagos/${pago.id}`, { estado: 'Aprobado' });
          location.reload();
        });
        buttonContainer.appendChild(buttonAprobar);

        const buttonCancelar = document.createElement('button');
        buttonCancelar.classList.add('border', 'rounded', 'text-white', 'bg-red-500', 'p-1', 'mt-1', 'flex', 'justify-center');
        buttonCancelar.innerText = 'Cancelar';
        buttonCancelar.addEventListener('click', async e => {
          e.preventDefault();
          await axios.put(`/api/pagos/${pago.id}`, { estado: 'Cancelado' });
          location.reload();
        });
        buttonContainer.appendChild(buttonCancelar);

        viewPagos.appendChild(buttonContainer);
      }
    });

    if (estado === "") {
      axios.get(`/api/orders/${id}`)
        .then(response => {
          const paymentData = response.data;
          paymentData.forEach(i => {
            const { id, status } = i;
            const styleDiv = document.createElement('div');
            styleDiv.classList.add(
              'block', 'max-w-sm', 'p-6', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'hover:bg-gray-100',
               'dark:bg-gray-800', 'dark:border-gray-700', 'dark:hover:bg-gray-700'
            );

            const paymentTitle = document.createElement('p');
            paymentTitle.classList.add('dark:text-white');
            paymentTitle.textContent = 'Pago Realizado con PayPal';

            const paymentId = document.createElement('p');
            paymentId.classList.add('dark:text-white');
            paymentId.textContent = `ID: ${id}`;

            const paymentStatus = document.createElement('p');
            paymentStatus.classList.add('dark:text-white');
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
  };

  mostrarPagosFiltrados("", data); // Mostrar todos los pagos al cargar la página
})();
