const inquirer = require('inquirer');
const mysql = require('mysql');
const {createEmployee, createRole, createDepartment} = require('./create');
const {deleteEmployee, deleteRole, deleteDepartment} = require('./delete');


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

exports.mainMenu = mainMenu;


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
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: 'New employee first name:',
                                name: 'first_name'
                            },
                            {
                                type: 'input',
                                message: 'New employee last name:',
                                name: 'last_name'
                            },
                            {
                                type: 'input',
                                message: 'New employee role:',
                                name: 'role_name'
                            },
                            {
                                type: 'input',
                                message: 'New employee manager id:',
                                name: 'manager_id'
                            }
                        ]) .then((data) => {
                            createEmployee(data.first_name, data.last_name, data.role_name, data.manager_id);
                        });
                    break;
                case 'Create a new role':
                    console.log('Create new role.');
                        //inquirer questions
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    message: 'New role name:',
                                    name: 'role_name'
                                },
                                {
                                    type: 'input',
                                    message: 'New role salary:',
                                    name: 'salary'
                                },
                                {
                                    type: 'input',
                                    message: 'Department ID:',
                                    name: 'department_id'
                                }
                            ]) .then ((data) => {
                                createRole(data.role_name, data.salary, data.department_id);
                            });
                    break;
                case 'Create a new department':
                    //inquirer questions
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: 'New department name:',
                                name: 'department_name'
                            }
                        ]) .then ((data) => {
                            createDepartment(data.department_name);
                        })
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
                message: 'What would you like to do?',
                choices: ['Delete an employee', 'Delete a role', 'Delete a department', '<--Back to main menu'],
                name: 'deleteChoice'
            }
        ]) .then((data) => {
            switch (data.deleteChoice){
                case 'Delete an employee':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: 'Employee first name:',
                                name: 'first_name'
                            },
                            {
                                type: 'input',
                                message: 'Employee last name:',
                                name: 'last_name'
                            }
                        ]) .then((data) => {
                            deleteEmployee(data.first_name, data.last_name);
                        });
                    break;
                case 'Delete a role':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: 'Role name:',
                                name: 'role_name'
                            }
                        ]) .then((data) => {
                            deleteRole(data.role_name);
                        });
                    break;
                case 'Delete a department':
                    nquirer
                        .prompt([
                            {
                                type: 'input',
                                message: 'Department name:',
                                name: 'department_name'
                            }
                        ]) .then((data) => {
                            deleteDepartment(data.department_name);
                        });
                    break;
                case '<--Back to main menu':
                    mainMenu();
                    break;
            }
        });
}