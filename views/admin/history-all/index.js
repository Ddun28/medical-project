window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    //console.log('entra');
    var body = document.querySelector("body");
    body.classList.remove('overflow-hidden')
    contenedor.classList.add('hidden');
})



const formCedula = document.querySelector("#filtroForm");   
const userNameElement = document.querySelector('#name');
const edadElement = document.querySelector('#edad');
var id;

formCedula.addEventListener('submit', async e => {
  e.preventDefault();

  const cedula = document.querySelector("#cedula").value;

  if (cedula === '') {
    return;
  } else {
    try {
      const { data } = await axios.get(`/api/citas/buscar?cedula=${cedula}`);
      console.log(data);

      data.forEach(i => {
        const { Edad, user } = i;
        const userName = user.name;
        const edad = Edad;

        userNameElement.textContent = userName;
        edadElement.textContent = edad;

       id = user.id;
      });

      formPdf.dataset.userId = id;
    } catch (error) {
      console.log(error);
    }
  }
});


const inputRecipe = document.querySelector("#recipe");
const inputIndicaciones = document.querySelector("#indicaciones");
const formPdf = document.querySelector("#form-pdf");
console.log(id);
formPdf.addEventListener('submit', async e =>
 {
  e.preventDefault();
  if (!inputRecipe.value || !inputRecipe.value) {
    return;
  }
  try {
    const newRecipe = {
      Recipe: inputRecipe.value,
      Indicaciones: inputIndicaciones.value
    }
    const id = formPdf.dataset.userId;
    console.log(id);
    await axios.post(`/api/pdf/${id}`, newRecipe)
    formPdf.reset();
  } catch (error) {
    console.log(error);
  }
});

const eliminarBusquedaBtn = document.getElementById('eliminarBusqueda');

// Agrega un evento de clic al botón
eliminarBusquedaBtn.addEventListener('click', () => {
  eliminarBusquedaYMostrarProductos();
});

// Función para eliminar la búsqueda
function eliminarBusquedaYMostrarProductos() {
 
  while (userNameElement.firstChild) {
    userNameElement.removeChild(userNameElement.firstChild);
  }
  
  while (edadElement.firstChild) {
    edadElement.removeChild(edadElement.firstChild);
  }
}