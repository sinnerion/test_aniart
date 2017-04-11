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


});