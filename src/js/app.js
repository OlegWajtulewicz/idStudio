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
      $('.overlay, #order').fadeIn('slow');
    })
  });

///body.lock--modal

const scrollOffElements = document.querySelectorAll('.scroll-off');
function handleClick(event) {
  document.body.classList.add('lock');
  const closeElements = document.querySelectorAll('.modal-close, .scroll-on');
  closeElements.forEach(function(closeElement) {
    closeElement.addEventListener('click', function() {
      document.body.classList.remove('lock');
    });
  });
}
scrollOffElements.forEach(function(scrollOffElement) {
  scrollOffElement.addEventListener('click', handleClick);
});





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


$('input[name=phone]').mask("(999) 999-9999");

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
  const menu = document.querySelector('.menuAcc'),
        menuCont = document.querySelector('.container__menuAcc'),
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
              body.classList.remove('lock');
          });
          })}) 




          class GraphAccordion {
	constructor(selector, options) {
		let defaultOptions = {
			isOpen: () => {},
			isClose: () => {},
			speed: 300
		};

		this.options = Object.assign(defaultOptions, options);
		this.accordion = document.querySelector(selector);
		this.control = this.accordion.querySelector('.about__btn');
		this.content = this.accordion.querySelector('.about__content');
		this.event();
	}

	event() {
		console.log('event!');
		
		if (this.accordion) {
			this.accordion.addEventListener('click', (e) => {
				this.accordion.classList.toggle('open');

				if (this.accordion.classList.contains('open')) {
					this.open();
				} else {
					this.close();
				}
			});
		}
	}

	open() {
		this.accordion.style.setProperty('--accordion-time', `${this.options.speed / 1000}s`);
		this.accordion.classList.add('is-open');
    this.control.setAttribute('aria-expanded', false);
		this.content.setAttribute('aria-hidden', true);
    this.content.style.maxHeight = null;
		this.options.isOpen(this);
	}

	close() {
		this.accordion.classList.remove('is-open');
    this.control.setAttribute('aria-expanded', true);
		this.content.setAttribute('aria-hidden', false);
    this.content.style.maxHeight = this.content.scrollHeight + 'px';
		this.options.isClose(this);
	}
}
const accordion1 = new GraphAccordion('.accordion', {
            speed: 500,
            isOpen: (acc) => {
              console.log(acc);
            },
            isClose: (acc) => {
              console.log(acc);
            }
          });


/////slider ////////////////////////////////
const slider = document.querySelector('.swiper-container');

let mySwiper = new Swiper(slider, {
	slidesPerView: 1,
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
			slidesPerView: 1,
		},
		// 768: {
		// 	slidesPerView: 0,
		// }
	}
});   


///scrollUp

const btnUp = {
	el: document.querySelector('.btn-up'),
	scrolling: false,
	show() {
	  if (this.el.classList.contains('btn-up_hide') && !this.el.classList.contains('btn-up_hiding')) {
		this.el.classList.remove('btn-up_hide');
		this.el.classList.add('btn-up_hiding');
		window.setTimeout(() => {
		  this.el.classList.remove('btn-up_hiding');
		}, 300);
	  }
	},
	hide() {
	  if (!this.el.classList.contains('btn-up_hide') && !this.el.classList.contains('btn-up_hiding')) {
		this.el.classList.add('btn-up_hiding');
		window.setTimeout(() => {
		  this.el.classList.add('btn-up_hide');
		  this.el.classList.remove('btn-up_hiding');
		}, 300);
	  }
	},
	addEventListener() {
	  window.addEventListener('scroll', () => {
		const scrollY = window.scrollY || document.documentElement.scrollTop;
		if (this.scrolling && scrollY > 0) {
		  return;
		}
		this.scrolling = false;
		if (scrollY > 500) {
		  this.show();
		} else {
		  this.hide();
		}
	  });
	  document.querySelector('.btn-up').onclick = () => {
		this.scrolling = true;
		this.hide();
		window.scrollTo({
		  top: 0,
		  left: 0,
		  behavior: 'smooth'
		});
	  }
	}
  }

  btnUp.addEventListener();  


  AOS.init({
    disable: 'phone',
    mirror: false,
    once: true
  });


 ////changeLang
 const changeL = document.querySelector('.change-lang');
 const allLang = ['en', 'ru', 'pl'];
 const urls = {
   pl: 'https://vaitulevichaleh.com/idstudio.pl',
   ru: 'https://vaitulevichaleh.com/idstudio.ru',
   en: 'https://vaitulevichaleh.com/idstudio',
 };

 changeL.onchange = function() {
   console.log(this.value);
   const lang = this.value;
   if (urls[lang]) { 
     window.location.href = urls[lang]; 
     localStorage.setItem('lang', this.value);
   } 
 }
 if (localStorage.getItem('lang') == 'en') {
   changeL.value = 'en';
 } else if (localStorage.getItem('lang') == 'ru') {
   changeL.value = 'ru';
 } else if (localStorage.getItem('lang') == 'pl') {
   changeL.value = 'pl';
 };