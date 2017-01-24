var sortCount = 0;

$(function(){
  for(i=0; localStorage.length>i; i++){
    var storedIdeaBox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createIdeaBox(storedIdeaBox);
  }
});

function IdeaBox(title, idea, id, timeStamp){
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.quality = "swill";
  this.timeStamp = timeStamp;
};

function createIdeaBox(ideabox){
  $(".idea-container").prepend(
    `<section class="idea-card" id="`+ideabox.id+`">
      <button class="delete-btn"></button>
       <p class="idea-title" contenteditable>`+ideabox.title+`</p>
       <p class="idea-body" contenteditable>`+ideabox.idea+`</p>
       <button class="up-vote"></button>
       <button class="down-vote"></button>
       <article>
         <h3>quality:<h3>
         <p class="quality">`+ideabox.quality+`</p>
       </article>
       <aside class="time-stamp">`+ideabox.timeStamp+`</aside>
     </section>
    `
  )
}



$("textarea").on("keyup", function(){
  $(this).css("height", $(this)[0].scrollHeight+"px");
})

$(".idea-container").on("focus", ".idea-title, .idea-body", function(){
  var selector = $(this).closest(".idea-card");
  var key = selector.attr("id");
  var ideabox = JSON.parse(localStorage.getItem(key));
  $(this).on("keydown", function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  })
  $(this).on("blur", function(){
    ideabox.title = selector.find(".idea-title").text();
    ideabox.idea = selector.find(".idea-body").text();
    localStorage.setItem(key, JSON.stringify(ideabox));
  })
})

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
})

$(".sort-btn").on("click", function(){
  var geniusToSwillSort = $(".idea-card").sort(function(a,b){
    return $(a).find(".quality").text() > $(b).find(".quality").text();
  })
  var swillToGeniusSort = $(".idea-card").sort(function(a,b){
    return $(a).find(".quality").text() < $(b).find(".quality").text();
  })
  sortCount % 2 === 0 ? $(".idea-container").html(geniusToSwillSort) : $(".idea-container").html(swillToGeniusSort);
  sortCount++;
})

$(".title-input, .idea-input").on("keyup", function(){
  /\S/.test($(".title-input").val()) && /\S/.test($(".idea-input").val()) ? $(".save-btn").prop("disabled", false) : $(".save-btn").prop("disabled", true);
});

$(".title-input, .idea-input").on("keydown", function(event){
  if(event.keyCode === 13 && $(".save-btn").prop("disabled") === false){
    $(".save-btn").click();
    $(".save-btn").prop("disabled", true);
  }
})

$(".input-search").on("keyup", function() {
  var searchValue = $(this).val().toLowerCase();
  $(".idea-card").each(function(){
  var titleText = $(this).find(".idea-title").text().toLowerCase();
  var bodyText = $(this).find(".idea-body").text().toLowerCase();

  titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();

  });
});

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
})

$(".idea-container").on("click", ".delete-btn", function(){
  var selector = $(this).closest(".idea-card");
  localStorage.removeItem(selector.attr("id"));
  selector.remove();
})

$(".input-search").on("keyup", function() {
   var searchValue = $(this).val().toLowerCase();
   $(".idea-card").each(function(){
     var titleText = $(this).find(".idea-title").text().toLowerCase();
     var bodyText = $(this).find(".idea-body").text().toLowerCase();

     titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();
  });
});





function emptyInput() {
  $(".title-input").val("");
  $(".idea-input").val("");
  $(".idea-input").css("height", "42px");
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

function getTimeStamp(){
  var time = Date();
    return time;
}
