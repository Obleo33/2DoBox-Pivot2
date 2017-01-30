require ('./main');
const path = require('path');
const cssReset = require('../css/reset');
const styles = require('./styles.scss');
const mediaQuery = require('./mediaQuery.scss')
const todoStyles = require('./todocard.scss');
const buttons = require('./buttons');
const Todobox = require('./todoboxconstructor');
const createTodobox = require('./createTodobox');
const storage = require('./localStorage');

buttons.saveButton();
buttons.voteQuality();
buttons.deleteToDo();
buttons.completeButton();
buttons.searchValue();
buttons.showCompleteButton();
