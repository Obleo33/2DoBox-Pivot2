const Todobox = require('./todoboxconstructor');
const createTodobox = require('./createTodobox');
const qualityArray = ['None','Low','Normal','High','Critical']

const buttons = {
  saveButton: function(){
    $(".save-btn").on("click", function(){
      let title = $(".title-input").val();
      let todo = $(".todo-input").val();
      let timeStamp = getTimeStamp();
      let todobox = new Todobox(title, todo, Date.now(),qualityArray[0], timeStamp);
      let key = todobox.id;
      localStorage.setItem(key, JSON.stringify(todobox));
      createTodobox(todobox);
      clearInput();
      $(".title-input").focus();
    });
  },

  sortButton: function() {
    $(".sort-btn").on("click", function(){
      let geniusToSwillSort = $(".todo-card").sort(function(a,b){
        return $(a).find(".quality").text() > $(b).find(".quality").text();
      });
      let swillToGeniusSort = $(".todo-card").sort(function(a,b){
        return $(a).find(".quality").text() < $(b).find(".quality").text();
      });
      if (sortCount % 2 === 0){
        $(".todo-container").html(geniusToSwillSort);
      }else{
        $(".todo-container").html(swillToGeniusSort);
      }

      sortCount++;
    });
  },

  voteQuality: function(){
    $(".todo-container").on("click", ".up-vote, .down-vote", function(){
      let todoCard = $(this).closest(".todo-card");
      let selector = $(this).attr("class");
      let quality = todoCard.find(".quality");
      let key = todoCard.attr("id");
      let todobox = JSON.parse(localStorage.getItem(key));
      let newQuality = getNewQuality(selector, quality.text());
      todobox.quality = newQuality;
      localStorage.setItem(key, JSON.stringify(todobox));
      quality.text(newQuality);
    });
  },

  deleteToDo: function(){
    $(".todo-container").on("click", ".delete-btn", function(){
      let selector = $(this).closest(".todo-card");
      localStorage.removeItem(selector.attr("id"));
      selector.remove();
    });
  }
};

function getTimeStamp(){
  let time = Date();
    return time;
}

// let clicked = e.currentTarget.className;


function getNewQuality(selector, quality){
  if(selector === "up-vote"){
    return upVote(quality);
  } else {
    return downVote(quality);
  }
}

function upVote(quality){
  let i = qualityArray.indexOf(quality);
  return qualityArray[i+1];
}

function downVote(quality){
  let i = qualityArray.indexOf(quality);
  return qualityArray[i-1];
}

function getTimeStamp(){
  let time = Date();
  return time;
}

function clearInput() {
 $(".title-input").val("");
 $(".todo-input").val("");
 $(".todo-input").css("height", "42px");
}

module.exports = buttons;

// function qualityClick(e){
//   let elementClass = e.currentTarget.className();
//   let i = qualityArray.indexOf(quality);
//   switch(elementClass){
//     case ".up-vote":
//       return qualityArray[i+1];
//       break;
//     case ".down-vote":
//       return qualityArray[i-1];
//       break;
//   }
// }
