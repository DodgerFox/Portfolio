(function () {
  if (!window.jQuery) {
    return;
  }

  var $ = window.jQuery;
  var $buttonWorks = $('.header__nav-item--works').first();
  var $buttonAbout = $('.header__nav-item--about').first();
  var $headerLogo = $('.header__logo').first();
  var $header = $('.header');
  var $sectionWorks = $('.works');
  var $sectionAbout = $('.about');
  var $sectionWelcome = $('.welcome');
  var $headerItems = $('.header__nav-item');

  function normalizePathname(pathname) {
    var p = (pathname || '/').replace(/\/+$/, '');
    return p === '' ? '/' : p;
  }

  function getRouteFromLocation() {
    var path = normalizePathname(window.location.pathname);
    if (path.endsWith('/about')) {
      return 'about';
    }
    if (path.endsWith('/works')) {
      return 'works';
    }
    return 'welcome';
  }

  function getWorksTabFromHash() {
    var raw = (window.location.hash || '').replace('#', '').toLowerCase();
    return raw === 'design' ? 'design' : 'frontend';
  }

  function setWorksTab(tab) {
    var idx = tab === 'design' ? 1 : 0;
    $('.works__nav-item').removeClass('works__nav-item--active');
    $('.works__nav-item').eq(idx).addClass('works__nav-item--active');
    $('.works__slider-page').removeClass('works__slider-page_open');
    $('.works__slider-page').eq(idx).addClass('works__slider-page_open');
  }

  function openWelcome(push) {
    $header.removeClass('header--open');
    setTimeout(function () {
      $sectionWorks.removeClass('works--open');
      $sectionAbout.removeClass('about--open');
      $sectionWelcome.removeClass('welcome--left').removeClass('welcome--right');
      $headerItems.removeClass('header__nav-item--active');
    }, 250);

    if (push) {
      history.pushState({ route: 'welcome' }, '', '/');
    }
  }

  function openWorks(push, tab) {
    $sectionAbout.removeClass('about--open');
    $sectionWorks.addClass('works--open');
    $sectionWelcome.removeClass('welcome--right').addClass('welcome--left');
    $headerItems.removeClass('header__nav-item--active');
    $buttonWorks.addClass('header__nav-item--active');
    setTimeout(function () {
      $header.addClass('header--open');
    }, 250);

    var worksTab = tab === 'design' ? 'design' : 'frontend';
    setWorksTab(worksTab);

    if (push) {
      history.pushState({ route: 'works', tab: worksTab }, '', '/works#' + worksTab);
    }
  }

  function openAbout(push) {
    $sectionWorks.removeClass('works--open');
    $sectionAbout.addClass('about--open');
    $sectionWelcome.removeClass('welcome--left').addClass('welcome--right');
    $headerItems.removeClass('header__nav-item--active');
    $buttonAbout.addClass('header__nav-item--active');
    setTimeout(function () {
      $header.addClass('header--open');
    }, 250);

    if (push) {
      history.pushState({ route: 'about' }, '', '/about');
    }
  }

  function applyRouteFromLocation() {
    var route = getRouteFromLocation();
    if (route === 'about') {
      openAbout(false);
      return;
    }
    if (route === 'works') {
      openWorks(false, getWorksTabFromHash());
      return;
    }
    openWelcome(false);
  }

  function bind() {
    $buttonWorks.off('click');
    $buttonAbout.off('click');
    $headerLogo.off('click');
    $('.welcome__nav-item').off('click');
    $('.works__nav-item').off('click');
    $('[data-route="works"]').off('click');
    $('[data-route="about"]').off('click');

    $('[data-route="works"]').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openWorks(true, getWorksTabFromHash());
    });

    $('[data-route="about"]').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openAbout(true);
    });

    $headerLogo.on('click', function (e) {
      e.preventDefault();
      openWelcome(true);
    });

    $('.works__nav-item').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var tab = $(this).index() === 1 ? 'design' : 'frontend';
      openWorks(true, tab);
    });

    $(window).on('popstate', function () {
      applyRouteFromLocation();
    });

    $(window).on('hashchange', function () {
      if (getRouteFromLocation() === 'works') {
        openWorks(false, getWorksTabFromHash());
      }
    });
  }

  function init() {
    bind();
    applyRouteFromLocation();

    window.addEventListener('load', function () {
      bind();
      applyRouteFromLocation();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
