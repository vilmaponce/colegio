/*
 * Este archivo js contiene:
 *  - La lógica para manejar los datos que se enviaran desdel el FE
 *      al BE para gestionar la inscripción del alumno.
 */

// JS que muestra actividades a inscribirse según nivel escolar

// Opciones de Deporte
const deportesDiv = document.getElementById('deportes');
const natacion = document.getElementById('natacionDiv');
const basket = document.getElementById('basketDiv');
const futbol = document.getElementById('futbolDiv');
const atletismo = document.getElementById('atletismoDiv');
// Opciones de Arte
const artisticoDiv = document.getElementById('arte');
const teatro = document.getElementById('teatroDiv');
const musica = document.getElementById('musicaDiv');
const pinturaDibujo = document.getElementById('pintura_dibujoDiv');
// Opciones de Academico
const academicoDiv = document.getElementById('academico');
const ciencias = document.getElementById('cienciasDiv');
const lectura = document.getElementById('lecturaDiv');
const debate = document.getElementById('debateDiv');
// Opciones de Voluntariado
const voluntariadoDiv = document.getElementById('comunitario');
const hospitales = document.getElementById('hospitalesDiv');
const refugiosAnimales = document.getElementById('refugiosDiv');
// Opciones de Idiomas
const idiomasDiv = document.getElementById('idiomas');
const ingles = document.getElementById('inglesDiv');
const frances = document.getElementById('francesDiv');
const aleman = document.getElementById('alemanDiv');
// Opcion de Huerta
const huertaDiv = document.getElementById('huertaDiv');
const huerta = document.getElementById('huertaInputDiv');

// Captar el nivel escolar seleccionado
function nivelEscolar() {
    // Select de nivel escolar
    const selectNivel = document.getElementById('estudios').value;
    const actividades = document.getElementById('actividades');
    //console.log(selectNivel);
    //console.log(actividades);

    // Muestra u oculta el contenedor de actividades
    actividades.classList.remove('hidden');
    if (selectNivel == '') {
        actividades.classList.add('hidden');
    }

    // Si el nivel educativo es: INICIAL
    if (selectNivel == 'inicial') {
        atletismo.classList.add('hidden');
        ciencias.classList.add('hidden');
        debate.classList.add('hidden');
        voluntariadoDiv.classList.add('hidden');
    };

    // Si el nivel educativo es: PRIMARIO
    if (selectNivel == 'primario') {
        debate.classList.add('hidden');
        hospitales.classList.add('hidden');
    };

    // Si el nivel educativo es: SECUNDARIO (muestra todas las opciones)
    if ((selectNivel == 'secundario')) {
        atletismo.classList.remove('hidden');
        ciencias.classList.remove('hidden');
        debate.classList.remove('hidden');
        voluntariadoDiv.classList.remove('hidden');
        hospitales.classList.remove('hidden');
    };
};

/*------------------------------------------------------------*/
// JS para insertar los datos del alumno en el form
const nombreCompleto = document.getElementById("nombreCompleto");
const correoContacto = document.getElementById("email");

nombreCompleto.value = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
correoContacto.value = localStorage.getItem("email");

/*------------------------------------------------------------*/
// JS para cargar la inscripcion en la BBDD
document.getElementById('registroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtenemos todos los checkboxes de las actividades
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Observamos la selección de los checkboxes
    function handleCheckboxChange(event) {
        // Desmarcar todos los checkboxes
        checkboxes.forEach(checkbox => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            };
        });
    };

    // Asignamos evento de cambio a los checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    // Obtenemos el valor del checkbox seleccionado
    function obtenerValorCheckboxSeleccionado() {
        let valorSeleccionado = '';
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                valorSeleccionado = checkbox.value;
            };
        });
        return valorSeleccionado;
    };
    const actividadSeleccionada = obtenerValorCheckboxSeleccionado();

    let dni = localStorage.getItem("dni");
    let curso = actividadSeleccionada;

    const inscripcion = { dni, curso };

    try {
        const response = await fetch('/luminova/inscripcion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inscripcion)
        });

        if (response.ok) {
            const modal = document.getElementById("succesModal");
            const mensaje = document.getElementById("succes-message");
            mensaje.innerText = "¡El alumno se ha inscripto con éxito!"
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
                };
                return
            };
            return
        } else {
            const modal = document.getElementById("errorModal");
            const mensaje = document.getElementById("error-message");
            mensaje.innerText = "Error al cargar la inscrición."
            modal.style.display = 'block';

            //usuario cierra el modal
            const close = document.querySelector('.close');
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
                };
                return
            };
            return
        }
    } catch (error) {
        console.error('Error al cargar la inscrición:', error);
        const modal = document.getElementById("errorModal");
            const mensaje = document.getElementById("error-message");
            mensaje.innerText = "Error al cargar la inscrición."
            modal.style.display = 'block';

            //usuario cierra el modal
            const close = document.querySelector('.close');
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
                };
                return
            };
            return
    }
});