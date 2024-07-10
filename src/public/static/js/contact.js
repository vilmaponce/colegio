function validarFormulario() {
    // Obtener valores de los campos
    var nombre = document.getElementById('nombre').value.trim();
    var apellido = document.getElementById('apellido').value.trim();
    var correo = document.getElementById('correo').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var area = document.getElementById('area').value;
    var mensaje = document.getElementById('mensaje').value.trim();

    // Expresiones regulares para validar el contenido
    var letrasRegex = /^[A-Za-z\s]+$/; // Permitir solo letras y espacios
    var numerosRegex = /^[0-9]+$/; // Permitir solo números

    // Validar cada campo
    if (!nombre.match(letrasRegex)) {
        alert("Por favor ingresa un nombre válido.");
        return false;
    }
    if (!apellido.match(letrasRegex)) {
        alert("Por favor ingresa un apellido válido.");
        return false;
    }
    if (correo === "") {
        alert("Por favor ingresa tu correo electrónico.");
        return false;
    }
    // Verificar si el correo contiene al menos un '@'
    if (correo.indexOf('@') === -1) {
        alert("Por favor ingresa un correo electrónico válido.");
        return false;
    }
    if (!telefono.match(numerosRegex) || telefono.length > 15) {
        alert("Por favor ingresa un número de teléfono válido (hasta 15 dígitos).");
        return false;
    }
    if (area === "") {
        alert("Por favor ingresa el área correspondiente.");
        return false;
    }
    if (mensaje === "" || mensaje.length > 250) {
        alert("Por favor ingresa un mensaje válido (hasta 250 caracteres).");
        return false;
    }

    // Si todo está bien, limpiar el formulario
    limpiarFormulario();

    // Mostrar mensaje de éxito
    alert("¡Formulario enviado correctamente!");
    return true;
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('correo').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('area').value = "";
    document.getElementById('mensaje').value = "";
}

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