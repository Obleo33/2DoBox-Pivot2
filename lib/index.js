require ('./main');
const path = require('path');
const cssReset = require('../css/reset');
const sass = require('./styles.scss');
const buttons = require('./buttons');
const Todobox = require('./todoboxconstructor');
const createTodobox = require('./createTodobox');
const storage = require('./localStorage');

buttons.saveButton();
buttons.sortButton();
buttons.voteQuality();
buttons.deleteToDo();
buttons.completeButton();
