$(document).ready(function() {
 	$.get('forum.html', function(data) {
      $('div#forum_link').html(data);
  });

 	$.get('forban_link.html', function(data) {
      $('div#forban_link').html(data);
  });

  $.get('station_cnt.txt', function(data) {
      $('div#station').html(data);
  });

  display_shoutbox();
  
 	/* shoutbox disabled while testing
  $('div#shoutbox').ajaxError(function() {
      $(this).text( "Triggered ajaxError handler on shoutbox" );
  });
  */

  $("#sb_form").submit(function(event) {
    /* stop form from submitting normally */
      event.preventDefault();
    post_shoutbox();
  });

  // spin menu icon and toggle nav
  $('#menu-icon').click(function() {
      $(this).toggleClass('rotate');
      $('#top-nav').slideToggle();
  });

  // closes mobile nav
  $('#top-nav a').click(function() {
      if ($('#top-nav').is(':visible')
      && $('#menu-icon').is(':visible')) {
          $('#top-nav').slideUp();
          $('#menu-icon').toggleClass('rotate');
      }
  });

  // hides welcome
  $('#thanks').click(function() {
      $('#welcome').slideUp();
  });

  // fab
  var links = [
    {
        "bgcolor":"rgb(173,0,11);",
        "icon":"+"
    },
    {
        "bgcolor":"rgb(27,29,30);",
        "color":"fffff",
        "icon":"M",
    },
    {
        "bgcolor":"rgb(27,29,30);",
        "color":"#fffff",
        "icon":"U"
    }
  ];
  var options = {
      rotate: true
  };
  $('#fab').jqueryFab(links, options);

  // message character counter
  updateCountdown();
  $('.message').on('input', updateCountdown);
});

function refresh_shoutbox () {
    $.get('chat_content.html', function(data) {
   		$('div#shoutbox').html(data);
   	});
}

function refresh_time_sb () {
    // Refresh rate in milli seconds
    mytime=setTimeout('display_shoutbox()', 10000);
}

function post_shoutbox () {
	$.post("/cgi-bin/psowrte.py" , $("#sb_form").serialize())
	.success(function() {
		refresh_shoutbox();
	});
	$('#shoutbox-input .message').val('');
}

function display_shoutbox() {
	refresh_shoutbox();
	refresh_time_sb();
}

function fnGetDomain(url) {
	return url.match(/:\/\/(.[^/]+)/)[1];
}

function updateCountdown() {
  // 140 is the max message length
  var remaining = 140 - $('.message').val().length;
  $('.counter').text(remaining + ' characters remaining.');
}
