const Todobox = require('./todoboxconstructor')
const createTodobox = require('./createTodobox')

const buttons = {
  saveButton: function(){
    $(".save-btn").on("click", function(){
      var title = $(".title-input").val();
      var todo = $(".todo-input").val();
      var timeStamp = getTimeStamp();
      var todobox = new Todobox(title, todo, Date.now(), timeStamp);
      var key = todobox.id;
      localStorage.setItem(key, JSON.stringify(todobox));
      createTodobox(todobox, timeStamp);
      emptyInput();
      $(".title-input").focus();
    });
  },

  sortButton: function() {
    $(".sort-btn").on("click", function(){
      var geniusToSwillSort = $(".todo-card").sort(function(a,b){
        return $(a).find(".quality").text() > $(b).find(".quality").text();
      });
      var swillToGeniusSort = $(".todo-card").sort(function(a,b){
        return $(a).find(".quality").text() < $(b).find(".quality").text();
      });
      sortCount % 2 === 0 ? $(".todo-container").html(geniusToSwillSort) : $(".todo-container").html(swillToGeniusSort);
      sortCount++;
    })
  },

  voteQuality: function(){
    $(".todo-container").on("click", ".up-vote, .down-vote", function(){
      var todoCard = $(this).closest(".todo-card");
      var selector = $(this).attr("class");
      var quality = todoCard.find(".quality");
      var key = todoCard.attr("id");
      var todobox = JSON.parse(localStorage.getItem(key));
      var newQuality = getNewQuality(selector, quality.text());
      todobox.quality = newQuality;
      localStorage.setItem(key, JSON.stringify(todobox));
      quality.text(newQuality);
    })
  },

  deleteToDo: function(){
    $(".todo-container").on("click", ".delete-btn", function(){
      var selector = $(this).closest(".todo-card");
      localStorage.removeItem(selector.attr("id"));
      selector.remove();
    });
  }
};

function getTimeStamp(){
  var time = Date();
    return time;
}

function getNewQuality(selector, quality){
  if(selector === "up-vote"){
    return upVote(quality);
  } else {
    return downVote(quality);
  }
}

function upVote(quality){
  switch (quality) {
    case "swill":
    return "plausible";
    case "plausible":
    return "genius";
    default:
    return "genius";
  }
}

function downVote(quality){
  switch (quality) {
    case "genius":
    return "plausible";
    case "plausible":
    return "swill";
    default:
    return "swill";
  }
}

function emptyInput() {
 $(".title-input").val("");
 $(".todo-input").val("");
 $(".todo-input").css("height", "42px");
}

module.exports = buttons;
