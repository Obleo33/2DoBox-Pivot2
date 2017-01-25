const createTodobox = require('./createTodobox')

var sortCount = 0;

$(function(){
   for(i=0; localStorage.length>i; i++){
     var storedTodobox = JSON.parse(localStorage.getItem(localStorage.key(i)));
     createTodobox(storedTodobox);
   }
});

$("textarea").on("keyup", function(){
 $(this).css("height", $(this)[0].scrollHeight+"px");
});

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
 });

 $(this).on("blur", function(){
   todobox.title = selector.find(".todo-title").text();
   todobox.todo = selector.find(".todo-body").text();
   localStorage.setItem(key, JSON.stringify(todobox));
 });
});

$(".title-input, .todo-input").on("keyup", function(){
 /\S/.test($(".title-input").val()) && /\S/.test($(".todo-input").val()) ? $(".save-btn").prop("disabled",false) : $(".save-btn").prop("disabled",true);

});

$(".title-input, .todo-input").on("keydown", function(event){
 if(event.keyCode === 13 && $(".save-btn").prop("disabled") === false){
   $(".save-btn").click();
   $(".save-btn").prop("disabled", true);
 }
});

$(".input-search").on("keyup", function() {
 var searchValue = $(this).val().toLowerCase();
 $(".todo-card").each(function(){
 var titleText = $(this).find(".todo-title").text().toLowerCase();
 var bodyText = $(this).find(".todo-body").text().toLowerCase();

 titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();
 });
});

$(".input-search").on("keyup", function() {
  var searchValue = $(this).val().toLowerCase();
  $(".todo-card").each(function(){
    var titleText = $(this).find(".todo-title").text().toLowerCase();
    var bodyText = $(this).find(".todo-body").text().toLowerCase();

    titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();
 });
});
