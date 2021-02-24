const inquirer = require('inquirer');
const mysql = require('mysql');
const consoletable = require('console.table');

function mainMenu(){
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ['Create', 'View', 'Update', 'Delete'],
                name: 'firstChoice'
            }
        ]) .then((data) => {
            switch (data.firstChoice) {
                case 'Create':
                    console.log('Create record.');
                    break;
                case 'View':
                    console.log('View records.');
                    break;
                case 'Update':
                    console.log('Update record.');
                    break;
                case 'Delete':
                    console.log('Delete record.');
                    break;
            }
        })
}

function init(){
    console.log('Welcome to Employee Tracker');
    mainMenu()
}

init();