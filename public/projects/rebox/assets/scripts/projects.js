window.onload = function () {
  initSwiperMini()
  resizeWindow()
  bigDropdownWrap()
  mobileCooks()
}

//slider for first-screen
var swiperWelcome = new Swiper('.welcome-slider', {
        pagination: {
          el: '.welcome-slider__dots',
          type: 'bullets',
          clickable: true
        },
        paginationClickable: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 500,
        navigation: {
          nextEl: '.welcome-slider__pagination .pagination__right',
          prevEl: '.welcome-slider__pagination .pagination__left',
        }

    });

//slider for section 'how-this-work'
var swiperHow = new Swiper('.how-this-work__slider', {
        pagination: {
          el: '.how-this-work__dots',
          type: 'bullets',
          clickable: true
        },
        paginationClickable: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 500,
        navigation: {
          nextEl: '.how-this-work__pagination .pagination__right',
          prevEl: '.how-this-work__pagination .pagination__left',
        }
    });

//slider for section 'our-cooks'
var swiperCooks = new Swiper('.our-cooks__slider', {
        pagination: {
          el: '.our-cooks__dots',
          type: 'bullets',
          clickable: true
        },
        paginationClickable: true,
        slidesPerView: 1,
        spaceBetween: -200,
        loop: true,
        speed: 500,
        breakpoints: {
          1550: {
            spaceBetween: -100
          },
          1450: {
            spaceBetween: -100
          },
          1300: {
            spaceBetween: 0
          }
        },
        navigation: {
          nextEl: '.our-cooks__pagination .pagination__right',
          prevEl: '.our-cooks__pagination .pagination__left',
        }
    });

function openWindowsInSlider() {
  var buttonRecipe = $('.slide-item--active .slide-item__characters-link--recipe'),
              buttonIngred = $('.slide-item--active .slide-item__characters-link--ingred'),
              blockRecipe = $('.slide-item--active .slide-item__ingredients_recipe'),
              blockIngred = $('.slide-item--active .slide-item__ingredients_ingred'),
              indexRecipe = false,
              indexIngred = false;
          
          $(buttonRecipe).click(function () {
            if (indexRecipe == false) {
              $(blockIngred).removeClass('slide-item__ingredients--open')
              indexIngred = false
              $(blockRecipe).addClass('slide-item__ingredients--open')
              indexRecipe = true
            }else{
              $(blockIngred).removeClass('slide-item__ingredients--open')
              indexIngred = false
              $(blockRecipe).removeClass('slide-item__ingredients--open')
              indexRecipe = false
            }
          })
          $(buttonIngred).click(function () {
            if (indexIngred == false) {
              $(blockRecipe).removeClass('slide-item__ingredients--open')
              indexRecipe = false
              $(blockIngred).addClass('slide-item__ingredients--open')
              indexIngred = true
            }else{
              $(blockRecipe).removeClass('slide-item__ingredients--open')
              indexRecipe = false
              $(blockIngred).removeClass('slide-item__ingredients--open')
              indexIngred = false
            }
          })
}

//slider for section 'weeks'
var bigRenderIndex = -1;
var swiperWeeks = new Swiper('.weeks__slide-in', {
        pagination: {
          el: '.slide-in__pagination-wrap',
          clickable: true,
          bulletElement: 'div',
          bulletClass: 'slide-in__pagination-item',
          bulletActiveClass: 'slide-in__pagination-item--active',
          type: 'bullets',
          renderBullet: function(swiper, index, total) {
            var names = [];
            $(".slide-in__pagination-wrap .slide-in__pagination-item").each(function(i) {
              names.push($(this).text());
            });
            bigRenderIndex++;
            var text = "<div class='slide-in__pagination-item'>";
            for (let i = 0; i <= 4; i++) {
              if (i == bigRenderIndex) {
                text += names[i] ;
              }
            }
            text += "</div>";
            return text;
          }
        },
        slideActiveClass: 'slide-item--active',
        paginationClickable: true,
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        speed: 500,
        navigation: {
          nextEl: '.slide-in__pagination-arrows .pagination-basic__right',
          prevEl: '.slide-in__pagination-arrows .pagination-basic__left',
        },
        on:{
          slideChangeTransitionEnd: function () {
            openWindowsInSlider()
          },
          init: function () {
            openWindowsInSlider()
          }
        }
        
    });

//all dropdowns
function bigDropdownWrap() {
    var buttonMenu = $('li.navigation__item-drop'),
      dropdownMenu = $('.dropdown-header'),
      bgBlur = $('.background-blur'),
      arrowMenu = $('.navigation__item-arrow'),
      backToMenu = $('.dropdown-header__back'),
      indexMenu = false;
    var buttonBasket = $('.basket__link'),
      dropdownBasket = $('.basket-drop'),
      arrowBasket = $('.basket__arrow'),
      indexBasket = false;
    var buttonMobile = $('.mobile'),
      dropdownMobile = $('.dropdown-mobile'),
      arrowMobile = $('.mobile__arrow'),
      indexMobile = false;
    var buttonGamburger = $('.gamburger'),
        buttonGamburgerClose = $('.gamburger__icon-close'),
        buttonGamburgerMain = $('.gamburger__icon'),
        mobileMenu = $('.navigation'),
        mobileIndex = false;


    function mobileMenuClose() {
        $(buttonGamburger).removeClass('gamburger--close')
        $(mobileMenu).removeClass('navigation--active')
        $(buttonGamburgerClose).fadeOut()
        setTimeout(function () {
          $(buttonGamburgerMain).fadeIn()
          $(bgBlur).fadeOut()
        }, 400)
        mobileIndex = false
    }

    function dropdownMobileClose() {
          $(dropdownMobile).removeClass('dropdown-mobile_droped')
          $(buttonMobile).removeClass('mobile--active')
          $(arrowMobile).removeClass('mobile__arrow--active')
          indexMobile = false 
    }

    function dropdownBasketClose() {
          $(dropdownBasket).removeClass('basket-drop_droped')
          $(arrowBasket).removeClass('basket__arrow--active')
          indexBasket = false  
    }

    function dropdownMenuClose() {
      $(dropdownMenu).removeClass('dropdown-header_droped')
          $(buttonMenu).removeClass('navigation__item-drop--active')
          $(buttonMenu).removeClass('navigation__item--active')
          $(arrowMenu).removeClass('navigation__item-arrow--active')
          indexMenu = false  
    }

      $(backToMenu).click(function () {
       dropdownMenuClose()
      })

      $(buttonGamburger).click(function () {
        if (mobileIndex == false) {
            dropdownBasketClose()
            dropdownMobileClose()
            $(buttonGamburgerMain).fadeOut()
            setTimeout(function () {
              $(buttonGamburger).addClass('gamburger--close')
              $(mobileMenu).addClass('navigation--active')
              $(buttonGamburgerClose).fadeIn()
              $(bgBlur).fadeIn()
              mobileIndex = true
            }, 400)
          }else{
            mobileMenuClose()
          }
      })

      $(bgBlur).click(function () {
            mobileMenuClose()
      })

      $(buttonMenu).click(function () {
        if (indexMenu == false) {
            $(dropdownMenu).addClass('dropdown-header_droped')
            $(dropdownMenu).addClass('navigation__item--active')
            $(buttonMenu).addClass('navigation__item-drop--active')
            indexMenu = true
            dropdownBasketClose()
            dropdownMobileClose()
          if (window.innerWidth > 600) {
            $(arrowMenu).addClass('navigation__item-arrow--active')
            mobileMenuClose()
          }else{

          }
        }else{
          dropdownMenuClose()
        }
      })

      $(buttonBasket).click(function () {
        if (indexBasket == false) {
          $(dropdownBasket).addClass('basket-drop_droped')
          $(arrowBasket).addClass('basket__arrow--active')
          indexBasket = true
          dropdownMobileClose()
          dropdownMenuClose()
          mobileMenuClose()
        }else{
          dropdownBasketClose()
        }
      })

      $(buttonMobile).click(function () {
        if (indexMobile == false) {
          $(dropdownMobile).addClass('dropdown-mobile_droped')
          $(buttonMobile).addClass('mobile--active')
          $(arrowMobile).addClass('mobile__arrow--active')
          indexMobile = true
          dropdownMenuClose()
          dropdownBasketClose()
          mobileMenuClose()
        }else{
          dropdownMobileClose()     
        }
      })


}


//init adaptive sliders
function initSwiperMini() {
  var mainWindow =  window.innerWidth;

    if (mainWindow < 840) {
      var swiperFeedbacks = new Swiper('.feedbacks__container', {
        pagination: {
          el: '.feedbacks__dots',
          type: 'bullets',
          clickable: true
        },
        paginationClickable: true,
        slidesPerView: 1,
        speed: 500,
        breakpoints: {
          840: {
            slidesPerView: 2,
            spaceBetween: -180
          },
          770: {
            slidesPerView: 2,
            spaceBetween: -120
          },
          770: {
            slidesPerView: 2,
            spaceBetween: -70
          },
          670: {
            slidesPerView: 1,
            spaceBetween: false
          }


        },
        navigation: {
          nextEl: '.feedbacks__pagination .pagination-basic__right',
          prevEl: '.feedbacks__pagination .pagination-basic__left',
        }

      });
      var swiperWhy = new Swiper('.why-yes__container', {
        pagination: {
          el: '.why-yes__dots',
          type: 'bullets',
          clickable: true
        },
        paginationClickable: true,
        slidesPerView: 1,
        speed: 500,
        navigation: {
          nextEl: '.why-yes__pagination .pagination-basic__right',
          prevEl: '.why-yes__pagination .pagination-basic__left',
        }
      });

    }else{
      if (swiperFeedbacks){
          swiperFeedbacks.destroy();
          swiperFeedbacks = undefined;
      }
    }
  }



function resizeWindow() {
  window.onresize = function () {
    initSwiperMini()
  }
}
function mobileCooks() {
  var content = $('.our-cooks__slide-text'),
      text = $('.our-cooks__slide-text'),
      button = $('.our-cooks__slide-more');
  
  $.each( content, function ( index, element ) {
    var elementContent = $(element).text().length;
    if ( elementContent > 156 ) {
      console.log( element, index )

    }
  })

  $(button).click(function () {
    var itemText = $(this).siblings('.our-cooks__slide-text');

    if ($(itemText).hasClass('our-cooks__slide-text--open')) {
      $(itemText).removeClass('our-cooks__slide-text--open')
      $(this).html('Читать полностью')
    }else{
      $(itemText).addClass('our-cooks__slide-text--open')
      $(this).html('Скрыть')
    }
  })
}