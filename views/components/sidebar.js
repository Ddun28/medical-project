const sidebar = document.querySelector('#sidebar');

const crearSidebar = () =>{
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:bg-slate-900 dark:border-b dark:border-sky-500">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button> 

        <!-- Logo -->
        <div id="modo-oscuro" class="ml-1 items-center">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28 dark:hidden">
            <img src="/img/Blue Minimalist Medical Logo (2).png" alt="logo" class="h-20 w-28 hidden dark:block">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen absolute rounded-none border-none dark:bg-slate-900 dark:border-s-4 dark:border-sky-500">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="#" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-home text-white"></i>
            <span class="-mr-1 font-medium">Inicio</span>
        </a>

        <a href="/principal/historial/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-wallet"></i>
            <span>Historial</span>
        </a>
        <a href="/principal/pagos" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-user"></i>
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
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen absolute rounded-none border-none dark:bg-slate-800 dark:text-white">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="/principal/" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
        </a>

        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-lg  text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-wallet text-white"></i>
            <span class="-mr-1 font-medium">Historial</span>
        </a>
        <a href="/principal/pagos" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-user"></i>
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
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen absolute rounded-none border-none dark:bg-slate-800 dark:text-white">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="/principal/" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
        </a>

        <a href="/principal/historial/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
            <i class="fas fa-wallet"></i>
            <span>Historial</span>
        </a>
        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-user text-white"></i>
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
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen absolute rounded-none border-none dark:bg-slate-800">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="#" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-home text-white"></i>
            <span class="-mr-1 font-medium">Inicio</span>
        </a>

        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-wallet"></i>
            <span>Historial</span>
        </a>
        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-user"></i>
            <span>Metodos de Pagos</span>
        </a>
        <a href="/" id="cerrarbtn" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
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
}

const menuBtn = document.getElementById('menuBtn');
        const sideNav = document.getElementById('sideNav');

        menuBtn.addEventListener('click', () => {
            sideNav.classList.toggle('hidden');
        });