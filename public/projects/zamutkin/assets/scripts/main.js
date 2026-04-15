window.onload = function () {

var swiper = new Swiper('.welcome-slider', {
        pagination: false,
        paginationClickable: true,
        freeMode: true,
        loop: true,
        touchRatio: 0,
        speed: 9000,
        slidesPerView: 'auto',
        simulateTouch: false,
        autoplay: {
          delay: 0,
          waitForTransition: true,
          disableOnInteraction: false
        }
    });


}