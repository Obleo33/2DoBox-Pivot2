const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');
require('locus');

const Buttons   = require('../lib/buttons.js');


test.describe('input fields', function(){
  this.timeout(10000);
  let driver;
 beforeEach(()=>{
   driver = new webdriver.Builder()
                         .forBrowser('chrome')
                         .build();
   driver.get('http://localhost:8080');
 });

 afterEach(()=>{
    driver.quit();
 });

 test.it('should allow me to add a title and a todo', ()=>{
   const title = driver.findElement({name: 'title'});
   const task  = driver.findElement({name: 'todo'});
   title.sendKeys('this is a title').then(()=>{
     return title.getAttribute('value');
   }).then((value)=>{
     assert.equal(value, 'this is a title');
   });
 });

 test.it('should save title edit on blur', ()=>{
   const title   = driver.findElement({name: 'title'});
   const task    = driver.findElement({name: 'todo'});
   const saveBtn = driver.findElement({name:'saveBtn'});
   title.sendKeys('this is a title');
   task.sendKeys('this is a todo');
   saveBtn.click();
   const newTitle = driver.findElement({name:'todo-title'});
   newTitle.sendKeys('edit ');
   task.click();
   driver.navigate().refresh().then(()=>{
     const newTitle = driver.findElement({name: 'todo-title'});
     return newTitle.getText();
   }).then((text)=>{
     assert.equal(text, 'edit this is a title');
   });
 });

 test.it('should filter todos based on a search string live', ()=>{
   const title      = driver.findElement({name: 'title'});
   const task       = driver.findElement({name: 'todo'});
   const saveBtn    = driver.findElement({name: 'saveBtn'});
   const textSearch = driver.findElement({name: 'text-search'});
   title.sendKeys('Title');
   task.sendKeys('this is a todo');
   saveBtn.click();
   const card = driver.findElement({className: 'todo-card'});
   textSearch.sendKeys('t');
   card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
   });
   textSearch.sendKeys('z');
   card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
   });
  });

  test.it('should move up the quality array when the up vote button is pressed and stop at critical',()=>{
    const title   = driver.findElement({name: 'title'});
    const task    = driver.findElement({name: 'todo'});
    const saveBtn = driver.findElement({name:'saveBtn'});
    title.sendKeys('this is a title');
    task.sendKeys('this is a todo');
    saveBtn.click();
    const upVote    = driver.findElement({className: 'up-vote'});
    const downVote  = driver.findElement({className: 'down-vote'});
    const quality   = driver.findElement({className: 'quality'});
    const qualityArrayTest = ['None','Low','Normal','High','Critical'];

    for (let i = 0;i<5;i++){
      quality.getText().then((q)=>{
        assert.equal(q,qualityArrayTest[i]);
        upVote.click();
      });
    }

    upVote.click();
    quality.getText().then((q)=>{
      assert.equal(q,'Critical');
    });
  });

  test.it('should move down the quality array when the down vote button is pressed and stop at none',()=>{
    const title   = driver.findElement({name: 'title'});
    const task    = driver.findElement({name: 'todo'});
    const saveBtn = driver.findElement({name:'saveBtn'});
    title.sendKeys('this is a title');
    task.sendKeys('this is a todo');
    saveBtn.click();
    const upVote    = driver.findElement({className: 'up-vote'});
    const downVote  = driver.findElement({className: 'down-vote'});
    const quality   = driver.findElement({className: 'quality'});
    const qualityArrayTest = ['Critical','High','Normal','Low','None'];

    for (let i = 0; i<5;i++){
      upVote.click();
    }

    for (let i = 0;i<5;i++){
      quality.getText().then((q)=>{
        assert.equal(q,qualityArrayTest[i]);
        downVote.click();
      });
    }
    downVote.click();
    quality.getText().then((q)=>{
      assert.equal(q,'None');
    });
  });
  test.it('should only show todos with none quality when the none filter button is pressed',()=>{
    const title   = driver.findElement({name: 'title'});
    const task    = driver.findElement({name: 'todo'});
    const saveBtn = driver.findElement({name:'saveBtn'});
    const qualityArrayTest = ['None','Low','Normal','High','Critical'];

    title.sendKeys('this is a title');
    task.sendKeys('this is a todo');
    saveBtn.click();

    const card        = driver.findElement({className: 'todo-card'});
    const upVote      = driver.findElement({className: 'up-vote'});
    const quality     = driver.findElement({className: 'quality'});
    const noneBtn     = driver.findElement({className: 'none-btn'});
    const lowBtn      = driver.findElement({className: 'low-btn'});
    const normalBtn   = driver.findElement({className: 'normal-btn'});
    const highBtn     = driver.findElement({className: 'high-btn'});
    const criticalBtn = driver.findElement({className: 'critical-btn'});

    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    quality.getText().then((q)=>{
      assert.equal(q,'None');
    });
    noneBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    lowBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    normalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    highBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    criticalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
  });
  test.it('should only show todos with low quality when the low filter button is pressed',()=>{
    const title   = driver.findElement({name: 'title'});
    const task    = driver.findElement({name: 'todo'});
    const saveBtn = driver.findElement({name:'saveBtn'});
    const qualityArrayTest = ['None','Low','Normal','High','Critical'];

    title.sendKeys('this is a title');
    task.sendKeys('this is a todo');
    saveBtn.click();

    const card        = driver.findElement({className: 'todo-card'});
    const upVote      = driver.findElement({className: 'up-vote'});
    const quality     = driver.findElement({className: 'quality'});
    const noneBtn     = driver.findElement({className: 'none-btn'});
    const lowBtn      = driver.findElement({className: 'low-btn'});
    const normalBtn   = driver.findElement({className: 'normal-btn'});
    const highBtn     = driver.findElement({className: 'high-btn'});
    const criticalBtn = driver.findElement({className: 'critical-btn'});

    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    upVote.click();
    quality.getText().then((q)=>{
      assert.equal(q,'Low');
    });
    noneBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    lowBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    normalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    highBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    criticalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
  });
  test.it('should only show todos with normal quality when the normal filter button is pressed',()=>{
    const title   = driver.findElement({name: 'title'});
    const task    = driver.findElement({name: 'todo'});
    const saveBtn = driver.findElement({name:'saveBtn'});
    const qualityArrayTest = ['None','Low','Normal','High','Critical'];

    title.sendKeys('this is a title');
    task.sendKeys('this is a todo');
    saveBtn.click();

    const card        = driver.findElement({className: 'todo-card'});
    const upVote      = driver.findElement({className: 'up-vote'});
    const quality     = driver.findElement({className: 'quality'});
    const noneBtn     = driver.findElement({className: 'none-btn'});
    const lowBtn      = driver.findElement({className: 'low-btn'});
    const normalBtn   = driver.findElement({className: 'normal-btn'});
    const highBtn     = driver.findElement({className: 'high-btn'});
    const criticalBtn = driver.findElement({className: 'critical-btn'});

    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    upVote.click();
    upVote.click();
    quality.getText().then((q)=>{
      assert.equal(q,'Normal');
    });
    noneBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    lowBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    normalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    highBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    criticalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
  });
  test.it('should only show todos with high quality when the high filter button is pressed',()=>{
    const title   = driver.findElement({name: 'title'});
    const task    = driver.findElement({name: 'todo'});
    const saveBtn = driver.findElement({name:'saveBtn'});
    const qualityArrayTest = ['None','Low','Normal','High','Critical'];

    title.sendKeys('this is a title');
    task.sendKeys('this is a todo');
    saveBtn.click();

    const card        = driver.findElement({className: 'todo-card'});
    const upVote      = driver.findElement({className: 'up-vote'});
    const quality     = driver.findElement({className: 'quality'});
    const noneBtn     = driver.findElement({className: 'none-btn'});
    const lowBtn      = driver.findElement({className: 'low-btn'});
    const normalBtn   = driver.findElement({className: 'normal-btn'});
    const highBtn     = driver.findElement({className: 'high-btn'});
    const criticalBtn = driver.findElement({className: 'critical-btn'});

    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    upVote.click();
    upVote.click();
    upVote.click();
    quality.getText().then((q)=>{
      assert.equal(q,'High');
    });
    noneBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    lowBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    normalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    highBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    criticalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
  });
  test.it('should only show todos with critical quality when the critical filter button is pressed',()=>{
    const title   = driver.findElement({name: 'title'});
    const task    = driver.findElement({name: 'todo'});
    const saveBtn = driver.findElement({name:'saveBtn'});
    const qualityArrayTest = ['None','Low','Normal','High','Critical'];

    title.sendKeys('this is a title');
    task.sendKeys('this is a todo');
    saveBtn.click();

    const card        = driver.findElement({className: 'todo-card'});
    const upVote      = driver.findElement({className: 'up-vote'});
    const quality     = driver.findElement({className: 'quality'});
    const noneBtn     = driver.findElement({className: 'none-btn'});
    const lowBtn      = driver.findElement({className: 'low-btn'});
    const normalBtn   = driver.findElement({className: 'normal-btn'});
    const highBtn     = driver.findElement({className: 'high-btn'});
    const criticalBtn = driver.findElement({className: 'critical-btn'});

    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    upVote.click();
    upVote.click();
    upVote.click();
    upVote.click();
    quality.getText().then((q)=>{
      assert.equal(q,'Critical');
    });
    noneBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    lowBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    normalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    highBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    criticalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
  });
  test.it('should clear the quality filter when the quality button is pressed a second time',()=>{
    const title   = driver.findElement({name: 'title'});
    const task    = driver.findElement({name: 'todo'});
    const saveBtn = driver.findElement({name:'saveBtn'});
    const qualityArrayTest = ['None','Low','Normal','High','Critical'];

    title.sendKeys('this is a title');
    task.sendKeys('this is a todo');
    saveBtn.click();

    const card        = driver.findElement({className: 'todo-card'});
    const upVote      = driver.findElement({className: 'up-vote'});
    const quality     = driver.findElement({className: 'quality'});
    const noneBtn     = driver.findElement({className: 'none-btn'});
    const lowBtn      = driver.findElement({className: 'low-btn'});
    const normalBtn   = driver.findElement({className: 'normal-btn'});
    const highBtn     = driver.findElement({className: 'high-btn'});
    const criticalBtn = driver.findElement({className: 'critical-btn'});

    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    quality.getText().then((q)=>{
      assert.equal(q,'None');
    });
    lowBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    lowBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    normalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    normalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    highBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    highBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    criticalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    criticalBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    upVote.click();
    noneBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,false);
    });
    noneBtn.click();
    card.isDisplayed().then((displayed)=>{
      assert.equal(displayed,true);
    });
    });
  });
});
