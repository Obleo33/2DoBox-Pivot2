const Todobox = require('./todoboxconstructor');
const createTodobox = require('./createTodobox');
const storage = require('./localStorage');

let sortCount = 0;


const qualityArray = ['None','Low','Normal','High','Critical'];

const buttons = {
  saveButton: ()=>{
    $(".save-btn").on("click", ()=>{
      let title = $(".title-input").val();
      let todo = $(".todo-input").val();
      let timeStamp = getTimeStamp();
      let todobox = new Todobox(title, todo, Date.now(), qualityArray[0], timeStamp);
      let key = todobox.id;
      localStorage.setItem(key, JSON.stringify(todobox));
      createTodobox(todobox, timeStamp);
      emptyInput();
      $(".title-input").focus();
    $('.result').text('120 characters left');
    });
  },

  voteQuality: ()=>{
    $(".todo-container").on("click", ".up-vote, .down-vote", ()=>{
      let todoCard = $(this).closest(".todo-card");
      let selector = $(this).attr("class");
      let quality = todoCard.find(".quality");
      let key = todoCard.attr("id");
      let todobox = JSON.parse(localStorage.getItem(key));
      let newQuality = getNewQuality(selector, quality.text());
      todobox.quality = newQuality;
      localStorage.setItem(key, JSON.stringify(todobox));
      quality.text(newQuality);
    });
  },

  completeButton: ()=>{
     $(".todo-container").on("click", ".complete-task", (e) => {
       let selector = $(e.currentTarget).closest(".todo-card");
       selector.toggleClass('grey-background');
       let key = selector.attr("id");
       let todobox = storage.getTodo(key);
       todobox.completed = !todobox.completed;
       storage.storeTodo(key, todobox);
     });
   },

  deleteToDo: ()=>{
    $(".todo-container").on("click", ".delete-btn", ()=>{
      let selector = $(this).closest(".todo-card");
      localStorage.removeItem(selector.attr("id"));
      selector.remove();
    });
  }
};

let getTimeStamp = ()=>{
  let time = Date();
    return time;
};

let getNewQuality= (selector, quality)=>{
  if(selector === "up-vote"){
    return upVote(quality);
  } else {
    return downVote(quality);
  }
};

let upVote = (quality)=>{
  let i = qualityArray.indexOf(quality);
  return qualityArray[i+1];
};

let downVote = (quality)=>{
  let i = qualityArray.indexOf(quality);
  return qualityArray[i-1];
};

let emptyInput = ()=>{
 $(".title-input").val("");
 $(".todo-input").val("");
 $(".todo-input").css("height", "42px");
};

module.exports = buttons;
