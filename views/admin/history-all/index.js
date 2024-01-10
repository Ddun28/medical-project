window.addEventListener("load", function(){
    var contenedor = document.querySelector("#contenedor");
    //console.log('entra');
    var body = document.querySelector("body");
    body.classList.remove('overflow-hidden')
    contenedor.classList.add('hidden');
})

const filtroForm = document.getElementById('filtroForm');
const inputName = document.querySelector('#nombre')

var id
filtroForm.addEventListener('submit', async e => {
    e.preventDefault();

    const nombrePaciente = inputName.value;
    try {
        const response = await axios.get(`/api/users/buscar`, { params: { nombre: nombrePaciente } });
        const data = response.data;
        const userName = document.querySelector('#name');
        const edad = document.querySelector('#edad');     
        //console.log(data.name); 
        data.forEach(user => {
            const { name, citas } = user;
            id = user.id
            userName.innerHTML = `${name}`;

            citas.forEach(cita => {
                const { Edad } = cita;
                //console.log(cita);

                edad.innerHTML = `Edad: ${Edad}`;
            });
        });
        formPdf.dataset.userId = id; 
        console.log(id);
    } catch (error) {
        console.log(error);
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