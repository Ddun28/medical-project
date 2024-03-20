const sidebar = document.querySelector('#sidebar');

const crearSidebar = () =>{
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:border-b">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn" class="lg:hidden">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button> 
        
        <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</button>
        <!-- Logo -->
        <div class="md:ml-auto md:mr-10">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28 dark:hidden">
            <img src="/img/Blue Minimalist Medical Logo (2).png" alt="logo" class="h-20 w-28 hidden dark:block">
        </div>
     

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-full absolute rounded-none border-none dark:bg-gray-900 dark:border-s-4 dark:border-sky-500">
    <!-- Items -->
    <div class="p-4 space-y-4 fixed">
        <!-- Inicio -->
        <a href="#" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-home text-white"></i>
            <span class="-mr-1 font-medium">Inicio</span>
        </a>

        <a href="/historial" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-user"></i>
            <span>Recipe e Indicaciones</span>
        </a>
        <a href="/pagos" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-wallet"></i>      
            <span>Metodos de Pagos</span>
        </a>
        <a href="/login" id="cerrarbtn" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
        </a>
    </div>
</div>`
}

const sidebarHistorial = () =>{
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-b dark:border-gray-500">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn" class="lg:hidden">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button>

        <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </button>

        <!-- Logo -->
        <div class="md:ml-auto md:mr-10">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28 dark:hidden">
            <img src="/img/Blue Minimalist Medical Logo (2).png" alt="logo" class="h-20 w-28 hidden dark:block">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen absolute rounded-none border-none dark:bg-gray-900 dark:border-s-4 dark:border-sky-500">
    <!-- Items -->
    <div class="p-4 space-y-4 fixed">
        <!-- Inicio -->
        <a href="/principal" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group  dark:text-white">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
        </a>

        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-lg  text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-user"  text-white"></i>
            <span class="-mr-1 font-medium">Recipe e Indicaciones</span>
        </a>
        <a href="/pagos" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group  dark:text-white">
            <i class="fas fa-wallet"></i>
            <span>Metodos de Pagos</span>
        </a>
        <a href="/login" id="cerrarbtn" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group  dark:text-white">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
        </a>
    </div>
</div>`
}

const sidebarPagos = () =>{
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-b dark:border-gray-500">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn" class="lg:hidden">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button>

        <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</button>

        <!-- Logo -->
        <div class="md:ml-auto md:mr-10">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28 dark:hidden">
            <img src="/img/Blue Minimalist Medical Logo (2).png" alt="logo" class="h-20 w-28 hidden dark:block">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen absolute  rounded-none border-none dark:bg-gray-900 dark:border-s-4 dark:border-sky-500">
    <!-- Items -->
    <div class="p-4 space-y-4 fixed">
        <!-- Inicio -->
        <a href="/principal" aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group  dark:text-white">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
        </a>

        <a href="/historial" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group  dark:text-white">
            <i class="fas fa-user" ></i>
            <span>Recipe e Indicaciones</span>
        </a>
        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-wallet"  text-white"></i>
            <span class="-mr-1 font-medium">Metodos de Pagos</span>
        </a>
        <a href="/" id="cerrarbtn" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group  dark:text-white">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
        </a>
    </div>
</div>`
}

const sidebarAdmin = () => {
    sidebar.innerHTML = `
    <nav class="bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-b dark:border-gray-500">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn" class="lg:hidden">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button>

        <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </button>

        <!-- Logo -->
        <div class="md:ml-auto md:mr-10">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28 dark:hidden">
            <img src="/img/Blue Minimalist Medical Logo (2).png" alt="logo" class="h-20 w-28 hidden dark:block">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none dark:bg-gray-900 dark:border-s-4 dark:border-sky-500">
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
            <span>Agendar Recipes</span>
        </a>
        <a href="/verificacion/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
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
    <nav class="bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-b dark:border-sky-500">
    <div class="flex justify-between items-center px-9">
        <!-- Ícono de Menú -->
        <button id="menuBtn" class="lg:hidden">
            <i class="fas fa-bars text-cyan-500 text-lg"></i>
        </button>

        <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </button>

        <!-- Logo -->
        <div class="md:ml-auto md:mr-10">
            <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28 dark:hidden">
            <img src="/img/Blue Minimalist Medical Logo (2).png" alt="logo" class="h-20 w-28 hidden dark:block">
        </div>

    </div>
</nav>

<!-- Barra lateral -->
<div id="sideNav" class="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none dark:bg-gray-900 dark:border-s-4 dark:border-sky-500">
    <!-- Items -->
    <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="/admin/" aria-label="dashboard"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
        </a>

        <a href="/agendar" class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
        <i class="fas fa-wallet text-white"></i>
        <span class="-mr-1 font-medium">Agendar Recipes</span>
    </a>

        <a href="/verificacion/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
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

    const sidebarVerify = () => {
        sidebar.innerHTML = `
        <nav class="bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-b dark:border-sky-500">
        <div class="flex justify-between items-center px-9">
            <!-- Ícono de Menú -->
            <button id="menuBtn" class="lg:hidden">
                <i class="fas fa-bars text-cyan-500 text-lg"></i>
            </button>

            <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
            <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
    
            <!-- Logo -->
            <div class="md:ml-auto md:mr-10">
                <img src="/img/Blue Minimalist Medical Logo.png" alt="logo" class="h-20 w-28 dark:hidden">
                <img src="/img/Blue Minimalist Medical Logo (2).png" alt="logo" class="h-20 w-28 hidden dark:block">
            </div>
    
        </div>
    </nav>
    
    <!-- Barra lateral -->
    <div id="sideNav" class="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none dark:bg-gray-900 dark:border-s-4 dark:border-sky-500">
        <!-- Items -->
        <div class="p-4 space-y-4">
            <!-- Inicio -->
            <a href="/admin/" aria-label="dashboard"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
                <i class="fas fa-home"></i>
                <span>Inicio</span>
            </a>

            <a href="/agendar/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group dark:text-white">
                <i class="fas fa-user"></i>
                <span>Agendar Recipes</span>
            </a>
    
            <a href="#" class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
            <i class="fas fa-wallet text-white"></i>
            <span class="-mr-1 font-medium">Verificar Pagos</span>
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
}else if(window.location.pathname === '/historial/'){
    sidebarHistorial();
}else if(window.location.pathname === '/pagos/'){
    sidebarPagos();
}else if(window.location.pathname === '/admin/'){
    sidebarAdmin();
}else if(window.location.pathname ==='/agendar/'){
    sidebarHistory();
}else if(window.location.pathname === '/verificacion/'){
    sidebarVerify();
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

        var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        
        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }
        
        var themeToggleBtn = document.getElementById('theme-toggle');
        
        themeToggleBtn.addEventListener('click', function() {
        
            // toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
        
            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
        
            // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
            
        });