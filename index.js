// TODO:
// - Add way of making keys work, perhaps in the JSON file, there is another value for keys
// if the value is 0, no key is needed, if there is a value, it would need to compare with a value in here

// JSon file is formatted as follows:
// Choices value outputs to the index of the outputs array
// Output value sends to the specific array within Choices, three choices are then updated from this array

var inputVal = 0;
var choice = 0;
var outputVal = 0;
var output = $("#output");
var keyCollected = false;

//set first choices & output label
function setup(){
  $(document).ready(function(){
    $.getJSON("main.json", function(data){
      $("#first").text(data.choices[0][0].choice);
      $("#second").text(data.choices[0][1].choice);
      $("#third").text(data.choices[0][2].choice);
      $('#output').text(data.outputs[0].output);
      $('#values').text("input: "+ inputVal + " choice: " + choice + " outputVal: " + outputVal);

    }).fail(function(){
        console.log("An error has occurred.");
    });
  });
}

var restart = $("#restart");

restart.on("click", function(){
  setup();
  console.log("hi");
});
setup();

//enter & submit button event handlers

$(document).on('keypress', function(e){
  if(e.which == '13'){
    var input = $("#input").val();
    checkActions();
    actionSubmitted(input);
    $("#input").val("");
    $('#values').text("input: "+ inputVal + " choice: " + choice + " outputVal: " + outputVal);
  }
})


function checkActions(){
  let first = $("#first").html();
  let check = "go into hut"
  console.log("here");
  if (!check.localeCompare(first, undefined, {sensitivity:'accent'}) && keyCollected){
    console.log("inside");
    $("#keyLabel").text("You used the key");
  }
}


//set the text and update choices based on text

function updateOutput(inVal, choiceVal, outVal){

  $.getJSON("main.json", function(data){
    outputVal = data.choices[inVal][choiceVal].value;
    inputVal = data.outputs[outputVal].value;
    output.text(data.outputs[outputVal].output);

    //update choices
    $("#first").text(data.choices[inputVal][0].choice);
    $("#second").text(data.choices[inputVal][1].choice);
    $("#third").text(data.choices[inputVal][2].choice);



  }).fail(function(){
    console.log("An error has occurred.");
  });

}



function actionSubmitted(input){
  let first = $("#first").html();
  let second = $("#second").html();
  let third = $("#third").html();
  //compare input to current actions

    if(!input.localeCompare(first, undefined, {sensitivity:'accent'})){
      choice = 0;
      if(first == "Collect key and return" && !keyCollected){
        keyCollected = true;
        console.log("Key collected");
        $("#keyLabel").text("You have a key");
        updateOutput(inputVal, choice, outputVal);

      }else{
        updateOutput(inputVal, choice, outputVal);
      }
    }else if (!input.localeCompare(second, undefined, {sensitivity:'accent'})){
      choice = 1;
      updateOutput(inputVal, choice, outputVal);

    }else if(!input.localeCompare(third, undefined, {sensitivity:'accent'})){
      choice = 2;
      updateOutput(inputVal, choice, outputVal);

    }
}
