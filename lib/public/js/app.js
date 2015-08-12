$(document).ready(function() {

  $('.btn-fav').click(function() {
    var btn = $(this);
    var name = btn.data('name');

    $.ajax({
      method: 'POST',
      url: '/api/like/' + name
    }).done(function(data) {
      if (data == "true") {
        btn.find("a i").removeClass("fa-star-o");
        btn.find("a i").addClass("fa-star");
      }
    });
  });


  $('.btn-hate').click(function() {
    var btn = $(this);
    var name = btn.data('name');

    $.ajax({
      method: 'POST',
      url: '/api/hate/' + name
    }).done(function(data) {
      if (data == "true") {
        btn.parent().remove();
      }
    });
  });



});