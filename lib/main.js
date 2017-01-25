var sortCount = 0;

$(function(){
  for(i=0; localStorage.length>i; i++){
    var storedTodoBox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createTodoBox(storedTodoBox);
  }
});

function TodoBox(title, todo, id, timeStamp){
  this.title = title;
  this.todo = todo;
  this.id = id;
  this.quality = "swill";
  this.timeStamp = timeStamp;
};

function createTodoBox(todobox){
  $(".todo-container").prepend(
    `<section class="todo-card" id="`+todobox.id+`">
      <button class="delete-btn"></button>
       <p class="todo-title" contenteditable>`+todobox.title+`</p>
       <p class="todo-body" contenteditable>`+todobox.todo+`</p>
       <button class="up-vote"></button>
       <button class="down-vote"></button>
       <article>
         <h3>quality:<h3>
         <p class="quality">`+todobox.quality+`</p>
       </article>
       <aside class="time-stamp">`+todobox.timeStamp+`</aside>
     </section>
    `
  )
}



$("textarea").on("keyup", function(){
  $(this).css("height", $(this)[0].scrollHeight+"px");
})

$(".todo-container").on("focus", ".todo-title, .todo-body", function(){
  var selector = $(this).closest(".todo-card");
  var key = selector.attr("id");
  var todobox = JSON.parse(localStorage.getItem(key));
  $(this).on("keydown", function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  })
  $(this).on("blur", function(){
    todobox.title = selector.find(".todo-title").text();
    todobox.todo = selector.find(".todo-body").text();
    localStorage.setItem(key, JSON.stringify(todobox));
  })
})

$(".save-btn").on("click", function(){
  var title = $(".title-input").val();
  var todo = $(".todo-input").val();
  var timeStamp = getTimeStamp();
  var todobox = new TodoBox(title, todo, Date.now(), timeStamp);
  var key = todobox.id;
  localStorage.setItem(key, JSON.stringify(todobox));
  createTodoBox(todobox, timeStamp);
  emptyInput();
  $(".title-input").focus();
})

$(".sort-btn").on("click", function(){
  var geniusToSwillSort = $(".todo-card").sort(function(a,b){
    return $(a).find(".quality").text() > $(b).find(".quality").text();
  })
  var swillToGeniusSort = $(".todo-card").sort(function(a,b){
    return $(a).find(".quality").text() < $(b).find(".quality").text();
  })
  sortCount % 2 === 0 ? $(".todo-container").html(geniusToSwillSort) : $(".todo-container").html(swillToGeniusSort);
  sortCount++;
})

$(".title-input, .todo-input").on("keyup", function(){
  /\S/.test($(".title-input").val()) && /\S/.test($(".todo-input").val()) ? $(".save-btn").prop("disabled", false) : $(".save-btn").prop("disabled", true);
});

$(".title-input, .todo-input").on("keydown", function(event){
  if(event.keyCode === 13 && $(".save-btn").prop("disabled") === false){
    $(".save-btn").click();
    $(".save-btn").prop("disabled", true);
  }
})

$(".input-search").on("keyup", function() {
  var searchValue = $(this).val().toLowerCase();
  $(".todo-card").each(function(){
  var titleText = $(this).find(".todo-title").text().toLowerCase();
  var bodyText = $(this).find(".todo-body").text().toLowerCase();

  titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();

  });
});

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

$(".todo-container").on("click", ".delete-btn", function(){
  var selector = $(this).closest(".todo-card");
  localStorage.removeItem(selector.attr("id"));
  selector.remove();
})

$(".input-search").on("keyup", function() {
   var searchValue = $(this).val().toLowerCase();
   $(".todo-card").each(function(){
     var titleText = $(this).find(".todo-title").text().toLowerCase();
     var bodyText = $(this).find(".todo-body").text().toLowerCase();

     titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();
  });
});

function emptyInput() {
  $(".title-input").val("");
  $(".todo-input").val("");
  $(".todo-input").css("height", "42px");
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
