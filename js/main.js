/* main.js - Maggie's Playroom */

$(document).ready(function(){
  /*--------On Page Load------------*/

  $(function(){
    $('header').hide();                               //hide  header&navigation on page load
    $('#pagecontent').hide().delay(500).fadeIn(500);
  });

  /*--------Load user-selected game (w/ header&navigation)-----------*/

  $('body a').on('click', function (e){
    e.preventDefault();
    var url = this.href;

    $('header').fadeIn(500);
    $('#content').remove();
    $('#pagecontent').load(url + ' #content').hide().fadeIn(500);   //load game content
  });

  /*--------Color game-----------*/

  var colors = ["red", "blue", "yellow", "green", "purple", "orange"];    //create color list

  $('body').on('click','#colorbutton, #coloragain', function(){           // start game

    var newcolor = colors[Math.floor(Math.random() * colors.length)];     //randomly choose color in array

    $('#content>h2').fadeOut(200).remove();
    $('#colorinstructions').html("<h2>What color is " + newcolor + "?</h2>"); //prompt user to choose color
    console.log(newcolor);

    $('body').on('click', '.colorbox', function (){
      console.log(newcolor);
      if(this.id == newcolor){
        $('#colorinstructions').html("<h2>Great job! Would you like to play again?").append("<button type='button' id='coloragain' class='btn'>Yes</button>")     //Give option to play again
        .append("<button type='button' id='coloragainno' class='btn'>No</button>");
      } else{
        $('#colorinstructions').html("<h2>Nope...keep trying! What color is " + newcolor + "?</h2>")                                                             //Prompt with wrong answer
      };
    });
  });

  $('body').on('click', '#coloragainno', function(){                                                  //Choose not to play again
    $('#colorinstructions').html("<h2>OK...click on a new game above to have more fun!</h2>");
  });

  /*--------Counting game-----------*/
  $('body').on('click','#countingbutton, #countagain', function(){

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var CORRECTNUMBER = [1,2,3,4,5,6,7,8,9,10];

    (function shuffleNumbers() {
      for (var i = numbers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
      };

      console.log(numbers);
    }());

    $('#content>h2').fadeOut(200).remove();
    $('#countinginstructions').html("<h2>Put the numbers in order!</h2>");


  });

  $('body').on('click', '#countagainno', function(){
    $('#countingrinstructions').html("<h2>OK...click on a new game above to have more fun!</h2>");
  });

  /*--------Whack-a-mole game-----------*/

  var moleholes = ["#1", "#2", "#3", "#4", "#5", "#6"];     //Create array to hold the designated holes for mole to appear out of
  var score;

  $('body').on('click','#whackamolebutton, #whackamoleagain', function(){       //Begin gamemplay

    score = 0;

    $('#content>h2').html("<h2>Whack a mole!</h2>");
    $('#button').replaceWith("<h2>Here we go!</h2>");

    var counter = 31;                                                           //Set counter for 30 second gameplay
    var gameTime = setInterval(myTimer, 1000);                                  //Display 30 second timer
    function myTimer() {
      if (counter > 0){
        counter -= 1;
        document.getElementById("whackamoleinstructions").innerHTML = "<h2>Time: " + counter + "</h2>";
      } else{
        clearInterval(gameTime);
        $(".molecontainer>div.peep").removeClass("peep");                                                                                           // Instructions when time is up, also display score
        document.getElementById("whackamoleinstructions").innerHTML ="<h2>Score: " + score + "<span style='padding-left: 3em'></span>Play again?"
        + "<span style='padding-left:1em'></span><button type='button' id='whackamoleagain' class='btn'>Yes</button>"
        + "<button type='button' id='whackamoleagainno' class='btn'>No</button>"
        + "</h2>";
      };
    };

    var molePop = setInterval(molePeep, 2250);                                // trigger moles to "pop" every 2250 ms
    function molePeep() {                                                     // randomly select hole for mole to pop out of
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

    $('body').on('click','.peep', function(){                                 // show "whack" image when hole is whacked
      $('.peep')
        .mousedown(function(){
          $(this).addClass('whack');
        })
        .mouseup(function(){
          $(this).removeClass('whack');
        });

      score += 1;                                                            // increase score when mole is hit
      console.log(score);
    });
  });
  /*--------Matching game-----------*/

  $('body').on('click','#matchingbutton, #matchingagain', function(){

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

    $('#matchinginstructions>h2').replaceWith("<h2>Find the matching cards!</h2>");
    $('#matchinginstructions>#matchingagain').fadeOut(500).remove()
    $('#matchinginstructions>#matchingagainno').fadeOut(500).remove()
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
    var matches = 0;
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
            matches++;

          } else {
            setTimeout(function() {                       //turns cards back over and begins new turn
              $(guess1).addClass("cardback");
              $(guess2).addClass("cardback");
            }, 1500);
          };

          count = 0;                                      //resets count to "0" after 2 misses

          if(matches == 4){
              $('#matchinginstructions').html("<h2>Great job! Would you like to play again?")
              .append("<button type='button' id='matchingagain' class='btn'>Yes</button>")
              .append("<button type='button' id='matchingagainno' class='btn'>No</button>");

            //  $('body').on('click', '#matchingagain', function(){
            //    $('.cardbox').removeClass("match");
            //  });

            } else{
              $('#matchinginstructions').html("<h2>Keep going...you can do it!");
            };
      };


    });



  });



});
