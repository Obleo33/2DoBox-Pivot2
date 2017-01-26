let Button = require('./buttonConstructor.js');

function Todobox(title, todo, id, quality, timeStamp){
  this.title = title;
  this.todo = todo;
  this.id = id;
  this.quality = quality;
  this.timeStamp = timeStamp;
  this.upButton = new Button("up-vote");
  this.downButton = new Button("down-vote")
}

module.exports = Todobox;
