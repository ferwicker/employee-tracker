const inquirer = require('inquirer');
const mysql = require('mysql');
const consoletable = require('console.table');

//const createEmployee = require('./util/create');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'employees_db'
});

// main menu
function mainMenu(){
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ['Create', 'View', 'Update', 'Delete', 'Exit'],
                name: 'firstChoice'
            }
        ]) .then((data) => {
            switch (data.firstChoice) {
                case 'Create':
                    createMenu();
                    break;
                case 'View':
                    viewMenu();
                    break;
                case 'Update':
                    updateMenu();
                    break;
                case 'Delete':
                    deleteMenu();
                    break;
                case 'Exit':
                    console.log('Good-bye!');
                    connection.end(); 
                    break;
            }
        });
}

// back menu
function backMenu(){
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
                break;
        }
    });
}

// create menu
function createMenu(){
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to create?',
                choices: ['Create a new employee', 'Create a new role', 'Create a new department', '<--Back to main menu'],
                name: 'createChoice'
            }
        ]) .then((data) => {
            switch (data.createChoice){
                case 'Create a new employee':
                    //inquirer questions

                    createEmployee('Fer', 'Wicker', 'reservations', '1');
                    break;
                case 'Create a new role':
                    console.log('Create new role.');
                    break;
                case 'Create a new department':
                    console.log('Create new department.');
                    break;
                case '<--Back to main menu':
                    mainMenu();
                    break;
            }
            
        });
}

// view menu
function viewMenu(){
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to view?',
                choices: ['View all employees', 'View all roles', 'View all departments', '<--Back to main menu'],
                name: 'viewChoice'
            }
        ]) .then((data) => {
            switch (data.viewChoice){
                case 'View all employees':
                    console.log('View all employees.');
                    break;
                case 'View all roles':
                    console.log('View all roles.');
                    break;
                case 'View all departments':
                    console.log('View all departments.');
                    break;
                case '<--Back to main menu':
                    mainMenu();
                    break;
            }
        });
}

// update menu
function updateMenu(){
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to view?',
                choices: ['Update an employee', 'Update a role', '<--Back to main menu'],
                name: 'updateChoice'
            }
        ]) .then((data) => {
            switch (data.updateChoice){
                case 'Update an employee':
                    console.log('Update an employee.');
                    break;
                case 'Update a role':
                    console.log('Update a role.');
                    break;
                case '<--Back to main menu':
                    mainMenu();
                    break;
            }
        });
}

// delete menu
function deleteMenu(){
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to view?',
                choices: ['Delete an employee', 'Delete a role', 'Delete a department', '<--Back to main menu'],
                name: 'deleteChoice'
            }
        ]) .then((data) => {
            switch (data.deleteChoice){
                case 'Delete an employee':
                    console.log('Deleting an employee.');
                    break;
                case 'Delete a role':
                    console.log('Deleting a role.');
                    break;
                case 'Delete a department':
                    console.log('Deleting a department.');
                    break;
                case '<--Back to main menu':
                    mainMenu();
                    break;
            }
        });
}


function createEmployee(first_name, last_name, role, manager_id){
    let role_id;
    //get role id
    connection.query(`SELECT id FROM roles WHERE role_name = '${role}';`, (err, res) => {
        if(err) throw err;
        if(res.legth > 0){
            role_id = parseInt(res[0].id);
        } else{ // if input role does not exist
            role_id = 0;
        }
        
        // insert new employee
        connection.query(
            `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}');`, (e, res) => {
            if(e) throw e;
            // show result here
            console.log(`New employee added: ${first_name} ${last_name}`);
            if(role_id === 0){
                console.log('PLEASE NOTE: The role you have tried to assign to this employee does not exist. Please add role and update employee.');
            }
            backMenu();
            });
        });
}


// INIT function
function init(){
    //mysql connection
    connection.connect((error) => {
        if(error) throw error;
        console.log('connected!')
        console.log('Welcome to Employee Tracker');
        mainMenu();
    });
    
    //connection.end(); 
}

init();

