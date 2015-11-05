/* main.js - Maggie's Playroom */

/*--------On Page Load------------*/

$(function(){
  $('header').hide();  //hide  header&navigation on page load
  $('#pagecontent').hide().delay(500).fadeIn(500);
});

/*--------Load user-selected game (w/ header&navigation)-----------*/

$('#content a').on('click', function(e){
  e.preventDefault();
  var url = this.href;

  $('header').fadeIn(500);
  $('#content').remove();
  $('#pagecontent').load(url + ' #content').hide().fadeIn(500);
});

/*--------Color game-----------*/


$(document).ready(function(){

  var colors = ["red", "blue", "yellow", "green", "purple", "orange"];

  $('body').on('click','#button, #coloragain', function(){

    var newcolor = colors[Math.floor(Math.random() * colors.length)];

    $('#content>h2').fadeOut(200).remove();
    $('#colorinstructions').html("<h2>What color is " + newcolor + "?</h2>");
    console.log(newcolor);

    $('body').on('click', '.colorbox', function (){
      console.log(newcolor);
      if(this.id == newcolor){
        $('#colorinstructions').html("<h2>Great job! Would you like to play again?").append("<button type='button' id='coloragain' class='btn'>Yes!</button>");
      } else{
        $('#colorinstructions').html("<h2>Nope...keep trying!</h2>")
      };
    });
  });
});
