require ('./main');
const path = require('path');
const cssReset = require('../css/reset');
const styles = require('./styles.scss');
const todoStyles = require('./todocard.scss');
const mediaQuery = require('./mediaquery.scss');
const buttons = require('./buttons');
const Todobox = require('./todoboxconstructor');
const createTodobox = require('./createTodobox');
const storage = require('./localStorage');

buttons.saveButton();
buttons.voteQuality();
buttons.deleteToDo();
buttons.completeButton();
