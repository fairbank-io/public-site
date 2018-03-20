$('document').ready(function(){
  let menu = new Popper(
    document.querySelector('section.menu span.avatar'),
    document.querySelector('section.menu div.desktop-menu'),
    {
      placement: 'bottom'
    }
  );

  $('section.menu span.avatar').on( 'click', function() {
    if( $(window).width() <= 768 ) {
      $('section.menu div.mobile-menu').slideToggle(500);
    } else {
      menu.update();
      $('section.menu div.desktop-menu').fadeToggle(200);
    }
  });
});