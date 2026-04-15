window.onload = function () {
  pointsPick()
  openMenu()
  newsSliderMobile()
  advantagesSliderMobile()
  initSliders()
  initParalax()
  eventsSwitchSliders()

}

window.onresize = function(){
    advantagesSliderMobile()
    newsSliderMobile()
    resizingMap()
}


// WOW animation plugin init
function wowInit() {

if (window.width > 700) {

    var wow = new WOW(
      {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null,    // optional scroll container selector, otherwise use window,
        resetAnimation: true,     // reset animation on end (default is true)
      }
    );
wow.init();
}
}

wowInit()


// init Slick for .news
/*$('.news__slider').slick({
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  adaptiveHeight: true,
  centerPadding: '30px',
  prevArrow: '.news__pagination-item_left',
  nextArrow: '.news__pagination-item_right',
});*/





// mobile header open func
function openMenu() {
    var buttonOpen = $('.header-mobile__menu'),
        mobileHeader = $('.header__logo'),
        mobileMenu = $('.header__wrap'),
        panelMenu = $('.header__panel-wrap'),
        buttonClose = $('.header-mobile__close');

    $(buttonOpen).click(function () {
        $(mobileMenu).addClass('header__wrap--open')
        $(panelMenu).addClass('header__panel-wrap--open')
        $('body').css('overflow-y', 'hidden')
    })
    
    $(buttonClose).click(function () {
        $(mobileMenu).removeClass('header__wrap--open')
        $(panelMenu).removeClass('header__panel-wrap--open')
        $('body').css('overflow-y', 'visible')
    })

}




// init parallax

function initParalax(Parallax) {
$('#scene').parallax({
      calibrateX: true,
      calibrateY: true,
      invertX: false,
      invertY: false,
      limitX: false,
      limitY: 10,
      scalarX: 2,
      scalarY: 1,
      frictionX: 0.2,
      frictionY: 0.8,
      originX: 0.0,
      originY: 1.0
    });

}


function pointsPick() {

    var points = $('.partners__point'),
    positionTopBig = [505, 445, 450, 465, 400], 
    positionLeftBig = [150, 225, 560, 625, 660], 
    positionTopMiddle = [410, 370, 355, 324, 374], 
    positionLeftMiddle = [240, 315, 560, 640, 610], 
    positionTopSmall = [410, 370, 355, 324, 374], 
    positionLeftSmall = [30, 105, 450, 530, 500], 
    positionTopMini = [360, 320, 345, 324, 374], 
    positionLeftMini = [85, 135, 450, 530, 500], 
    positionTopMicro = [290, 260, 265, 254, 305], 
    positionLeftMicro = [160, 200, 385, 470, 440], 
    positionTopNano = [360, 320, 345, 324, 374], 
    positionLeftNano = [85, 135, 450, 530, 500]; 
    
    if ($(window).width() >= 1300) {

        points.each(function (i, elem) {

            $(elem).css('top', positionTopBig[i] + 'px')
            $(elem).css('left', positionLeftBig[i] + 'px')

        })
    }else if ($(window).width() < 1300 && $(window).width() >= 1230) {

        points.each(function (i, elem) {

            $(elem).css('top', positionTopMiddle[i] + 'px')
            $(elem).css('left', positionLeftMiddle[i] + 'px')

        })

    }else if ( $(window).width() < 1230 && $(window).width() >= 1024 ) {

        points.each(function (i, elem) {

            $(elem).css('top', positionTopSmall[i] + 'px')
            $(elem).css('left', positionLeftSmall[i] + 'px')

        })

    }else if ( $(window).width() < 1024 && $(window).width() >= 900 ) {

        points.each(function (i, elem) {

            $(elem).css('top', positionTopMini[i] + 'px')
            $(elem).css('left', positionLeftMini[i] + 'px')

        })

    }else if ( $(window).width() < 900 && $(window).width() >= 630 ) {

        points.each(function (i, elem) {

            $(elem).css('top', positionTopMicro[i] + 'px')
            $(elem).css('left', positionLeftMicro[i] + 'px')

        })

    }else if ( $(window).width() < 630 && $(window).width() >= 470 ) {

        points.each(function (i, elem) {

            $(elem).css('top', positionTopNano[i] + 'px')
            $(elem).css('left', positionLeftNano[i] + 'px')

        })

    }



}



var mapWidth = $('.partners__map').width()

function resizingMap() {
var newWidth = $('.partners__map').width();
    if (mapWidth == newWidth) {
    }else{
         pointsPick()
    }
    
}


// init Slick for .about

function advantagesSliderMobile() {
    if ($(window).width() < 767) {
        $('.advantages__items').slick({
          dots: false,
          speed: 300,
          infinite: true,
          slidesToShow: 1,
          arrows: false,
          centerMode: true
        });
      }else{
        if ($('.advantages__items').hasClass('slick-initialized')) {

            $('.advantages__items').slick('unslick');
        }
      }
}



function newsSliderMobile() {
    var postsNews = $('.news-item'),
        sliderNews = $('.news__slider'),
        arrayNews = [];

        function tabletInit() {
            if ($(sliderNews).hasClass('slick-initialized')) {
                $('.news__slider').slick('unslick');
                $(postsNews).unwrap().unwrap()
            }
            for(var i = 0; i < postsNews.length; i+=6) {
                postsNews.slice(i, i+6).wrapAll("<div class='news__slider-wrap'><div class='news__items'></div></div>");
            }
             // init Slick for .news
            $('.news__slider').slick({
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 1,
              adaptiveHeight: true,
              centerMode: false,
              centerPadding: '30px',
              prevArrow: '.news__pagination-item_left',
              nextArrow: '.news__pagination-item_right',
            });
        }

        function desctopInit() {
            if ($(sliderNews).hasClass('slick-initialized')) {

                $('.news__slider').slick('unslick');
                $(postsNews).unwrap().unwrap()
            }

            for(var i = 0; i < postsNews.length; i+=9) {
                postsNews.slice(i, i+9).wrapAll("<div class='news__slider-wrap'><div class='news__items'></div></div>");
            }
             // init Slick for .news
            $('.news__slider').slick({
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 1,
              adaptiveHeight: true,
              centerMode: false,
              centerPadding: '30px',
              prevArrow: '.news__pagination-item_left',
              nextArrow: '.news__pagination-item_right',
            });
        }

        function mobileInit() {
           if ($(sliderNews).hasClass('slick-initialized')) {
                $('.news__slider').slick('unslick');
                $(postsNews).unwrap().unwrap()
            }
            for(var i = 0; i < postsNews.length; i+=2) {
              postsNews.slice(i, i+2).wrapAll("<div class='news__slider-wrap'><div class='news__items'></div></div>");
            }

            // init Slick for .news
            $('.news__slider').slick({
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 1,
              adaptiveHeight: true,
              centerMode: true,
              centerPadding: '30px',
              prevArrow: '.news__pagination-item_left',
              nextArrow: '.news__pagination-item_right',
            });
        }



    if ($(window).width() < 860) {
        if ($(sliderNews).hasClass('sliderNews--mobile')) {
            mobileInit()

        }else{
            $(sliderNews).addClass('sliderNews--mobile')
            mobileInit()
           
        }

    }else if ($(window).width() < 1300){
        if ($(sliderNews).hasClass('sliderNews--tablet')) {
            tabletInit()
        }else{
            $(sliderNews).addClass('sliderNews--tablet')
            tabletInit()
        }
    }else{

        if ($(sliderNews).hasClass('sliderNews--desctop')) {
            desctopInit()

        }else{
            $(sliderNews).addClass('sliderNews--desctop')
            desctopInit()
            

        }

    }
    
}


// Users Count
function usersCount() {
    
    setTimeout(function(){
        $.ajax({
            type: "POST",
            url: 'https://my.imr.world:5925/api/users',
            data: {
                api_key : 'hj32k42h4237awy6dasg8932yhaeslj823yh2131nb837',
            },
        }).done(function(msg) {
            if (msg.status == true && msg.data) {
                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
                $('.header__counter').animateNumber({
                    number: parseFloat(1000 + msg.data),
                    numberStep: comma_separator_number_step
                });
            }
        });
    }, 3000);

}

// Load posts for news
function loadPost() {
    function GetQuotations() {
        var prep_url = "https://imr.world/wp-content/themes/main_theme/inc/api.php";
        $.getJSON(prep_url, function(data) {
            var items = [];
            if (data) {
                // get
                if (!ticker_first_init) {
                    $.each(data, function(key, val) {
                        items.push('<div class="about-market__item"><div class=".about-market__date">18.11.2017</div><a class="about-market__link" href="' + val.link + '" target="_blank" style="color: inherit;">' + val.title + '</a></div>');
                    });
                    $('.about-market__item').html(items);
                    slideActions();
                    ticker_first_init = true;
                }
                // after update
                $('.about-market__item').find('.about-market__link').fadeTo("slow", 1);
            }
        });
    }
    GetQuotations();
}

// init Slick for .about
$('.about-market__items').slick({
  dots: false,
  infinite: false,
  vertical: true,
  speed: 300,
  slidesToShow: 3,
  adaptiveHeight: true,

  prevArrow: '.about-market__pagination-up',
  nextArrow: '.about-market__pagination-down',
});

// init event sliders after load page
function initSliders() {
    

var slidersEvent = $('.events-slider');

slidersEvent.each(function (i, elem) {

    var findName = '.events-slider-' + i,
        craftName = findName + ' .events-slider__wrap',
        slidesInSlider = $(elem).find(' .events-slider__slide'),
        buttonLeft = findName + ' .events-slider__pagination-left',
        buttonRight = findName + ' .events-slider__pagination-right';

    if ($(slidesInSlider).size() !== 0){

        if ($(slidesInSlider).size() == 1) {
          var numberSlides = 1;
        }else if ($(slidesInSlider).size() == 2) {
          var numberSlides = 2;
        }else if ($(slidesInSlider).size() > 2) {
          var numberSlides = 3;
        }

        $(craftName).slick({
              dots: false,
              infinite: false,
              speed: 300,
              slidesToShow: numberSlides,
              slidesToScroll: numberSlides,
              adaptiveHeight: true,
              prevArrow: buttonLeft,
              nextArrow: buttonRight,
              responsive: [
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 660,
                  settings: {
                    slidesToShow: 1
                  }
                }

              ]
            });

    }else{
        $(elem).css('visibility', 'hidden')
    }

  })
}


// just destroy event sliders

function destroySliders() {
    

var slidersEvent = $('.events-slider');

slidersEvent.each(function (i, elem) {

    var findName = '.events-slider-' + i,
        craftName = findName + ' .events-slider__wrap',
        buttonLeft = findName + ' .events-slider__pagination-left',
        buttonRight = findName + ' .events-slider__pagination-right';

    $(craftName).slick('unslick');

  })
}

// hide event sliders
function hiddenElemsSlider() {
    var hiddenElems = $('.events-slider_hidden'),
        justElems = $('.events-slider');
    $(hiddenElems).css('display', 'none');
    $(justElems).css('opacity', '1');
}

// show event sliders
function visibleElemsSlider() {
    var hiddenElems = $('.events-slider');
    $(hiddenElems).css('opacity', '0').css('display', 'block');
}

// try to fix
function fixWrapJumping() {
    var elHeight = $('.events__wrap').height();
    $('.events__wrap').css('max-height', elHeight + 'px')
}

// try to fix after
function fixWrapJumpingAfter() {
    $('.events__wrap').css('max-height', 'auto')
}




// switch tabs .events function
function eventsSwitchSliders() {
    
    var switchers = $('.events__switcher'),
        sliders = $('.events-slider');

    $(switchers).click(function (slick) {
        var index = $(this).index(),
            nameCraft = '.events-slider-' + index + ' .events-slider_wrap';
            sliderActive = $('.events-slider_active');

        $(switchers).removeClass('events__switcher--active')
        $(this).addClass('events__switcher--active')
        $(nameCraft).slick('unslick')

        $(sliderActive).fadeOut(100)
        $(sliderActive).removeClass('events-slider_active')
        $(sliderActive).addClass('events-slider_hidden')

        
        setTimeout(function () {
            $(sliders[index]).fadeIn(100)
            $(sliders[index]).addClass('events-slider_active')
            $(sliders[index]).removeClass('events-slider_hidden')
        }, 100)


    })

}