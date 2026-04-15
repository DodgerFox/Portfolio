window.onload = function () {
  openMenu()
  anchors()
  feedbackSwitch()
}

document.addEventListener('scroll', function (event) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop == 0) {
      $('.header').removeClass('header--fixed')
    }else{
      $('.header').addClass('header--fixed')
    }
}, true);

$('.rate-slider').slick({
  dots: false,
  infinite: false,
  vertical: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 1,
        infinite: false,
        dots: false
      }
    }

  ],
});


function openMenu() {
  
  var navigation = $('.navigation'),
      btnOpen = $(".header__gamburger"),
      btnClose = $(".header__close"),
      index = false;

  $(btnOpen).click(function () {
    if (index == false) {
      if ($(window).width() >= 992) {
        $(navigation).fadeIn()
      }else{
        $(navigation).removeClass('navigation--close')
      }
      $(this).fadeOut()
      $(btnClose).fadeIn()
      index = true
    }
  })
  $(btnClose).click(function () {
    if (index == true) { 
      $(this).fadeOut()
      $(btnOpen).fadeIn()
      if ($(window).width() >= 992) {
        $(navigation).fadeOut()
      }else{
        $(navigation).addClass('navigation--close')
      }
      index = false
    }
  })

}





function feedbackSwitch() {
  
  var feedbackButton = $('.feedback-button')
      feedbackForm = $('.feedback-form'),
      feedbackClose = $('.feedback-form__close');

  $(feedbackButton).click(function () {
    $(this).removeClass('feedback-button--open')
    $(feedbackForm).addClass('feedback-form--open')
  })

  $(feedbackClose).click(function () {
    $(feedbackButton).addClass('feedback-button--open')
    $(feedbackForm).removeClass('feedback-form--open')
  })

}

function anchors() {
  $('.navigation__link_rate').on('click', function(e){
    var topPlace = $('.rate').offset().top - 150;
    $('html,body').stop().animate({ scrollTop: topPlace}, 1000);
    closeMenu()
    e.preventDefault();
  });

  $('.navigation__link_about').on('click', function(e){
    var topPlace = $('.reasons').offset().top - 200;
    $('html,body').stop().animate({ scrollTop: topPlace}, 1000);
    closeMenu()
    e.preventDefault();
  });
  
  $('.navigation__link_welcome').on('click', function(e){
    var topPlace = $('.welcome').offset().top;
    $('html,body').stop().animate({ scrollTop: topPlace}, 1000);
    closeMenu()
    e.preventDefault();
  });


}

