const path = require('path');
const main = require ('./main');
const cssReset = require('../css/reset');
const sass = require('./styles.scss');
const css = require('../css/styles');
const buttons = require('./buttons');
const Todobox = require('./todoboxconstructor');
const createTodobox = require('./createTodobox');

buttons.saveButton();
buttons.sortButton();
buttons.voteQuality();
buttons.deleteToDo();