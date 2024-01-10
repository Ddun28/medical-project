const sidebar = document.querySelector('#sidebar');

const crearSidebar = () =>{
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:bg-slate-900 dark:border-b dark:border-sky-500">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button> 
       
       
        <button id="darkModeToggle" class="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white px-4 py-2 rounded">
        Cambiar modo
      </button>
        
        <!-- Logo -->
        <div class="md:mr-10">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28 dark:hidden">
            <img src="/img/Blue Minimalist Medical Logo (2).png" alt="logo" class="h-20 w-28 hidden dark:block">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none dark:bg-slate-900 dark:border-s-4 dark:border-sky-500">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="#" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-home text-white"></i>
            <span class="-mr-1 font-medium">Inicio</span>
        </a>

        <a href="/principal/historial/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-user"></i>
            <span>Recipe e Indicaciones</span>
        </a>
        <a href="/principal/pagos" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-wallet"></i>      
            <span>Metodos de Pagos</span>
        </a>
        <a href="#" id="cerrarbtn" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
        </a>
    </div>
</div>`
}

const sidebarHistorial = () =>{
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:bg-slate-900 dark:border-b dark:border-sky-500">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button>

        <!-- Logo -->
        <div class="ml-1 items-center">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none dark:bg-slate-900 dark:border-s-4 dark:border-sky-500">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="/principal/" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
        </a>

        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-lg  text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-user"  text-white"></i>
            <span class="-mr-1 font-medium">Recipe e Indicaciones</span>
        </a>
        <a href="/principal/pagos" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-wallet"></i>
            <span>Metodos de Pagos</span>
        </a>
        <a href="/" id="cerrarbtn" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
        </a>
    </div>
</div>`
}

const sidebarPagos = () =>{
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:bg-slate-800">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button>

        <!-- Logo -->
        <div class="ml-1 items-center">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none dark:bg-slate-800 dark:text-white">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="/principal/" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
        </a>

        <a href="/principal/historial/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-user" ></i>
            <span>Recipe e Indicaciones</span>
        </a>
        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-wallet"  text-white"></i>
            <span class="-mr-1 font-medium">Metodos de Pagos</span>
        </a>
        <a href="/" id="cerrarbtn" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
        </a>
    </div>
</div>`
}

const sidebarAdmin = () => {
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:bg-slate-800">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button>

        <!-- Logo -->
        <div class="ml-1 items-center">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none dark:bg-slate-900 dark:border-s-4 dark:border-sky-500">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="#" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-home text-white"></i>
            <span class="-mr-1 font-medium">Inicio</span>
        </a>

        <a href="/agendar" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-wallet"></i>
            <span>Historial</span>
        </a>
        <a href="/verify-pago/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-user"></i>
            <span>Verificar de Pagos</span>
        </a>
        <a href="/login" id="cerrarbtn" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
        </a>
    </div>
</div>
    `
}
const sidebarHistory = () => {
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:bg-slate-800">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button>

        <!-- Logo -->
        <div class="ml-1 items-center">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none dark:bg-slate-900 dark:border-s-4 dark:border-sky-500">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="/admin/" aria-label="dashboard"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
        </a>

        <a href="#" class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
        <i class="fas fa-wallet text-white"></i>
        <span class="-mr-1 font-medium">Agendar Recipes</span>
    </a>

        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-user"></i>
            <span>Verificar Pagos</span>
        </a>
       
        <a href="/login" id="cerrarbtn" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
        </a>
    </div>
</div>
    `
    }
//agregar las rutas para los componentes 
if(window.location.pathname === '/principal/'){
    crearSidebar();
}else if(window.location.pathname === '/principal/historial/'){
    sidebarHistorial();
}else if(window.location.pathname === '/principal/pagos/'){
    sidebarPagos();
}else if(window.location.pathname === '/admin/'){
    sidebarAdmin();
}else if(window.location.pathname ==='/agendar/'){
    sidebarHistory();
}


//boton para cerrar sesion
const cerrarSesion = document.querySelector('#cerrarbtn');
cerrarSesion.addEventListener('click', async e => {
    try {
     await axios.get('/api/logout');
     window.location.pathname = '/login'
     window.history.replaceState({}, '', '/login');
    } catch (error) {
     console.log(error);
    }
 });

const menuBtn = document.getElementById('menuBtn');
        const sideNav = document.getElementById('sideNav');

        menuBtn.addEventListener('click', () => {
            sideNav.classList.toggle('hidden');
        });

        const darkModeToggle = document.getElementById('darkModeToggle');

        darkModeToggle.addEventListener('click', () => {
          const isDarkMode = document.documentElement.classList.contains('dark');
          if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          }
        });
        
        // Verificar el modo actual al cargar la página
        const initialMode = localStorage.getItem('theme');
        if (initialMode === 'dark') {
          document.documentElement.classList.add('dark');
        }