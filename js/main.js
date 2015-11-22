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

  $('body').on('click','#colorbutton, #coloragain', function(){

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

  $('body').on('click','#countingbutton, #countagain', function(){

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

  var moleholes = ["#1", "#2", "#3", "#4", "#5", "#6"];
  var score;

  $('body').on('click','#whackamolebutton, #whackamoleagain', function(){

    score = 0;

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
        $(".molecontainer>div.peep").removeClass("peep");
        document.getElementById("whackamoleinstructions").innerHTML ="<h2>Score: " + score + "<span style='padding-left: 3em'></span>Play again?"
        + "<span style='padding-left:1em'></span><button type='button' id='whackamoleagain' class='btn'>Yes</button>"
        + "<button type='button' id='whackamoleagainno' class='btn'>No</button>"
        + "</h2>";
      };
    };

    var molePop = setInterval(molePeep, 2250);
    function molePeep() {
      $(".molecontainer>div.peep").removeClass("peep");

      moleindex = moleholes[Math.floor(Math.random() * moleholes.length)];
      console.log(moleindex);

      $('.molebox').empty();
      $(moleindex).toggleClass('peep');

      if (counter <= 1) {
        $('.molebox').empty();
        clearInterval(molePop);
      };
    };

    $('body').on('click','.peep', function(){
      $('.peep')
        .mousedown(function(){
          $(this).addClass('whack');
        })
        .mouseup(function(){
          $(this).removeClass('whack');
        });

      score += 1;
      console.log(score);
    });
  });
  /*--------Matching game-----------*/
  var newdeck = "test";
  var cardindex, facecard;
  var cardspots = ["#1",
                   "#2",
                   "#3",
                   "#4",
                   "#5",
                   "#6",
                   "#7",
                   "#8"];

  var deck = ["smile",
              "smile",
              "flower",
              "flower",
              "pizza",
              "pizza",
              "cat",
              "cat"];

  $('body').on('click','#matchingbutton, #matchingagain', function(){

    $('#matchinginstructions>h2').replaceWith("<h2>Find the matching cards!</h2>");
    $('#matchinginstructions>#matchingbutton').fadeOut(500).remove();

    //Prep Cards (shuffle and lay out)

    (function shuffleDeck() {
      for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      };

      newdeck = deck;
    }());

    for (k = 0; k < newdeck.length; k++){

      cardindex = cardspots[k];
      facecard = newdeck[k];

      $(cardindex).addClass(facecard);

      console.log(cardindex,facecard);
    };

    //Begin Gameplay

    var count = 0;
    var thiscard = "";
    var guess1 = "";
    var guess2 = "";

    $('body').on('click', '.cardbox', function() {

      thiscard = this;                                    //store current card
      count += 1;                                         //2 counts per turn

      if (count==1){
        $(this).toggleClass('cardback');                  //turn over card
        guess1 = thiscard;                                //stores card class for potential match

      } else {
          console.log(guess1, guess2);

          $(this).toggleClass('cardback');                //turn over card (if first card alreayd turned)
          guess2 = thiscard;

          if (guess1.className == guess2.className) {     //checks for match
            $(guess1).addClass("match");                  //adds "match" class
            $(guess2).addClass("match");

          } else {
            setTimeout(function() {                       //turns cards back over and begins new turn
              $(guess1).addClass("cardback");
              $(guess2).addClass("cardback");
            }, 1500);
          };

          count = 0;                                      //resets count to "0" after 2 misses
      };
    });
  });
});
