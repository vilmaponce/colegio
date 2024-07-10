// JS que detecta si el usuario ha iniciado sesión o no para inscribirse a los cursos
document.getElementById('btnInscripcion3').addEventListener('click', function () {
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
/*------------------------------------------------------------*/
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