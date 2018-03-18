$('document').ready(function(){
  $('section.menu div.popper').toggle();
  var menu = new Popper(
    document.querySelector('section.menu span.avatar'),
    document.querySelector('section.menu div.popper'),
    {
      placement: 'bottom'
    }
  );
  
  $('section.menu span.avatar').click(function(e){
    $('section.menu div.popper').toggle();
    menu.update();
  });
});