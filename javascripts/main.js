$(function(){

  var $nav = $("#nav"),
      $header = $("#header");

  $(document).scrollspy({
    min: function() {
      return $nav.offset().top;
    },
    onEnter: function(element, position) {
      $header.addClass("fixed");
    }
  });

  $(document).scrollspy({
    max: function() {
      return $header.height();
    },
    onEnter: function(element, position) {
      $header.removeClass("fixed");
    }
  });

});
