$('.about-slider__wrap').slick({
          dots: false,
          draggable: false,
          speed: 400,
          infinite: false,
          slidesToShow: 1,
          arrows: false,
          centerMode: true
        });

$('.about-slider-pagination__item').click(function () {
	var indexNav = $(this).index();
	$('.about-slider-pagination__item').removeClass('about-slider-pagination__item_active')
	$(this).addClass('about-slider-pagination__item_active')
	$('.about-slider__wrap').slick('slickGoTo', indexNav)
})