const createTodobox = require('./createTodobox');
const storage = require('./localStorage');

$(() => {
  for(let i=0; localStorage.length>i; i++){
    let storedTodoBox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if(!storedTodoBox.completed){
      createTodobox(storedTodoBox);
    }
  }
});

$("textarea").on("keyup", function(todobox){
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

$(".title-input, .todo-input").on("keyup", () => {
  let titleValue =  /\S/.test($(".title-input").val());
  let todoValue = /\S/.test($(".todo-input").val());
  let taskLength = $('.todo-input').val().length;
  if (titleValue && todoValue && taskLength < 120){
    $(".save-btn").prop("disabled",false);
  } else {
    $(".save-btn").prop("disabled",true);
  }
});

$(".todo-input").on("keyup", function(){
  let max = 120;
  let length = $(this).val().length;
  if (length >= max) {
    $('.result').text(' you have reached the 120 character limit');
  } else {
    let charLength = max - length;
    $('.result').text(charLength + ' characters left');
  }
});

$(".title-input, .todo-input").on("keydown", (event) => {
 if(event.keyCode === 13 && $(".save-btn").prop("disabled") === false){
   $(".save-btn").click();
   $(".save-btn").prop("disabled", true);
 }
});

let lastSearch = "";

$(".quality-btn").on("click", (e) => {
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
    $btn.setAttribute('aria-pressed', 'true');
    lastSearch = quality;
  }else{
    $(".todo-card").each(function(){
      $(this).show();
    });
    $($btn).removeClass("quality-filter");
    $btn.setAttribute('aria-pressed', 'false');
    lastSearch = "";
  }
}
