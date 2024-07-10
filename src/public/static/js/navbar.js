// JS para el nav
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const loginBtn = document.querySelector(".dropdown");
const dropdown = document.querySelector(".dropdown-content");

navToggle.addEventListener("click", ()=> {
  navMenu.classList.toggle("nav-menu_visible"); /*muestra o no el menu*/

  if (navMenu.classList.contains ("nav-menu_visible")){
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});

/*------------------------------------------------------------*/
// JS para el btn Login
document.querySelector(".nav-menu-item.dropdown").addEventListener("click", () => {
  const dropdown = document.querySelector(".dropdown-content");
  if (dropdown.style.opacity == 0) {
    dropdown.style.opacity = 1;
  } else {
    dropdown.style.opacity = 0;
  }
});

/*------------------------------------------------------------*/
// JS para el boton de Mi Cuenta
// Lógica para que aparezca sólo si el usuario inició sesión
if (localStorage.getItem("dni") == null) {
  const userLinks = document.getElementById("user-links");
  userLinks.style.display = "none";
} else {
  const userLinks = document.getElementById("user-links");
  userLinks.style.display = "block";
  // Oculta el <li> de Ingreso o Registro
  const ingresoLinks = document.querySelector(".nav-menu-item.dropdown");
  ingresoLinks.style.display = "none";
};

document.getElementById("user-links").addEventListener("click", () => {
  const dropdown = document.getElementById("menu-desplegable-user");
  if (dropdown.style.opacity == 0) {
    dropdown.style.opacity = 1;
  } else {
    dropdown.style.opacity = 0;
  };
});
/*------------------------------------------------------------*/
// JS para Cerrar Sesion - limpia localStorage
document.getElementById('cerrar-sesion').addEventListener('click', () => {
  // Limpiar el localStorage
  localStorage.removeItem("nombre");
  localStorage.removeItem("apellido");
  localStorage.removeItem("dni");
  localStorage.removeItem("nacimiento");
  localStorage.removeItem("genero");
  localStorage.removeItem("email");
  localStorage.removeItem("telefono");
  localStorage.removeItem("calle");
  localStorage.removeItem("num");
  localStorage.removeItem("ciudad");
  localStorage.removeItem("codigoPostal");
  localStorage.removeItem("clave");
  localStorage.clear();
  
  window.location.href = "../index.html"
});