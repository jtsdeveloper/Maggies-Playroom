/* main.js - Maggie's Playroom */

$(document).ready(function(){
  /*--------On Page Load------------*/

  $(function(){
    $('header').hide();  //hide  header&navigation on page load
    $('#pagecontent').hide().delay(500).fadeIn(500);
  });

  /*--------Load user-selected game (w/ header&navigation)-----------*/

  $('body a').on('click', function (e){
    e.preventDefault();
    var url = this.href;

    $('header').fadeIn(500);
    $('#content').remove();
    $('#pagecontent').load(url + ' #content').hide().fadeIn(500);
  });

  $('body').on('click', 'li a', function(e){
    e.preventDefault();
    var url = this.href;

    $('header').fadeIn(500);
    $('#content').remove();
    $('#pagecontent').load(url + ' #content').hide().fadeIn(500);
  });

  /*--------Color game-----------*/

  var colors = ["red", "blue", "yellow", "green", "purple", "orange"];

  $('body').on('click','#button, #coloragain', function(){

    var newcolor = colors[Math.floor(Math.random() * colors.length)];

    $('#content>h2').fadeOut(200).remove();
    $('#colorinstructions').html("<h2>What color is " + newcolor + "?</h2>");
    console.log(newcolor);

    $('body').on('click', '.colorbox', function (){
      console.log(newcolor);
      if(this.id == newcolor){
        $('#colorinstructions').html("<h2>Great job! Would you like to play again?").append("<button type='button' id='coloragain' class='btn'>Yes</button>")
        .append("<button type='button' id='coloragainno' class='btn'>No</button>");
      } else{
        $('#colorinstructions').html("<h2>Nope...keep trying! What color is " + newcolor + "?</h2>")
      };
    });
  });

  $('body').on('click', '#coloragainno', function(){
    $('#colorinstructions').html("<h2>OK...click on a new game above to have more fun!</h2>");
  });

  /*--------Counting game-----------*/
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  $('body').on('click','#button, #countagain', function(){

    var newnumber = numbers[Math.floor(Math.random() * numbers.length)];

    $('#content>h2').fadeOut(200).remove();
    $('#countinginstructions').html("<h2>What number is " + "<span style='font-family: serif;color: #b4ff69'>" +
      newnumber + "</span>" + " ?</h2>");
    console.log(newnumber);

    $('body').on('click', '.countingbox', function (){
      console.log(newnumber);
      if(this.id == newcolor){
        $('#colorinstructions').html("<h2>Great job! Would you like to play again?").append("<button type='button' id='countagain' class='btn'>Yes</button>")
        .append("<button type='button' id='countagainno' class='btn'>No</button>");
      } else{
        $('#countinginstructions').html("<h2>Nope...keep trying! What color is " + newnumber + "?</h2>")
      };
    });
  });

  $('body').on('click', '#countagainno', function(){
    $('#countingrinstructions').html("<h2>OK...click on a new game above to have more fun!</h2>");
  });

  /*--------Whack-a-mole game-----------*/
  /*
  var $1 = $('#1'),
      $2 = $('#2'),
      $3 = $('#3'),
      $4 = $('#4'),
      $5 = $('#5'),
      $6 = $('#6');

  var $molehole = [$1, $2, $3, $4, $5, $6];
  */

  var moleholes = ["#1", "#2", "#3", "#4", "#5", "#6"];

  $('body').on('click','#button, #whackamoleagain', function(){

    $('#content>h2').html("<h2>Whack a mole!</h2>");
    $('#button').replaceWith("<h2>Here we go!</h2>");

    var counter = 31;
    var gameTime = setInterval(myTimer, 1000);
    function myTimer() {
      if (counter > 0){
        counter -= 1;
        document.getElementById("whackamoleinstructions").innerHTML = "<h2>Time: " + counter + "</h2>";
      } else{
        clearInterval(gameTime);
        document.getElementById("whackamoleinstructions").innerHTML ="<h2>Score: XX<span style='padding-left: 3em'></span>Play again?"
        + "<span style='padding-left:1em'></span><button type='button' id='whackamoleagain' class='btn'>Yes</button>"
        + "<button type='button' id='whackamoleagainno' class='btn'>No</button>"
        + "</h2>";
      };
    };

    var molePop = setInterval(molePeep, 2250);
    function molePeep() {
      /*var $moleindex = $molehole[Math.floor(Math.random() * $molehole.length)];
      console.log($moleindex);
      $('moleindex').html("<h2>MOLE</h2>");*/

      moleindex = moleholes[Math.floor(Math.random() * moleholes.length)];
      console.log(moleindex);

      $(moleindex).html("MOLE");

      if (counter <= 1) {
        clearInterval(molePop);
      };
    };
  });
});
