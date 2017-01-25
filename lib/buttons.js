const Buttons = {
  saveButton: function(){
    $(".save-btn").on("click", function(){
      var title = $(".title-input").val();
      var idea = $(".idea-input").val();
      var timeStamp = getTimeStamp();
      var ideabox = new IdeaBox(title, idea, Date.now(), timeStamp);
      var key = ideabox.id;
      localStorage.setItem(key, JSON.stringify(ideabox));
      createIdeaBox(ideabox, timeStamp);
      emptyInput();
      $(".title-input").focus();
    });
  },

  sortButton: function() {
    $(".sort-btn").on("click", function(){
      var geniusToSwillSort = $(".idea-card").sort(function(a,b){
        return $(a).find(".quality").text() > $(b).find(".quality").text();
      });
      var swillToGeniusSort = $(".idea-card").sort(function(a,b){
        return $(a).find(".quality").text() < $(b).find(".quality").text();
      });
      sortCount % 2 === 0 ? $(".idea-container").html(geniusToSwillSort) : $(".idea-container").html(swillToGeniusSort);
      sortCount++;
    });
  },

  quality: function(){
    $(".idea-container").on("click", ".up-vote, .down-vote", function(){
      var ideaCard = $(this).closest(".idea-card");
      var selector = $(this).attr("class");
      var quality = ideaCard.find(".quality");
      var key = ideaCard.attr("id");
      var ideabox = JSON.parse(localStorage.getItem(key));
      var newQuality = getNewQuality(selector, quality.text());
      ideabox.quality = newQuality;
      localStorage.setItem(key, JSON.stringify(ideabox));
      quality.text(newQuality);
    });
  },

  deleteToDo: function(){
    $(".idea-container").on("click", ".delete-btn", function(){
      var selector = $(this).closest(".idea-card");
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

module.exports = Buttons;
