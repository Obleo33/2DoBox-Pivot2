const storage = {
   storeTodo: function (key, todobox){
    localStorage.setItem(key, JSON.stringify(todobox));
  },
    getTodo: function (key){
      let todo = localStorage.getItem(key);
      return JSON.parse(todo);
  }
}

  module.exports = storage;
