
function getHashFilter() {
  var hash = location.hash;
  // get filter=filterName
  var matches = location.hash.match( /filter=([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}

$( function() {

  var $grid = $('.projects__items');

  // bind filter button click
  var $checkboxes = $('.projects__tags__items input');
  $checkboxes.change(function() {
    var filterAttr = $('.filters button.active').attr('data-value');

    function checkChange() {
            // map input values to an array
            var inclusives = [];
            // inclusive filters from checkboxes
            $checkboxes.each( function( i, elem ) {
              // if checkbox, use value if checked
              if ( elem.checked ) {
                 if (filterAttr == '.sites, .games, .apps') {
                    var arrayFilterAttr = filterAttr.split(', ');
                    $(arrayFilterAttr).each( function( ind, element ) {
                    var modificateElem = element + elem.value;
                    inclusives.push( modificateElem );
                  });
                 }else{
                    var modificateElem = elem.value + filterAttr;
                    inclusives.push( modificateElem );
                 }
              }
            });

                if (inclusives.length > 0) {
                    filterAttr = inclusives.length ? inclusives.join(', ') : '*';
                }

            // combine inclusive filters

           var arrFilterAttr = filterAttr.split(', ');
           var normArray = [];
            $(filterAttr).removeClass('projects__item_big')
            $(filterAttr).each( function( index, item ) {
              $(item).removeClass('projects__item_big')
                $(item).each( function( indexIn, itemIn ) {
                    normArray.push(this)
                })
            })
            $(normArray).each( function( index, item ) {
               if (index == 1 || index == 2 || index == 5 || index == 6 || index == 9 || index == 10 || index == 13 || index == 14 || index == 17 || index == 18 || index == 21 || index == 22){
                      $(this).addClass('projects__item_big');
                    }
            })
            return filterAttr
          }

    var newFilters = checkChange();
$grid.isotope({
      itemSelector: '.projects__item',
      layoutMode: 'fitRows',
      filter: newFilters
      
    });

  });
  
  var filters = $('.filters button')

  $(filters).click( function mainFuncFilter() {
    var filterAttr = $( this ).attr('data-value'),
        filterButtons = $('.filters button');
    $(filterButtons).removeClass('active')
    $(this).addClass('active')

    var itemOne = $('.projects__item.design' + filterAttr),
        itemTwo = $('.projects__item.frontend' + filterAttr),
        itemTree = $('.projects__item.backend' + filterAttr),
        itemFour = $('.projects__item.designing' + filterAttr);


        function splinterIntendification() {
          if (itemOne.length == 0) {
            $('#checkbox-design').attr('checked', false);
            $('#checkbox-design').parent('li').addClass('hidden');
          }else{
            $('#checkbox-design').parent('li').removeClass('hidden');
          }
          if (itemTwo.length == 0) {
            $('#checkbox-frontend').attr('checked', false);
            $('#checkbox-frontend').parent('li').addClass('hidden');
          }else{
            $('#checkbox-frontend').parent('li').removeClass('hidden');
          }
          if (itemTree.length == 0) {
            $('#checkbox-backend').attr('checked', false);
            $('#checkbox-backend').parent('li').addClass('hidden');
          }else{
            $('#checkbox-backend').parent('li').removeClass('hidden');
          }
          if (itemFour.length == 0) {
            $('#checkbox-designing').attr('checked', false);
            $('#checkbox-designing').parent('li').addClass('hidden');
          }else{
            $('#checkbox-designing').parent('li').removeClass('hidden');
          }

        }
    splinterIntendification()


          function checkChange() {
            // map input values to an array
            var inclusives = [];
            // inclusive filters from checkboxes
            $checkboxes.each( function( i, elem ) {
              // if checkbox, use value if checked
              if ( elem.checked ) {
                if (filterAttr == '.sites, .games, .apps') {
                    var arrayFilterAttr = filterAttr.split(', ');
                    $(arrayFilterAttr).each( function( ind, element ) {
                    var modificateElem = element + elem.value;
                    inclusives.push( modificateElem );
                  });
                 }else{
                    var modificateElem = elem.value + filterAttr;
                    inclusives.push( modificateElem );
                 }
              }
            });
              if (inclusives.length > 0) {
                  filterAttr = inclusives.length ? inclusives.join(', ') : '*';
              }

           var arrFilterAttr = filterAttr.split(', '),
               normArray = [];
            $(filterAttr).removeClass('projects__item_big')
            $(filterAttr).each( function( index, item ) {
              $(item).removeClass('projects__item_big')
                $(item).each( function( indexIn, itemIn ) {
                    normArray.push(this)
                })
            })
            $(normArray).each( function( index, item ) {
              if (index == 1 || index == 2 || index == 5 || index == 6 || index == 9 || index == 10 || index == 13 || index == 14 || index == 17 || index == 18 || index == 21 || index == 22){
                      $(this).addClass('projects__item_big');
                    }
            })
            // combine inclusive filters
            return filterAttr
          }

    var newFilters = checkChange();
$grid.isotope({
      itemSelector: '.projects__item',
      layoutMode: 'fitRows',
      filter: newFilters
    });
  });

  function tagsTooImportant() {

    var tagItem = $('.tags__tag');
    $(tagItem).click(function () {

      $($checkboxes).prop("checked", false);
      $(filters).removeClass("active");
      $(filters[0]).addClass("active");

      if ($(this).hasClass('tags__tag_design')) {
        var tagFilterItem = '.design',
            tagFilterElem = '#checkbox-design';
      }else if ($(this).hasClass('tags__tag_frontend')){
        var tagFilterItem = '.frontend',
            tagFilterElem = '#checkbox-frontend';
      }else if ($(this).hasClass('tags__tag_backend')){
        var tagFilterItem = '.backend',
            tagFilterElem = '#checkbox-backend';
      }else if ($(this).hasClass('tags__tag_designing')){
        var tagFilterItem = '.designing',
            tagFilterElem = '#checkbox-designing';
      }
      $(tagFilterElem).prop("checked", true);
      var tagFilter = '.sites' + tagFilterItem + ', ' + '.games' + tagFilterItem + ', ' + '.apps' + tagFilterItem;
      
      $grid.isotope({
        itemSelector: '.projects__item',
        layoutMode: 'fitRows',
        filter: tagFilter
      });  
    })
      }

  tagsTooImportant()

  var isIsotopeInit = false;

  function onHashchange() {
    var hashFilter = getHashFilter();
    if ( !hashFilter && isIsotopeInit ) {
      return;
    }
    isIsotopeInit = true;
    // filter isotope
    $grid.isotope({
      itemSelector: '.projects__item',
      layoutMode: 'fitRows',
      filter: hashFilter
    });
    // set selected class on button
    if ( hashFilter ) {
      $('.filters button.active').removeClass('active');
      var goodFilter = $('[data-value="' + hashFilter + '"]')
      goodFilter.addClass('active');
    }

  }

  $(window).on( 'hashchange', onHashchange );
  // trigger event handler to init Isotope
  onHashchange();
});




var swiper = new Swiper('.swiper-container-first', {
        pagination: false,
        paginationClickable: true,
        freeMode: true,
        slidesPerView: 'auto'
    });

var swiper = new Swiper('.swiper-container-second', {
        pagination: false,
        paginationClickable: true,
        freeMode: true,
        slidesPerView: 'auto',
        preventClicksPropagation: false,
        preventClicks: false
    });


