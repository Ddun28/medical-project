window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    //console.log('entra');
    var body = document.querySelector("body");
    body.classList.remove('overflow-hidden')
    contenedor.classList.add('hidden');
})
const mostrarPdfButton = document.getElementById('mostrarPdf');
const container = document.getElementById('pdf-container');

mostrarPdfButton.addEventListener('click', () => {
  if (container.style.display === 'none') {
    container.style.display = 'grid';
  } else {
    container.style.display = 'none';
  }
});

axios.get('/api/pdf/all')
  .then(response => {
    const pdfs = response.data;
    pdfs.forEach(pdf => {
      // Crear una tarjeta por cada PDF
      const card = document.createElement('div');
      card.classList.add('bg-gray-50' ,'rounded-2xl' ,'shadow-lg', 'w-64', 'mx-16' ,'p-4', 'justify-center' ,'flex-col'
      ,'gap-3' ,'md:w-64' ,'px-2' ,'flex', 'm-2', 'dark:bg-slate-900');

      const title = document.createElement('h5');
      title.classList.add('mb-2', 'text-2xl', 'font-bold', 'tracking-tight', 'text-gray-900', 'dark:text-white');
      title.textContent = `Medicamentos: ${pdf.Recipe}`;

      const fechaISO8601 = pdf.createdAt;

      const fecha = new Date(fechaISO8601);
      // Convierte la fecha a la zona horaria local
      const dia = fecha.getUTCDate().toString().padStart(2, '0');
      const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getUTCFullYear().toString();
      const fechaFormateada = `${dia}-${mes}-${anio}`;

      const description = document.createElement('p');
      description.classList.add('mb-3', 'font-normal', 'text-gray-700', 'dark:text-gray-400');
      description.textContent = `Fecha: ${fechaFormateada}`;

      const downloadButton = document.createElement('button');
      downloadButton.classList.add('inline-flex', 'items-center', 'px-3', 'py-2', 'text-sm', 'font-medium', 'text-center', 'text-white', 'bg-blue-700', 'rounded-lg', 'hover:bg-blue-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-blue-300', 'dark:bg-blue-600', 'dark:hover:bg-blue-700', 'dark:focus:ring-blue-800');
      downloadButton.textContent = 'Descargar Recipe';

      downloadButton.addEventListener('click', () => {
        axios.get(`/api/pdf/${pdf.id}`, { responseType: 'blob' })
          .then(response => {
            // Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'recipe.pdf');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch(error => {
            console.log(error);
          });
      });

      // Boton de Eliminar
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('inline-flex', 'items-center', 'px-3', 'py-2', 'text-sm', 'font-medium', 'text-center', 'text-white', 'bg-red-700', 'rounded-lg', 'hover:bg-red-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-red-300', 'dark:bg-red-600', 'dark:hover:bg-red-700', 'dark:focus:ring-red-800');
      deleteButton.textContent = 'Eliminar';

        deleteButton.addEventListener('click', async () => {
          try {
            card.remove();
            await axios.delete(`/api/pdf/${pdf.id}`);
            window.location.reload();
            createNotification(false,'Se elimino correctamente')
          } catch (error) {
            console.log(error);
          }
      });

      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(downloadButton);
      card.appendChild(deleteButton);

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.log(error);
  });