$(document).ready(function() {
  $.ajax( {
    url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      var post = data.shift(); // The data is an array of posts. Grab the first one.
      var content = post.content.replace(/<\/?[^>]+(>|$)/g, "");
      $('#quote-author').text("— " + post.title);
      $('#quote-content').text(content);
      $("#tweet-link").attr('href', 'http://twitter.com/home/?status="' + content + '" — ' + post.title + ' #quotes');
    },
    cache: false
  });

  rand_color();

  // Generate new quote on button click
  $('#get-quote-btn').on('click', function(e) {
      e.preventDefault();
      $('#quote').animate({ opacity: 0 });
      $.ajax( {
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
          rand_color();
          var post = data.shift(); // The data is an array of posts. Grab the first one.
          var content = post.content.replace(/<\/?[^>]+(>|$)/g, "");
          $('#quote-author').text("— " + post.title);
          $('#quote-content').html(content);
          $("#tweet-link").attr('href', 'http://twitter.com/home/?status="' + content + '" — ' + post.title + ' #quotes');
          $('#quote').animate({ opacity: 1 });
        },
        cache: false
      });
    });

  function rand_color() {
    var colors = ['A09EBB', 'A8AEC1', '746FBA', '8190C1', '53D1B3', '739B71', '82C97E', 'F9A2AB', '739B71', 'DBA86B', '8BCE8A', '6696A8'];

    const random = "#" + colors[Math.floor(Math.random() * colors.length)];

    $("body").animate({backgroundColor: random});
    $("body").css('color', random);
    $("#tweet-btn").animate({backgroundColor: random});
    $("#get-quote-btn").animate({backgroundColor: random});
  }
});
