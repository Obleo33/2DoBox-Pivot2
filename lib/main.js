const createTodobox = require('./createTodobox');

$(() => {
  for(let i=0; localStorage.length>i; i++){
    let storedTodoBox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if(!storedTodoBox.completed){
      createTodobox(storedTodoBox);
    }
  }
});

$("textarea").on("keyup", function(){
 $(this).css("height", $(this)[0].scrollHeight+"px");
});

$(".todo-container").on("focus", ".todo-title, .todo-body", function(){
  let selector = $(this).closest(".todo-card");
  let key = selector.attr("id");
  let todobox = JSON.parse(localStorage.getItem(key));
  $(this).on("keydown", function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  });

  $(this).on("blur", function(){
      todobox.title = selector.find(".todo-title").text();
      todobox.todo = selector.find(".todo-body").text();
      localStorage.setItem(key, JSON.stringify(todobox));
    });
  });

$(".title-input, .todo-input").on("keyup", function(){
  let titleValue =  /\S/.test($(".title-input").val());
  let todoValue = /\S/.test($(".todo-input").val());
  if (titleValue && todoValue){
    $(".save-btn").prop("disabled",false);
  } else {
    $(".save-btn").prop("disabled",true);
  }

});

$(".title-input, .todo-input").on("keydown", function(event){
 if(event.keyCode === 13 && $(".save-btn").prop("disabled") === false){
   $(".save-btn").click();
   $(".save-btn").prop("disabled", true);
 }
});

$(".input-search").on("keyup", function() {
 let searchValue = $(this).val().toLowerCase();
 $(".todo-card").each(function(){
   let titleText = $(this).find(".todo-title").text().toLowerCase();
   let bodyText = $(this).find(".todo-body").text().toLowerCase();

   if (titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1) {
     $(this).show();
   }else{
     $(this).hide();
   }
 });
});

let lastSearch = "";

$(".quality-btn").on("click", function(e){
  clearBtnClass();
  $(".input-search").val("");
  let $qualityBtn = e.target;
  let buttonQuality = $qualityBtn.name;
  qualityFilter(buttonQuality,$qualityBtn);
});

function clearBtnClass (){
  let $qualityBtnArray = $(".quality-btn").toArray();
  $qualityBtnArray.forEach(function(btn){
    $(btn).removeClass("quality-filter");
  });
}

function qualityFilter(quality,$btn){
  if (quality !== lastSearch){
    $(".todo-card").each(function(){
      let qualityText = $(this).find(".quality").text();
      if (qualityText.indexOf(quality) !== -1){
        $(this).show();
      }else{
        $(this).hide();
      }
    });
    $($btn).addClass("quality-filter");
    lastSearch = quality;
  }else{
    $(".todo-card").each(function(){
      $(this).show();
    });
    $($btn).removeClass("quality-filter");
    lastSearch = "";
  }
}

$(".input-search").on("keyup", function() {
  clearBtnClass();
  let searchValue = $(this).val().toLowerCase();
  $(".todo-card:visible").each(function(){
    let titleText = $(".todo-title").text().toLowerCase();
    let bodyText = $(".todo-body").text().toLowerCase();
  if (titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1){
    $(this).show();
  }else{
    $(this).hide();
  }
 });
});
