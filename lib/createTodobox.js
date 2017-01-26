module.exports = function createTodobox(todobox){
 $(".todo-container").prepend(
   `<section class="todo-card" id= ${todobox.id}>
     <button class="delete-btn"></button>
      <p class="todo-title" contenteditable>${todobox.title}</p>
      <p class="todo-body" contenteditable>${todobox.todo}</p>
      <button class="up-vote"></button>
      <button class="down-vote"></button>
      <article>
        <h3>quality:<h3>
        <p class="quality">${todobox.quality}</p>
      </article>
      <aside class="time-stamp">${todobox.timeStamp}</aside>
    </section>
   `
 );
}
