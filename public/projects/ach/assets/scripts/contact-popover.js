(function () {
  if (!window.jQuery) {
    return;
  }

  var $ = window.jQuery;

  function closePopover() {
    $('#contactPopover').removeClass('contact-popover--open').attr('aria-hidden', 'true');
  }

  function init() {
    $(document).on('click', '.js-contact-popover-toggle', function (e) {
      e.preventDefault();
      var popover = $('#contactPopover');
      var isOpen = popover.hasClass('contact-popover--open');
      if (isOpen) {
        closePopover();
      } else {
        popover.addClass('contact-popover--open').attr('aria-hidden', 'false');
      }
    });

    $(document).on('click', function (e) {
      var target = $(e.target);
      if (!target.closest('#contactPopover').length && !target.closest('.js-contact-popover-toggle').length) {
        closePopover();
      }
    });

    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        closePopover();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
