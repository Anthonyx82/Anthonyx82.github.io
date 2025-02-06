(function ($) {

  "use strict";

  // COLOR MODE
  $(document).ready(function () {

    var colorMode = localStorage.getItem('colorMode');

    if (colorMode === 'dark') {
      $('body').addClass('dark-mode');
      $('.color-mode-icon').addClass('active');
    }

    $('.color-mode').click(function () {
      $('.color-mode-icon').toggleClass('active');
      $('body').toggleClass('dark-mode');
      $('p').css('color', $('body').hasClass('dark-mode') ? 'white' : '');

      var currentMode = $('body').hasClass('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('colorMode', currentMode);
    });
  });

  // HEADER
  $(".navbar").headroom();

  // PROJECT CAROUSEL
  $('.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true
  });

  // SMOOTHSCROLL
  $(function () {
    $('.nav-link, .custom-btn-link').on('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 49
      }, 1000);
      event.preventDefault();
    });
  });

  // TOOLTIP
  $('.social-links a').tooltip();

})(jQuery);
