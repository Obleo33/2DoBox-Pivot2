
function qualityClick(e){
  console.log('qualityClick');
  // let elementClass = e.currentTarget.className();
  // let i = qualityArray.indexOf(quality);
  // switch(elementClass){
  //   case ".up-vote":
  //     return qualityArray[i+1];
  //     break;
  //   case ".down-vote":
  //     return qualityArray[i-1];
  //     break;
  // }
}

function Button(className, name){
  // qualityClick();
  this.button= $(`<button class="${className}"></button>`).text(name);
  this.button.onclick = qualityClick;
  console.log(this.button);
}



module.exports = Button;
