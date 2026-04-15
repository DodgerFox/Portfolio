'use strict'

function menu(){
  var buttonOpen = $('.header__mobile-menu'),
      buttonClose = $('.header__close-button'),
      buttonCloseTwo = $('.header__mobile-button'),
      htnlWindow = $('html'),
      menu = $('nav.header__navigation');
  $(buttonOpen).click(function () {
      $(menu).addClass('menuOpen')
      $(htnlWindow).addClass('fixed-window')
  })
  $(buttonClose).click(function () {
      $(menu).removeClass('menuOpen')
      $(htnlWindow).removeClass('fixed-window')
  })
  $(buttonCloseTwo).click(function () {
      $(menu).removeClass('menuOpen')
      $(htnlWindow).removeClass('fixed-window')
  })

}
menu()

function contactOpen() {
  var buttonOpen = $('.welcome__button'),
      buttonOpenMenu = $('.header__mobile-button'),
      buttonClose = $('.contact-with-us__close'),
      buttonCloseMobile = $('.contact-with-us__close-button'),
      sectionContact = $('section.contact-with-us'),
      footerSlide = $('.footer-slide'),
      sectionPolicy = $('section.policy'),
      closeArea = $('.footer-slide__close-area'),
      pageTransform = $('.page');

  function closeForm() {
      $(pageTransform).removeClass('page-transform')
      $(footerSlide).removeClass('footer-slide_open-one')
      $(footerSlide).removeClass('footer-slide_open-two')
      $(pageTransform).removeClass('page-fixed')
      $(closeArea).removeClass('footer-slide__close-area_active')

  }
  function openForm() {
      $(pageTransform).addClass('page-fixed')
      $(pageTransform).addClass('page-transform')
      $(footerSlide).addClass('footer-slide_open-one')
      $(closeArea).addClass('footer-slide__close-area_active')
      setTimeout(function () {
       $(pageTransform).removeClass('page-fixed')
      }, 500);
  }

  $(buttonOpenMenu).click(function() {
      openForm()
  });
  $(buttonOpen).click(function() {
      openForm()
  });
  $(buttonClose).click(function() {
      closeForm()      
  });
  $(buttonCloseMobile).click(function() {
      closeForm()    
  });


}

contactOpen()


function policyOpen() {
  var buttonOpen = $('p.contact-with-us__form__confidential'),
      buttonClose = $('.policy__close'),
      buttonCloseMobile = $('.policy__close-button'),
      sectionPolicy = $('section.policy'),
      sectionContact = $('section.contact-with-us'),
      footerSlide = $('.footer-slide'),
      pageTransform = $('.page');

  function policyClose() {
      $(pageTransform).removeClass('page-fixed')
      $(footerSlide).removeClass('footer-slide_open-two')
      $(sectionPolicy).removeClass('policy__open')
  }

  $(buttonOpen).click(function() {
      $(sectionPolicy).addClass('policy__open')
      $(footerSlide).addClass('footer-slide_open-two')
      $(pageTransform).addClass('page-fixed')
  });

  $(buttonClose).click(function() {
      policyClose()
  });

  $(buttonCloseMobile).click(function() {
      policyClose()
  });


}

policyOpen()

function contactsOpen() {
  var buttonOpen = $('.links__navigation__contacts'),
      buttonClose = $('.contacts__close'),
      buttonCloseMobile = $('.contacts__close-button'),
      sectionContact = $('section.contacts'),
      closeArea = $('.contacts__close-area'),
      pageTransform = $('.page');

  function contactsClose() {
    $(pageTransform).removeClass('page-transform-up')
      $(sectionContact).removeClass('contacts_active')

      setTimeout(function () {
        $(pageTransform).removeClass('page-fixed')
      }, 500);
  }
  $(buttonOpen).click(function() {
      $(pageTransform).addClass('page-fixed')
      $(pageTransform).addClass('page-transform-up')
      $(sectionContact).addClass('contacts_active')
      $(closeArea).addClass('contacts__close-area_active')
  });
  $(buttonClose).click(function() {
      $(pageTransform).removeClass('page-transform-up')
      $(sectionContact).removeClass('contacts_active')
      $(closeArea).removeClass('contacts__close-area_active')
      setTimeout(function () {
        $(pageTransform).removeClass('page-fixed')
      }, 500);
  });
  $(buttonCloseMobile).click(function() {
      contactsClose()
  });
  $(closeArea).click(function() {
      contactsClose()
  });
  

}

contactsOpen()

function initMapContacts() {

        var uluru = {lat: 59.9253978, lng: 30.3413279};
        var mapMain = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: uluru,
          disableDefaultUI: true,
          scrollwheel: true,
          styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]

        });

        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        
        if (is_chrome){
          var mainMarker = 'assets/images/svg/marker.svg';
        }else{
          var mainMarker = 'assets/images/marker.png';
        }

        var markerContactsOne = new google.maps.Marker({
          position: uluru,
          map: mapMain,
          icon: mainMarker
        });
}

initMapContacts()

function wowInit() {
  new WOW().init();
}

wowInit()



  jQueryValidate()

function jQueryValidate() {
  $("#contact-with-us__form").validate({
       rules:{

            name:{
                required: true,
                minlength: 2,
                maxlength: 16,
            },

            email:{
                required: true,
                email: true
            },
       },

       messages:{

            name:{
                required: "Серьезно?",
                minlength: "Имя должно быть минимум 2 символа",
                maxlength: "Максимальное число символов - 16",
            },

            email:{
                required: "Серьезно?",
                email: "На такую почту письмо не придет"
            },

       }

    });

$("#telephone").mask("+9 (999) 999-9999");
}
