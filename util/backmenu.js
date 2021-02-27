const inquirer = require('inquirer');

const {mainMenu} = require('./menus');


// back menu
function backMenu(connection){
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Back to main menu', 'Exit'],
            name: 'menuChoice'
        }
    ]) .then((data) => {
        switch (data.menuChoice) {
            case 'Back to main menu':
                mainMenu();
                break;
            case 'Exit':
                console.log('Good-bye!');
                connection.end(); 
                return;
        }
    });
}

module.exports = backMenu;