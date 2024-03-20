document.addEventListener("DOMContentLoaded", function () {
    var contenedor = document.querySelector("#contenedor");
    console.log('entra');
    contenedor.classList.add('hidden');
  
    const userName = document.querySelector("#name");
    const edad = document.querySelector("#edad");
    const inputRecipe = document.querySelector("#recipe");
    const inputIndicaciones = document.querySelector("#indicaciones");
    const formPdf = document.querySelector("#form-pdf");
  
    formPdf.addEventListener('submit', async e => {
      e.preventDefault();
      if (!inputRecipe.value || !inputRecipe.value) {
        return;
      }
      try {
        const newRecipe = {
          Recipe: inputRecipe.value,
          Indicaciones: inputIndicaciones.value
        }
        const id = window.location.pathname.split('/')[3];
        await axios.post(`/api/pdf/${id}`, newRecipe)
        formPdf.reset();
      } catch (error) {
        console.log(error);
      }
    });
  
    (async () => {
      const id = window.location.pathname.split('/')[2];
      const { data } = await axios.get(`/api/citas/${id}`);
      //console.log(data);
      edad.innerHTML = `Edad: ${data.Edad}`;
      //console.log(data);
      
      const {user} = data;
      //console.log(user); 
      
    
    userName.innerHTML = `${user.name}`
    })();
  });
