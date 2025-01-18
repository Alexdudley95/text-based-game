// TODO:
// - Add way of making keys work, perhaps in the JSON file, there is another value for keys
// if the value is 0, no key is needed, if there is a value, it would need to compare with a value in here

// JSon file is formatted as follows:
// Choices value outputs to the index of the outputs array
// Output value sends to the specific array within Choices, three choices are then updated from this array

var inputVal = 0;
var outputVal = 0;
var output = $("#output");
var keyCollected = false;

//set first choices & output label
$(document).ready(function(){
  $.getJSON("main.json", function(data){
    $("#first").text(data.choices[0][0].choice);
    $("#second").text(data.choices[0][1].choice);
    $("#third").text(data.choices[0][2].choice);
    $('#output').text(data.outputs[0].output);

  }).fail(function(){
      console.log("An error has occurred.");
  });
});

//enter & submit button event handlers

$(document).on('keypress', function(e){
  if(e.which == '13'){
    var input = $("#input").val();
    // checkActions();
    actionSubmitted(input);
    $("#input").val("");

  }
})

// var submit = $("#inputBut");

// submit.on("click", function(){
//   var input = $("#input").val();
//   actionSubmitted(input);
//   $("#input").val("");
//   checkActions();
// });

// // function checkActions(){
// //   let first = $("first").html();
// //   console.log("here");
// //   if (first == "Go into hut" && keyCollected == true){
// //     console.log("inside");
// //     $("#keyLabel").text("You used the key");
// //   }


// }

function actionSubmitted(input){
  let first = $("#first").html();
  let second = $("#second").html();
  let third = $("#third").html();

  //compare input to current actions
  $.getJSON("main.json", function(data){

    if(!input.localeCompare(first, undefined, {sensitivity:'accent'})){
      if(first == "Collect key and return" && !keyCollected){
        keyCollected = true;
        console.log("Key collected");
        $("#keyLabel").text("You have a key");
        outputVal = data.choices[inputVal][0].value;
        output.text(data.outputs[outputVal].output);
        inputVal = data.outputs[outputVal].value;
        updateSelector(inputVal);

      }else{
        outputVal = data.choices[inputVal][0].value;
        output.text(data.outputs[outputVal].output);
        inputVal = data.outputs[outputVal].value;
        updateSelector(inputVal);
      }
    }else if (!input.localeCompare(second, undefined, {sensitivity:'accent'})){
      outputVal = data.choices[inputVal][1].value;
      output.text(data.outputs[outputVal].output);
      inputVal = data.outputs[outputVal].value;
      updateSelector(inputVal);

    }else if(!input.localeCompare(third, undefined, {sensitivity:'accent'})){

      outputVal = data.choices[inputVal][2].value;
      output.text(data.outputs[outputVal].output);
      inputVal = data.outputs[outputVal].value;
      updateSelector(inputVal);

    }
  }).fail(function(){
    console.log("An error has occurred.");
  });
}

//set the choices
function updateSelector(inputVal){

    $.getJSON("main.json", function(data){
      $("#first").text(data.choices[inputVal][0].choice);
      $("#second").text(data.choices[inputVal][1].choice);
      $("#third").text(data.choices[inputVal][2].choice);
    }).fail(function(){
        console.log("An error has occurred.");
    });
  }

//set the text and update choices based on text
//this seems to break everything at the moment
  function updateOutput(inputVal, choice, outputVal){
    $("#values").text(" " + inputVal + " " + choice + " " + outputVal);

    $.getJSON("main.json", function(data){
      outputVal = data.choices[inputVal][choice].value;
      output.text(data.outputs[outputVal].output);
      inputVal = data.outputs[outputVal].value;
      updateSelector(inputVal);
    }).fail(function(){
      console.log("An error has occurred.");
    });

  }