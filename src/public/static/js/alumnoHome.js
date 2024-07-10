//JS para el menu aside
// Agrega un event listener al enlace "Mis Datos"
document.querySelector('li a[href="#datos"]').addEventListener('click', () => {
  // Oculta todos los sections del main-container
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('hidden');
    document.querySelector('li a[href="#cursos"]').classList.remove('active');
  });

  // Muestra solo el section #datos
  const datosSection = document.getElementById('datos');
  datosSection.classList.remove('hidden');
  document.querySelector('li a[href="#datos"]').classList.add('active');
});

/*------------------------------------------------------------*/
// Agrega un event listener al enlace "Mis Cursos"
document.querySelector('li a[href="#cursos"]').addEventListener('click', () => {
  // Oculta todos los sections del main-container
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('hidden');
    document.querySelector('li a[href="#datos"]').classList.remove('active');
  });

  // Muestra solo el section #datos
  const cursosSection = document.getElementById('cursos');
  cursosSection.classList.remove('hidden');
  document.querySelector('li a[href="#cursos"]').classList.add('active');
});

/*------------------------------------------------------------*/
// Agrega un event listener al enlace "Modificar Perfil"
document.querySelector('li a[href="#update"]').addEventListener('click', () => {
  // Oculta todos los sections del main-container
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('hidden');
    document.querySelector('li a[href="#datos"]').classList.remove('active');
    document.querySelector('li a[href="#cursos"]').classList.remove('active');
  });

  // Muestra solo el section #update
  const updateSection = document.getElementById('update');
  updateSection.classList.remove('hidden');
});

/*------------------------------------------------------------*/
// JS que inserta los datos del alumno en "Mis Datos"
const ninckname = document.getElementById("name-user");
const nombreCompleto = document.getElementById("user-nombre-completo");
const dni = document.getElementById("user-dni");
const fecha = localStorage.getItem("nacimiento");
const nacFormateado = fecha.toString().split('T')[0];
const date = document.getElementById("user-nacimiento");
const correo = document.getElementById("user-email");
const telefono = document.getElementById("user-tel");
const address = document.getElementById("user-address");
const ciudad = document.getElementById("user-city");
const codigoPostal = document.getElementById("user-cp");

// Formatea la fecha a dd-mm-aaaa
function formatFecha(nacFormateado) {
  const fechaParts = nacFormateado.split('-');
  const dia = fechaParts[2];
  const mes = fechaParts[1];
  const ano = fechaParts[0];
  return `${dia}-${mes}-${ano}`;
}

ninckname.innerText = localStorage.getItem("nombre");
nombreCompleto.innerText = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
dni.innerText = localStorage.getItem("dni");
date.innerText = formatFecha(nacFormateado);
correo.innerText = localStorage.getItem("email");
telefono.innerText = localStorage.getItem("telefono");
address.innerText = localStorage.getItem("calle") + " " + localStorage.getItem("num");
ciudad.innerText = localStorage.getItem("ciudad");
codigoPostal.innerText = localStorage.getItem("codigoPostal");

/*------------------------------------------------------------*/
// JS que inserta los cursos del alumno en "Mis Cursos"
async function getAllInscripciones() {

  const studentDni = localStorage.getItem("dni");

  try {
    const response = await fetch(`/luminova/list?dni=${studentDni}`);
    const inscripciones = await response.json();

    const inscripcionesList = document.getElementById('inscripciones-list');
    const sinInscripcion = document.getElementById('sin-inscripcion-aviso');
    const tablaInscripciones = document.getElementById('tabla-de-inscripciones');

    inscripcionesList.innerHTML = '';

    if (inscripciones.length == 0) {
      sinInscripcion.style.display = "block";
    } else {
      inscripciones.sort((a, b) => a.id - b.id); // Ordenar por id de forma ascendente
      inscripciones.forEach(inscripcion => {
        const tr = document.createElement('tr');
        let estado = inscripcion.estado;

        if (estado == 1) {
          estado = "En Curso"
          tr.innerHTML = `
            <th>${inscripcion.curso_nombre}</th>
            <th>${estado}</th>
            <th><button class="btn-inscripcion" onclick=darBaja(${inscripcion.id})>Darse de baja</button></th>
          `;
          inscripcionesList.appendChild(tr);
        };

        if (estado == 0) {
          estado = "Dado de Baja"
          tr.innerHTML = `
            <th>${inscripcion.curso_nombre}</th>
            <th>${estado}</th>
            <th></th>
          `;
          inscripcionesList.appendChild(tr);
        }
        tablaInscripciones.style.opacity = 1;
      });
    };


  } catch (error) {
    console.error('Error al obtener las inscripciones:' + error);
    const modal = document.getElementById("errorModal");
    const mensaje = document.getElementById("error-message");
    mensaje.innerText = "Error al obtener las inscripciones."
    modal.style.display = 'block';

    //usuario cierra el modal
    const close = document.getElementsByClassName('close')[0];
    close.onclick = function () {
      modal.style.display = 'none';
    }

    // Cerrar el modal haciendo clic fuera del mismo
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
      return
    }
  };
};

// Llamar a la función para obtener todas las inscripciones al cargar la página
document.addEventListener('DOMContentLoaded', getAllInscripciones);
/*------------------------------------------------------------*/
// JS para DAR DE BAJA la inscripcion de un alumno
async function darBaja(id) {

  let dni = localStorage.getItem("dni");

  const baja = { dni, id };

  try {
    const response = await fetch(`/luminova/${dni}/inscripciones`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(baja)
    });

    if (response.ok) {
      const modal = document.getElementById("succesModal");
      const mensaje = document.getElementById("succes-message");
      mensaje.innerText = "¡El alumno se ha dado de baja con éxito!"
      modal.style.display = 'block';

      // usuario cierra el modal
      const close = document.getElementById('close-succes');
      close.onclick = function () {
        modal.style.display = 'none';
        // Recarga la página
        location.reload();
      };

      // Cerrar el modal haciendo clic fuera del mismo
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
          // Recarga la página
          location.reload();
        }
        return
      };

      return
    } else {
      const modal = document.getElementById("errorModal");
      const mensaje = document.getElementById("error-message");
      mensaje.innerText = "Error al generar la baja."
      modal.style.display = 'block';

      //usuario cierra el modal
      const close = document.getElementById('close-error');
      close.onclick = function () {
        modal.style.display = 'none';
      };

      // Cerrar el modal haciendo clic fuera del mismo
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        };
        return
      };
      return
    };
  } catch (error) {
    console.error('Error al generar la baja:', error);
    const modal = document.getElementById("errorModal");
    const mensaje = document.getElementById("error-message");
    mensaje.innerText = "Error al generar la baja."
    modal.style.display = 'block';

    //usuario cierra el modal
    const close = document.querySelector('.close');
    close.onclick = function () {
      modal.style.display = 'none';
    };

    // Cerrar el modal haciendo clic fuera del mismo
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      };
      return
    };
    return
  }
};
/*------------------------------------------------------------*/
// JS para modificar los datos del alumno
// Insertamos primero los datos
document.getElementById("user-name-update").value = localStorage.getItem("nombre") + ' ' + localStorage.getItem("apellido");
document.getElementById("user-dni-update").value = localStorage.getItem("dni");
document.getElementById("user-nac-update").value = formatFecha(nacFormateado);
document.getElementById("user-email-update").value = localStorage.getItem("email");
document.getElementById("user-tel-update").value = localStorage.getItem("telefono");
document.getElementById("user-calle-update").value = localStorage.getItem("calle");
document.getElementById("user-num-update").value = localStorage.getItem("num");
document.getElementById("user-ciudad-update").value = localStorage.getItem("ciudad");
document.getElementById("user-cp-update").value = localStorage.getItem("codigoPostal");

document.getElementById('alumno-update-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Al haber insertado valores previamente en los input, si el usuario no cambia algun dato, quedará que el valor existente
  let dni = document.getElementById('user-dni-update').value;
  let email = document.getElementById('user-email-update').value;
  let telefono = document.getElementById('user-tel-update').value;
  let calle = document.getElementById('user-calle-update').value;
  let num = document.getElementById('user-num-update').value;
  let ciudad = document.getElementById('user-ciudad-update').value;
  let codigoPostal = document.getElementById('user-cp-update').value;

  const alumnoEditado = { email, telefono, calle, num, ciudad, codigoPostal, dni };

  try {
    const response = await fetch(`/luminova/${dni}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(alumnoEditado)
    });

    if (response.ok) {
      const modal = document.getElementById("succesModal");
      const mensaje = document.getElementById("succes-message");
      mensaje.innerText = "¡Alumno modificado con éxito!"
      modal.style.display = 'block';

      // usuario cierra el modal
      const close = document.getElementById('close-succes');
      close.onclick = function () {
        modal.style.display = 'none';
        // Recarga la página
        location.reload();
      };

      // Cerrar el modal haciendo clic fuera del mismo
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
          // Recarga la página
          location.reload();
        }
        return
      };
      return
    } else {
      const modal = document.getElementById("errorModal");
      const mensaje = document.getElementById("error-message");
      mensaje.innerText = "Error al modificar al alumno."
      modal.style.display = 'block';

      //usuario cierra el modal
      const close = document.querySelector('.close');
      close.onclick = function () {
        modal.style.display = 'none';
      };

      // Cerrar el modal haciendo clic fuera del mismo
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        };
        return
      };
      return
    }
  } catch (error) {
    console.error('Error al modificar al alumno:', error);
    const modal = document.getElementById("errorModal");
    const mensaje = document.getElementById("error-message");
    mensaje.innerText = "Error al modificar al alumno."
    modal.style.display = 'block';

    //usuario cierra el modal
    const close = document.querySelector('.close');
    close.onclick = function () {
      modal.style.display = 'none';
    };

    // Cerrar el modal haciendo clic fuera del mismo
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      };
      return
    };
    return
  }
});
/*------------------------------------------------------------*/
// JS para el navbar
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