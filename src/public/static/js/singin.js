/*
 * Este archivo js contiene:
 *  - La validación de los datos para ingresar con N° de DNI y clave
 *  - La manipulación de los datos que obtendremos del DNI y CLAVES enviados al BE
 *  - Carga de datos del usuario al localStorage para hacer mas fácil su manipulación
 *  - Limpiar el localStorage si el usuario presiona el botón 'Cerrar Sesión'
 */

/*******************************************************************************/
// JS para el botón de mostrar contraseña de los form

const inputIcon = document.querySelector(".eye-icon");
const inputPassword = document.querySelector(".input__field");

inputIcon.addEventListener("click", () => {
  inputIcon.classList.toggle("fa-eye-slash");
  inputIcon.classList.toggle("fa-eye");
  inputPassword.type = inputPassword.type === "password" ? "text" : "password";
});

/*******************************************************************************/
// JS para obtener el DNI y clave que ingrese el usuario y enviar la peticion al BE
document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const dniIngreso = document.getElementById('user').value;
  const claveIngreso = document.getElementById('password').value;

  try {
    const response = await fetch(`/luminova/ingresar/?dni=${dniIngreso}&clave=${claveIngreso}`);

    // Si los datos enviados no coinciden con alguno en la BBDD
    if (!response.ok) {
      const modal = document.getElementById("errorModal");
      const mensaje = document.getElementById("message");
      mensaje.innerText = "DNI o CLAVES incorrectos."
      modal.style.display = "block";

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

      return;
    }
    // Si puede obtener información, crea el objeto student que tendrá toda la información en formato json
    const student = await response.json();
    console.log(student);

    // Formatear a aaaa-mm-dd la fecha de nacimiento
    //let nacimiento = student[0].nacimiento;
    //let nacFormateado = nacimiento.toString().split('T')[0];

    // Guardar DATOS de USUARIO en el localStorage para seguir trabajando
    localStorage.setItem("nombre", student[0].nombre);
    localStorage.setItem("apellido", student[0].apellido);
    localStorage.setItem("dni", student[0].dni);
    localStorage.setItem("nacimiento", student[0].nacimiento);
    localStorage.setItem("genero", student[0].genero);
    localStorage.setItem("email", student[0].email);
    localStorage.setItem("telefono", student[0].telefono);
    localStorage.setItem("calle", student[0].calle);
    localStorage.setItem("num", student[0].num);
    localStorage.setItem("ciudad", student[0].ciudad);
    localStorage.setItem("codigoPostal", student[0].codigoPostal);
    localStorage.setItem("clave", student[0].clave);

    // Lo lleva al inicio
    window.location.href = '../index.html';
  } catch (error) {
    console.error('Error al ingresar:', error);
    const modal = document.getElementById("errorModal");
    const mensaje = document.getElementById("message");
    mensaje.innerText = "Error al ingresar.";
    modal.style.display = "block";

    // usuario cierra el modal
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
});

/*------------------------------------------------------------*/
// JS que detecta si el usuario ha iniciado sesión o no para inscribirse a los cursos
const btnInscripcionNav = document.getElementById('btnInscripcion2');
btnInscripcionNav.addEventListener('click', function () {
  // Verifica si el usuario inició sesión
  const usuario = localStorage.getItem('dni');

  if (!usuario) {
    // Si el usuario no ha iniciado sesión, muestra el modal
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';

    // Cuando el usuario cierra el modal, redirige a singin.html
    const close = document.getElementsByClassName('close')[0];
    close.onclick = function () {
      modal.style.display = 'none';
      window.location.href = './singin.html';
    }

    // Cerrar el modal haciendo clic fuera del mismo
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        window.location.href = './singin.html';
      }
      return
    }
  } else {
    // Si el usuario ha iniciado sesión, redirige a formulario.html
    window.location.href = './formulario.html';
  }
});