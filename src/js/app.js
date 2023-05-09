import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

/*
import Swiper, { Navigation, Pagination } from 'swiper';
const swiper = new Swiper();
*/
//tabs-galery
$('ul.portfolio__tabs').on('click', 'li:not(.portfolio__tab_active)', function() {
    $(this)
      .addClass('portfolio__tab_active').siblings().removeClass('portfolio__tab_active')
      .closest('div.portfolio__wrapper').find('div.portfolio__content').removeClass('portfolio__content_active').eq($(this).index()).addClass('portfolio__content_active');
  });

          //modal-galery

$('[data-modal=galery]').on('click', function() {
    $('.overlay-moda, #galery').fadeIn('slow');
  });
  $('.modal1__close').on('click', function() {
    $('.overlay-moda, #galery').fadeOut('slow');
  });

  //modal
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  
    $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  
  $('.pricing__btn').each(function(i) {
    $(this).on('click', function() {
      //$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });


///scrollOnOff
//   const body = document.querySelector('body');
//   const modal = document.querySelector('.scroll-off');
//   const close = document.querySelector('.scroll-on');
//   const start = document.querySelector('.start-off');
//   const consalt = document.querySelector('.consalt-off');
//   const closeModal = document.querySelector('.modal__close');

//   modal.addEventListener('click', () => {
//     body.classList.add('lock');
// }); 
// start.addEventListener('click', () => {
//   body.classList.add('lock');
// }); 
// consalt.addEventListener('click', () => {
//   body.classList.add('lock');
// }); 

// close.addEventListener('click', () => {
//     body.classList.remove('lock');
// });
// closeModal.addEventListener('click', () => {
//   body.classList.remove('lock');
// });

// Находим все элементы с классом "scroll-off"
const scrollOffElements = document.querySelectorAll('.scroll-off');

// Функция-обработчик клика на элементах "scroll-off"
function handleClick(event) {
  // Добавляем класс "lock" к элементу <body>
  document.body.classList.add('lock');
  
  // Находим все элементы, на которые можно кликнуть, чтобы убрать класс "lock"
  const closeElements = document.querySelectorAll('.modal-close, .scroll-on');
  
  // Добавляем обработчик клика для каждого такого элемента
  closeElements.forEach(function(closeElement) {
    closeElement.addEventListener('click', function() {
      // Убираем класс "lock" у элемента <body>
      document.body.classList.remove('lock');
    });
  });
}

// Добавляем обработчик клика для каждого элемента "scroll-off"
scrollOffElements.forEach(function(scrollOffElement) {
  scrollOffElement.addEventListener('click', handleClick);
});


/////slider ////////////////////////////////
const slider = document.querySelector('.swiper-container');

let mySwiper = new Swiper(slider, {
	slidesPerView: 2,
	spaceBetween: 30,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	// autoplay: {
	// 	delay: 5000,
	// },

	breakpoints: {
		1025: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 1,
		}
	}
})


function valideForms(form) {
  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Please specify your name",
        minlength: jQuery.validator.format("At least {0} characters required!")
      }, 
      phone: "Please enter your phone number",
      email: {
        required: "We need your email address",
        email: "Your email address must be in the format of name@domain.com"
      }
    }
  });
};


valideForms('#consultation form');
valideForms('#order form');


// валидация тел
$('input[name=phone]').mask("(999) 999-9999");

// отправка писем
$('form').submit(function(e) {
  e.preventDefault();

  if (!$(this).valid()) {
    return;
  }

  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');
  });
  return false; 
});


window.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu'),
        menuCont = document.querySelector('.container__menu'),
        menuItem = document.querySelectorAll('.menu__link'),
        burger = document.querySelector('.burger'),
        phone = document.querySelector('.header__phone'),
        body = document.querySelector('body');
        

        burger.addEventListener('click', () => {
          burger.classList.toggle('active');
          menu.classList.toggle('active');
          menuCont.classList.toggle('active');
          phone.classList.toggle('active');
          body.classList.toggle('lock');
      });
  
      menuItem.forEach(item => {
        item.addEventListener('click', () => {
              burger.classList.toggle('active');
              menu.classList.toggle('active');
              menuCont.classList.toggle('active');
              phone.classList.toggle('active');
              body.classList.toggle('lock');
          });
          })}) 