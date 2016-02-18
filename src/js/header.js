function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
function getProfileFontSize(name)
{
  var c = name.length;
  if (c < 10)
    return 26;
  if (c < 15)
    return 18;
  if (c < 20)
    return 14;
}
function onLogout(){
  $.ajax({
     url: '/api/user/logout',
     success: function(result) {
       localStorage.removeItem("username");
       window.location.href = "/login";
     },
     type: 'GET'
  });
}
$(function() {
  if (localStorage.getItem("username")){
    $('#headerUsername').text(" " + localStorage.getItem("username"));
    $('#headerUsername').css("font-size", getProfileFontSize(localStorage.getItem("username")).toString() + "px");
  }
  else{
    $.ajax({
       url: '/api/user/status',
       success: function(result) {
          if (result.status == 1 && result.data.logged_in == true){
             var extra = JSON.parse(result.data['extra']);
             $('#headerUsername').text(" " + result.data['username']);
             $('#headerUsername').css("font-size", getProfileFontSize(result.data['username']).toString() + "px");
             localStorage.setItem("username",result.data['username']);
           }
       },
       type: 'GET'
    });
  }
  //Bootstrap fix
  $('#desktop-dropdown a').click(function(){
    if ($(this).attr('id') != 'actionLogout')
      window.location.href = $(this).attr('href');
  });
  $('#desktop-dropdown-toggle').hover(
      function(){
        $('#desktop-dropdown').slideDown(200)
        $('.btn.profile').addClass('open');
        setTimeout(function() {
          $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "1");
        }, 200);
      },
      function(){
        $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "0");

        setTimeout(function() {
          $('#desktop-dropdown').slideUp(200);
          setTimeout(function() {
            $('.btn.profile').removeClass('open');
          }, 200);
        }, 250);
      }
    );
    var timespan = countdown(new Date("March 19, 2016 12:00:00 CST"), function(ts) {
      $('#tdays').text(padDigits(ts.days,2));
      $('#thours').text(padDigits(ts.hours,2));
      $('#tmins').text(padDigits(ts.minutes,2));
      $('#tsecs').text(padDigits(ts.seconds,2));
    }, countdown.DAYS | countdown.HOURS|countdown.MINUTES|countdown.SECONDS|countdown.MILLISECONDS);

    if (localStorage.getItem("nocountdown") == "true"){
      $('#countdown').addClass("hidden");
    }

});
