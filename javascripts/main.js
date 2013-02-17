$(function(){

  var $nav = $("#nav"),
      $header = $("#header");

  $(document).scrollspyx({
    min: function() {
      return $nav.offset().top;
    },
    onEnter: function(element, position) {
      $header.addClass("fixed");
    }
  });

  $(document).scrollspyx({
    max: function() {
      return $header.height();
    },
    onEnter: function(element, position) {
      $header.removeClass("fixed");
    }
  });

  $nav.on("click", "a", function() {
    var $target = $($(this).attr("href"));
    $(document).scrollTop($target.offset().top - $header.height());
    $nav.find("a").removeClass("active");
    $(this).addClass("active");
    console.log($target.offset().top + $nav.height());
    return false;
  });

});
