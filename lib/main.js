var sortCount = 0;

$(function(){
   for(i=0; localStorage.length>i; i++){
     var storedTodobox = JSON.parse(localStorage.getItem(localStorage.key(i)));
     createTodobox(storedTodobox);
   }
});

function Todobox(title, todo, id, timeStamp){
 this.title = title;
 this.todo = todo;
 this.id = id;
 this.quality = "swill";
 this.timeStamp = timeStamp;
};

function createTodobox(todobox){
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
 );
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

function emptyInput() {
 $(".title-input").val("");
 $(".todo-input").val("");
 $(".todo-input").css("height", "42px");
}
