// JS para el Carrusel de Presentación
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slider = document.querySelector("#slider");
const slide = document.querySelectorAll(".slide-banner");


btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())

setInterval(() => {
  moveToRight()
}, 3000); /*para que se reproduzca solo cada 3 seg*/

let operacion = 0;
let counter = 0;
let widthImg = 100 / slide.length; /*cantidad de imagenes*/


function moveToRight() {
  if (counter >= slide.length - 1) {
    counter = 0;
    operacion = 0;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "none";
    return;
  }
  counter++;
  operacion = operacion + widthImg;
  slider.style.transform = `translate(-${operacion}%)`;
  slider.style.transition = "all ease .6s"

}

function moveToLeft() {
  counter--;
  if (counter < 0) {
    counter = slide.length - 1;
    operacion = widthImg * (slide.length - 1);
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "none";
    return;
  }
  operacion = operacion - widthImg;
  slider.style.transform = `translate(-${operacion}%)`;
  slider.style.transition = "all ease .6s"

}

/*------------------------------------------------------------*/
// JS para el Calendario

var monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var now = new Date();
var day = now.getDate();
var month = now.getMonth();
var currentMonth = month;
var year = now.getFullYear();


initCalender();
//console.log(startDay());

function initCalender() {
  $("#text_day").text(day);
  $("#text_month").text(monthName[currentMonth]);

  $("#text_month_02").text(monthName[month]);
  $("#text_year").text(year);

  $(".item_day").remove();

  for (let i = startDay(); i > 0; i--) {
    $(".container_days").append
      (`<span class="week_days_item item_day prev_days">${getTotalDays(month - 1) - (i - 1)}</span>`);
  }

  for (let i = 1; i <= getTotalDays(month); i++) {
    if (i == day && month == currentMonth) {
      $(".container_days").append
        (`<span class="week_days_item item_day today">${i}</span>`);
    } else {
      $(".container_days").append
        (`<span class="week_days_item item_day">${i}</span>`);
    }
  }
}

function showInfo(now, year, month, day) {
  const info = document.getElementById('info');
  info.innerHTML = '<h3>Información</h3><p>Has hecho clic en el día ' + day + ' del mes ' + (month + 1) + ' del año ' + year + '.</p>';
}

function getNextMonth() {
  if (month !== 11) {
    month++;
  } else {
    year++;
    month = 0;
  }
  initCalender();
}
function getPrevMonth() {
  if (month !== 0) {
    month--;
  } else {
    year--;
    month = 11;
  }
  initCalender();
}
function startDay() {
  var start = new Date(year, month, 1);
  return ((start.getDate() - 1) === -1) ? 6 : start.getDay();
}

function leapMonth() {
  return ((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

function getTotalDays() {
  if (month === -1) month = 11;

  var numMonthReal = month + 1;

  if (numMonthReal == 3 || numMonthReal == 5 || numMonthReal == 8 || numMonthReal == 10) {
    return 31;
  } else if (numMonthReal == 0 || numMonthReal == 2 || numMonthReal == 4 || numMonthReal == 6
    || numMonthReal == 7 || numMonthReal == 9 || numMonthReal == 10) {
    return 30;
  } else {
    return leapMonth() ? 29 : 28;
  }
}

$("#next_month").click(function () {
  getNextMonth();
});
$("#last_month").click(function () {
  getPrevMonth();
})

/*------------------------------------------------------------*/
// JS PARA EL CARRUSEL DE NOVEDADES

const slides = document.querySelectorAll('.slide');
const slideCount = slides.length;
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    if (idx === i) {
      slide.style.transform = 'translateX(0)';
    } else {
      slide.style.transform = 'translateX(100%)';
    }
  });
}

function nextSlide() {
  index = (index + 1) % slideCount;
  showSlide(index);
}

// Cambia automáticamente las slide cada 5 segundos
setInterval(nextSlide, 5000);

// Mostrar la slide inicial
showSlide(index);

/*------------------------------------------------------------*/
// JS que detecta si el usuario ha iniciado sesión o no para inscribirse a los cursos
const btnSectionActividades = document.getElementById('btnInscripcion');
const btnInscripcionNav = document.getElementById('btnInscripcion2');

btnSectionActividades.addEventListener('click', function () {
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
      window.location.href = './template/singin.html';
    }

    // Cerrar el modal haciendo clic fuera del mismo
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        window.location.href = './template/singin.html';
      }
      return
    }
  } else {
    // Si el usuario ha iniciado sesión, redirige a formulario.html
    window.location.href = './template/formulario.html';
  }
});
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
      window.location.href = './template/singin.html';
    }

    // Cerrar el modal haciendo clic fuera del mismo
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        window.location.href = './template/singin.html';
      }
      return
    }
  } else {
    // Si el usuario ha iniciado sesión, redirige a formulario.html
    window.location.href = './template/formulario.html';
  }
});