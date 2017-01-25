const createTodobox = require('./createTodobox');

let sortCount = 0;

$(function(){
   for(i=0; localStorage.length>i; i++){
     let storedTodobox = JSON.parse(localStorage.getItem(localStorage.key(i)));
     createTodobox(storedTodobox);
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

$(".input-search").on("keyup", function() {
  let searchValue = $(this).val().toLowerCase();
  $(".todo-card").each(function(){
    let titleText = $(this).find(".todo-title").text().toLowerCase();
    let bodyText = $(this).find(".todo-body").text().toLowerCase();

  if (titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1){
    $(this).show();
  }else{
    $(this).hide();
  }
 });
});
