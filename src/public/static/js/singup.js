/*
 * Este archivo js contiene:
 *  - La validación de los datos para crear un usuario/cargar un alumno
 *  - Manejo de los datos que se enviaran desde el FE al BE
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
// JS para validar datos y enviar la peticion al BE
const btnFormulario = document.getElementById('registerFormBtn');
const form = document.getElementById("registerForm");
// Expresiones regulares para validar los campos
const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const soloLetra = /^[a-zA-Z]$/;
const soloNumeros = /^[0-9]+$/;
const emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Funcionar que valida la contraseña
function validarClave() {
    // Capturamos el modal con los requerimientos
    const passwordModal = document.getElementById('password-modal');
    // Requerimientos de la contraseña que se encuentra en el modal (<li>)
    const passwordRequirements = {
        length: document.getElementById('length'),
        uppercase: document.getElementById('uppercase'),
        number: document.getElementById('number'),
        special: document.getElementById('special')
    };
    // Capturamos el div que mostrará el progreso de cumplimiento de los requisitos
    const passwordProgress = document.getElementById('password-progress');

    // Comenzamos a escuchar el ingreso del dato en el input
    clave.addEventListener('input', function () {
        const value = clave.value;
        let validCount = 0;

        // Chequeamos longitud de caractéres
        if (value.length >= 8) {
            passwordRequirements.length.classList.add('checked');
            validCount++;
        } else {
            passwordRequirements.length.classList.remove('checked');
        };

        //  Chequeamos que contenga una mayúscula
        if (/[A-Z]/.test(value)) {
            passwordRequirements.uppercase.classList.add('checked');
            validCount++;
        } else {
            passwordRequirements.uppercase.classList.remove('checked');
        };

        //  Chequeamos que contenga un número
        if (/[0-9]/.test(value)) {
            passwordRequirements.number.classList.add('checked');
            validCount++;
        } else {
            passwordRequirements.number.classList.remove('checked');
        };

        // Chequeamos que contenga algun caracter especial
        if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            passwordRequirements.special.classList.add('checked');
            validCount++;
        } else {
            passwordRequirements.special.classList.remove('checked');
        };

        // Actualizamos la barra de progreso dividida en 4 niveles de aprobación
        const progress = (validCount / 4) * 100;
        passwordProgress.style.width = `${progress}%`;

        if (validCount === 4) {
            passwordProgress.style.backgroundColor = 'green';
            // Si el progreso se completa en verde, se oculta el modal de requerimientos luego de 3 segundos.
            setTimeout(()=> {
                passwordModal.style.display = 'none';        
            }, 3000)
        } else if (validCount >= 2) {
            passwordProgress.style.backgroundColor = 'yellow';
        } else {
            passwordProgress.style.backgroundColor = 'red';
        }

        // Mostramos el modal con los requerimientos
        passwordModal.style.display = 'block';

        // Si se vacía el imput, ocultamos el modal
        if (value.length == 0) {
            passwordModal.style.display = 'none';
        };
    })
};
// Se debe llamar para que la corrobore cuando se está ingresando
validarClave();

// Validación de datos
function validarNombre() {
    const nombre = document.getElementById('nombre').value;
    if (!soloLetras.test(nombre)) {
        alert("Por favor, ingrese un nombre válido (solo letras).");
        return false; // Indica que la validación falló
    }
    return true; // Indica que la validación fue exitosa
}

function validarApellido() {
    const apellido = document.getElementById('apellido').value;
    if (!soloLetras.test(apellido)) {
        alert("Por favor, ingrese un apellido válido (solo letras).");
        return false;
    }
    return true;
}

function validarDNI() {
    const dni = document.getElementById('dni').value;
    if (!soloNumeros.test(dni) || dni.length <= 7) {
        alert("Por favor, ingrese un DNI válido (solo números) y de 8 caracteres.");
        return false;
    }
    return true;
}

function validarNacimiento() {
    const nacimiento = document.getElementById('nacimiento').value;
    if (!nacimiento) {
        alert("Por favor, seleccione una fecha de nacimiento.");
        return false;
    }
    return true;
}

function validarGenero() {
    const genero = document.getElementById('genero').value;
    if (!soloLetra.test(genero)) {
        alert("Por favor, seleccione un sexo.");
        return false;
    }
    return true;
}

function validarCorreo() {
    const email = document.getElementById('email').value;
    if (!emailValido.test(email)) {
        alert("Por favor, ingrese un correo válido.");
        return false;
    }
    return true;
}

function validarTelefono() {
    const telefono = document.getElementById('telefono').value;
    if (!soloNumeros.test(telefono) || telefono.length <= 7) {
        alert("Por favor, ingrese un teléfono fijo o celular válido (solo números).");
        return false;
    }
    return true;
}

function validarCalle() {
    const calle = document.getElementById('calle').value;
    if (calle.length <= 5) {
        alert("Por favor, ingrese una dirección válida.");
        return false;
    }
    return true;
}

function validarNum() {
    const num = document.getElementById('num').value;
    if (!soloNumeros.test(num)) {
        alert("Por favor, ingrese una altura válida.");
        return false;
    }
    return true;
}

function validarCiudad() {
    const ciudad = document.getElementById('ciudad').value;
    if (!soloLetras.test(ciudad)) {
        alert("Por favor, ingrese una ciudad válida.");
        return false;
    }
    return true;
}

function validarCodigoPostal() {
    const cp = document.getElementById('codigoPostal').value;
    if (!soloNumeros.test(cp) || cp.length <= 3) {
        alert("Por favor, ingrese un código postal válido (solo números).");
        return false;
    }
    return true;
}

// Función para verificar si el formulario está completo y válido
function validarFormulario() {
    if (!validarNombre() || !validarApellido() || !validarDNI() ||
        !validarNacimiento() || !validarGenero() || !validarCorreo() ||
        !validarTelefono() || !validarCalle() || !validarNum() ||
        !validarCiudad() || !validarCodigoPostal()) {
        return false; // Formulario incompleto o inválido
    }
    return true; // Formulario completo y válido
}

// Accion que se inicia al presionar el botón de 'Crear Usuario'
btnFormulario.addEventListener('click', async (e) => {
    e.preventDefault(); 

    if (validarFormulario()) {
        // El formulario está completo y válido, se puede enviar
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const dni = document.getElementById("dni").value;
        const nacimiento = document.getElementById("nacimiento").value;
        const genero = document.getElementById("genero").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const calle = document.getElementById("calle").value;
        const num = document.getElementById("num").value;
        const ciudad = document.getElementById("ciudad").value;
        const codigoPostal = document.getElementById("codigoPostal").value;
        const clave = document.getElementById('clave').value;

        const student = { nombre, apellido, dni, nacimiento, genero, email, telefono, calle, num, ciudad, codigoPostal, clave };

        try {
            const response = await fetch('/luminova/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            });

            if (response.ok) {
                alert("¡Usuario creado con éxito!")
                form.reset();
                return;
            } else {
                alert("¡Error al crear el usuario!");
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert("¡Error al crear el usuario!");
        };
    } else {
        // Mostrar mensaje de error si el formulario está incompleto o inválido
        alert("¡Complete todos los campos correctamente!");
    }
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