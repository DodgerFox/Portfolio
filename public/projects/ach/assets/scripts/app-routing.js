(function () {
  if (!window.jQuery) {
    return;
  }

  var $ = window.jQuery;
  var routes = {
    welcome: '.welcome',
    language: '.language',
    works: '.works',
    about: '.about'
  };

  function normalizeRoute(hash) {
    var raw = (hash || '').replace(/^#\/?/, '').toLowerCase();
    if (!raw) {
      return 'welcome';
    }
    return routes[raw] ? raw : 'welcome';
  }

  function activateRoute(route, updateHash) {
    var key = routes[route] ? route : 'welcome';

    $('.main section').removeClass('app-route-active');
    $(routes[key]).addClass('app-route-active');

    $('.header__nav-item').removeClass('header__nav-item--active');
    $('.header__nav-item[data-route="' + key + '"]').addClass('header__nav-item--active');

    if (updateHash) {
      window.location.hash = key;
    }

    if (key !== 'works') {
      $('.works__nav-item').removeClass('works__nav-item--active');
      $('.works__nav-item').first().addClass('works__nav-item--active');
      $('.works__slider-page').removeClass('works__slider-page_open');
      $('.works__slider-page').first().addClass('works__slider-page_open');
    }

    window.scrollTo(0, 0);
  }

  function bindRouteControls() {
    $('.header__nav-item, .welcome__nav-item, .language__button-wrap, .language__button-form, .welcome__button').off('click');

    $(document).on('click', '[data-route]', function (e) {
      e.preventDefault();
      var route = ($(this).attr('data-route') || '').toLowerCase();
      activateRoute(route, true);
    });

    $('.header__logo').off('click').on('click', function (e) {
      e.preventDefault();
      activateRoute('welcome', true);
    });

    $(window).off('hashchange.appRouting').on('hashchange.appRouting', function () {
      activateRoute(normalizeRoute(window.location.hash), false);
    });
  }

  function bindWorksTabs() {
    $('.works__nav-item').off('click').on('click', function () {
      if ($(this).hasClass('works__nav-item--disabled')) {
        $('.errors').addClass('errors--open');
        setTimeout(function () {
          $('.errors').removeClass('errors--open');
        }, 1600);
        return;
      }

      var index = $(this).index();
      $('.works__nav-item').removeClass('works__nav-item--active');
      $(this).addClass('works__nav-item--active');
      $('.works__slider-page').removeClass('works__slider-page_open');
      $('.works__slider-page').eq(index).addClass('works__slider-page_open');
    });
  }

  function init() {
    bindRouteControls();
    bindWorksTabs();
    activateRoute(normalizeRoute(window.location.hash), false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
