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

var colors = ["red", "blue", "yellow", "green", "purple", "orange"];
var newcolor = colors[Math.floor(Math.random() * colors.length)];

$(document).ready(function(){
  $('body').on('click','#button',function(){
      $('#colorinstructions').html("Let's Begin!");
  });
});
