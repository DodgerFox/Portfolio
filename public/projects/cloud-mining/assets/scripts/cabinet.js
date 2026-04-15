

function diagrammCabinet() {
  var dataset = [
  {
    value: 33.333,
    color: '#72cde0'
  }, {
    value: 33.333,
    color: '#72e199'
  }, {
    value: 33.333,
    color: '#aae8f4'
  }
];

var maxValue = 25;
var container = $('.statisctic-item_pulls__container');

var addSector = function(data, startAngle, collapse) {
  var sectorDeg = 3.6 * data.value;
  var skewDeg = 90 + sectorDeg;
  var rotateDeg = startAngle;
  if (collapse) {
    skewDeg++;
  }

  var sector = $('<div>', {
    'class': 'statisctic-item_pulls__sector'
  }).css({
    'background': data.color,
    'transform': 'rotate(' + rotateDeg + 'deg) skewY(' + skewDeg + 'deg)'
  });
  container.append(sector);

  return startAngle + sectorDeg;
};

dataset.reduce(function (prev, curr) {
  return (function addPart(data, angle) {
    if (data.value <= maxValue) {
      return addSector(data, angle, false);
    }

    return addPart({
      value: data.value - maxValue,
      color: data.color
    }, addSector({
      value: maxValue,
      color: data.color,
    }, angle, true));
  })(curr, prev);
}, 0);
}

diagrammCabinet()

window.onload = function () {
 
var strings = $('.statisctic-string_openable');
 strings.each(function (i, elem) {
  var heightString = $(elem).height()
  console.log(heightString)
  $(elem).css('height', heightString + 96)
 })

}

$(window).resize(function () {
  var strings = $('.statisctic-string_openable');
 strings.each(function (i, elem) {
  var heightString = $(elem).height()
  console.log(heightString)
  $(elem).css('height', 'auto')
  setTimeout(function () {
    $(elem).css('height', heightString + 96)
  }, 20)
 })
})

function switchBlocks() {
  var strings = $('.statisctic-string_openable'),
      switchers = $('.statisctic-string-switcher');

  $(switchers).click(function () {
    var stringItems = $(this).find('.statisctic__items'),
        string = $(this).parent('.statisctic-string_openable'),
        icon = $(this).find('svg')
        console.log(icon[0])
    if ($(string).hasClass('statisctic-string_openable--close')) {
      $(string).removeClass('statisctic-string_openable--close')
      $(icon[0]).css('transform', 'rotate(0deg)')
    }else{
      $(string).addClass('statisctic-string_openable--close')
      $(icon[0]).css('transform', 'rotate(-180deg)')
    }
  })
}

switchBlocks()


function openOtherMenu() {
  
  var navigation = $('.cabinet-header-nav'),
      btnOpen = $(".cabinet-header__gamburger"),
      btnClose = $(".cabinet-header__close"),
      index = false;

  $(btnOpen).click(function () {
    if (index == false) {
      if ($(window).width() >= 992) {
        $(navigation).fadeIn()
      }else{
        $(navigation).removeClass('cabinet-header-nav--close')
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
        $(navigation).addClass('cabinet-header-nav--close')
      }
      index = false
    }
  })

}

openOtherMenu()


function chartsCabinet() {
  var maxValue = $('.statisctic-item-chart__steps').find('.statisctic-item-chart__step'),
      chartColls = $('.statisctic-item-chart__col'),
      coef = $(maxValue).html() / 100;

      console.log(coef)

  chartColls.each(function (i, elem) {
    var attrCol = $(elem).attr('data-val'),
        valCol = attrCol / coef;
      $(elem).css('height', valCol + '%')
    
  })
}
chartsCabinet()