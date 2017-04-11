$(document).ready(function () {

  // Фиксация хэдера при прокрутке в низ
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    if(scrollTop > 60) {
      $('.main-header').css('position', 'fixed');
    } else {
      $('.main-header').css('position', 'relative');
    }
  });

  // Триггер для отображения элемента brokers на малых разрешениях
  var brokersSmall = $('.main-header:after');
  brokersSmall.focus(function () {
    $('.main-header .brokers').addClass('brokers-visible');
  });
  brokersSmall.blur(function () {
    $('.main-header .brokers').removeClass('brokers-visible');
  });
});