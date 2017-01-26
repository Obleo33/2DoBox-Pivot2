let createButton = require('./createButton.js');

function Todobox(title, todo, id, quality, timeStamp){
  this.title = title;
  this.todo = todo;
  this.id = id;
  this.quality = quality;
  this.timeStamp = timeStamp;
  // this.upButton = new createButton("up-vote");
  // this.downButton = new createButton("down-vote")
}

module.exports = Todobox;
