import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

/*
import Swiper, { Navigation, Pagination } from 'swiper';
const swiper = new Swiper();
*/

//////////////////////////////////////////////////////////////////////////////////////

//tabs-galery
$('ul.portfolio__tabs').on('click', 'li:not(.portfolio__tab_active)', function() {
    $(this)
      .addClass('portfolio__tab_active').siblings().removeClass('portfolio__tab_active')
      .closest('div.portfolio__wrapper').find('div.portfolio__content').removeClass('portfolio__content_active').eq($(this).index()).addClass('portfolio__content_active');
  });

          //modal-galery//////////////////////////////////////////////////////////////

// $('[data-modal=galery]').on('click', function() {
//     $('.overlay-moda, #galery').fadeIn('slow');
//   });
//   $('.modal1__close').on('click', function() {
//     $('.overlay-moda, #galery').fadeOut('slow');
//   });

  //modal//////////////////////////////////////////////////
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

///body.lock--modal//////////////////////////////////////////////////////////////

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



///////////////////////////////////////////////////////////////////////////////

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

/////////////////////////
$('input[name=phone]').mask("(999) 999-9999");
/////////////////////
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

///////////////////burger///////////////////////////////////////////////////////////////////////////

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



//////////////////////////////////////////////////////////////////////////////////////////////


///scrollUp///////////////////////////////////////////////////////

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

//////////////////////////////////////////

  AOS.init({
    disable: 'phone',
    mirror: false,
    once: true
  });


 ////changeLang/////////////////////////////////////////////////////////////////

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
     sessionStorage.setItem('lang', this.value);
   } 
 }
 if (sessionStorage.getItem('lang') == 'en') {
   changeL.value = 'en';
 } else if (sessionStorage.getItem('lang') == 'ru') {
   changeL.value = 'ru';
 } else if (sessionStorage.getItem('lang') == 'pl') {
   changeL.value = 'pl';
 };

 ////////////////////////////////////////////////////////////////////////////////////


 $(document).ready(function(){
  $('.carousel').slick({
    dots: true,
    arrows: false,
    infinite: true,
  //speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1170,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }, 
  ]
  });
});


//////////////////Lightbox//////////////////////////////////////Lightbox

document.querySelector('[data-modal=galery]').addEventListener('click', () => {
  // fsLightboxInstances['gal'].open(0);
  lightbox.open();
});
fsLightboxInstances['gal'].props.onOpen = () => {
  console.log(fsLightboxInstances)
};
const lightbox = new FsLightbox();

// set up props, like sources, types, events etc.
lightbox.props.sources = ['img/portfolio/1.png', 'img/portfolio/2.png','img/portfolio/3.png','img/portfolio/4.png','img/portfolio/5.png','img/portfolio/6.png','img/portfolio/7.png','img/portfolio/8.png',];
lightbox.props.onInit = () => console.log('Lightbox initialized!');