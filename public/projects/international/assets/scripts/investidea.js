
function adaptiveOptions() {
if ($(window).width() < 900) {
	$('.investidea-options').slick({
	  dots: false,
	  infinite: false,
	  speed: 500,
	  slidesToShow: 4,
	  adaptiveHeight: false,
	  centerPadding: '30px',
	  arrows: false,
	  responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 470,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 1
          }
        }


      ]

	})
}
}
adaptiveOptions()

$(window).resize(function () {
	if ($(window).width() < 900) {
		$('.investidea-options').slick('resize');
		if ($('.advantages__items').hasClass('slick-initialized')) {	
		}else{
			adaptiveOptions()
		}
	}

	else{
		$('.investidea-options').slick('unslick')
	}
})