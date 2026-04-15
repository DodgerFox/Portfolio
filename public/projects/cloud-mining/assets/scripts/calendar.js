
$('.economic-cal-tables').slick({
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  adaptiveHeight: true,
  centerMode: true,
  centerPadding: '30px',
  arrows: false
});

var buttonsNav = $('.economic-cal-switchers .economic-cal-buttons__button'),
    buttonsNavDublicate = $('.economic-cal__buttons-wrap_flex .economic-cal-buttons__button');

$(buttonsNav).click(function () {
	var index = $(this).index();
	$(buttonsNav).removeClass('economic-cal-buttons__button--active')
	$(this).addClass('economic-cal-buttons__button--active')
	$(buttonsNavDublicate).removeClass('economic-cal-buttons__button--active')
	$(buttonsNavDublicate[index]).addClass('economic-cal-buttons__button--active')
		$('.economic-cal-tables').slick('slickGoTo', index);
})

$(buttonsNavDublicate).click(function () {
	var index = $(this).index();
	$(buttonsNavDublicate).removeClass('economic-cal-buttons__button--active')
	$(this).addClass('economic-cal-buttons__button--active')
	$(buttonsNav).removeClass('economic-cal-buttons__button--active')
	$(buttonsNav[index]).addClass('economic-cal-buttons__button--active')
		$('.economic-cal-tables').slick('slickGoTo', index);
})

