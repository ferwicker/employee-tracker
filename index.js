const inquirer = require('inquirer');
const mysql = require('mysql');
const consoletable = require('console.table');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'employees_db'
});

// VARIABLES --------------------------

// update role function
let role_options = [];
let department_options = [];
let employee_options = [];
let employee_id;
let newRoleId;
let deptId;


// MENUS ------------------------------

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
                    connection.end();
                    console.log('Good-bye!');
                    process.exit();
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
                process.exit(); 
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
                    getRoles();
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
                                type: 'list',
                                message: 'New employee role:',
                                choices: role_options,
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
                    getDepartments();
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
                                    type: 'list',
                                    message: 'Choose department:',
                                    choices: department_options,
                                    name: 'department_name'
                                }
                            ]) .then ((data) => {
                                createRole(data.role_name, data.salary, data.department_name);
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
                    viewEmployees();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all departments':
                    viewDepartments();
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
                message: 'What would you like to update?',
                choices: ["Update an employee's role", "Update an employee's manager", '<--Back to main menu'],
                name: 'updateChoice'
            }
        ]) .then((data) => {
            switch (data.updateChoice){
                case "Update an employee's role":
                    getRoles();
                    updateEmployeeRole();
                    break;
                case "Update an employee's manager":
                    updateEmployeeManager();
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
                    getRoles();
                    deleteRole();
                    break;
                case 'Delete a department':
                    getDepartments();
                    deleteDepartment();
                    break;
                case '<--Back to main menu':
                    mainMenu();
                    break;
            }
        });
}


// GET ALL X FUNCTIONS --------------------------------------------------------

function getRoles() {
    role_options = [];
    connection.query(
    `SELECT * FROM roles;`, (e, res) => {
    if(e) throw e;
    // show result here
    for (i = 0; i < res.length; i++){
        role = res[i].role_name;
        role_options.push(role);
    }
    });
    return role_options
}

function getDepartments() {
    department_options = [];
    connection.query(
    `SELECT * FROM departments;`, (e, res) => {
    if(e) throw e;
    // show result here
    for (i = 0; i < res.length; i++){
        let department = res[i].department_name;
        department_options.push(department);
    }
    });
    return department_options
}

function getEmployees() {
    connection.query(
    `SELECT * FROM employees;`, (e, res) => {
    if(e) throw e;
    // show result here
    for (i = 0; i < res.length; i++){
        let employee = {name: `${res[i].first_name} ${res[i].last_name}`, id: `${res[i].id}`};
        employee_options.push(employee);
    }
    });
    console.log(employee_options);
    return employee_options
}


// CREATE FUNCTIONS -----------------------------------------------------------

function createEmployee(first_name, last_name, role, manager_id,){
    let role_id;
    //get role id
    connection.query(`SELECT id FROM roles WHERE role_name = '${role}';`, (err, res) => {
        if(err) throw err;
        if(res.length > 0){
            role_id = parseInt(res[0].id);
        } else{ // if input role does not exist
            role_id = 0;
        }
        // insert new employee
        connection.query(
            `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [first_name, last_name, role_id, manager_id], (e, res) => {
            if(e) throw e;
            // show result here
            console.log(`New employee added: ${first_name} ${last_name}`);
            
            backMenu();
            });
        });
}

//create role
function createRole(role_name, salary, department_name){
    salarynum = parseInt(salary);
    // insert new role
    connection.query(
        `SELECT id FROM departments WHERE department_name = ?`, [department_name], (e, res) => {
            if (e) throw e;
            deptId = res[0].id;
            //insert role
            connection.query(
                `INSERT INTO roles(role_name, salary, department_id) VALUES ('${role_name}', '${salarynum}', '${deptId}');`, (e, res) => {
                if(e) throw e;
                // show result here
                console.log(`New role added: ${role_name}`);
                backMenu();
                });
        });  
}

//create department
function createDepartment(department_name){
    // insert new department
    connection.query(
        `INSERT INTO departments (department_name) VALUES ('${department_name}');`, (e, res) => {
        if(e) throw e;
        // show result here
        console.log(`New department added: ${department_name}`); // display new department's id as well
        backMenu();
        });
}


// VIEW FUNCTIONS -------------------------------------------------------------

// view all employees
function viewEmployees(){
    // view all employees
    connection.query(
        `SELECT * FROM employees;`, (e, res) => {
        if(e) throw e;
        // make table
        let table = consoletable.getTable(res);
        console.log(table);
        backMenu();
        });
}

// view all roles
function viewRoles(){
    connection.query(
        `SELECT * FROM roles`, (e, res) => {
        if(e) throw e;
        // show result here
        let table = consoletable.getTable(res);
        console.log(table);
        backMenu();
        });
}


// view departments
function viewDepartments(){
connection.query(
    `SELECT * FROM departments`, (e, res) => {
    if(e) throw e;
    // show result here
    let table = consoletable.getTable(res);
    console.log(table);
    backMenu();
    });
}


// UPDATE FUNCTIONS -------------------------------------------------------------

function updateEmployeeRole(){
    inquirer
        .prompt([
            {
                type: 'input',
                message: "Employee's first name:",
                name: 'first_name'
            },
            {
                type: 'input',
                message: "Employee's last name:",
                name: 'last_name'
            }
            ]).then((data) => {
                connection.query(
                    `SELECT * FROM employees WHERE first_name = ? AND last_name = ?;`, [data.first_name, data.last_name], (e, res) => {
                    if(e) throw e;
                    //if employee not found
                    if (res.length === 0){
                        console.log('Sorry! Employee not found.')
                        //return to update menu
                        updateMenu();
                        return
                    }
                    const table = consoletable.getTable(res);
                    employee_id = res[0].id;
                    console.log(`Selected Employee: \n ${table}`);
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                message: 'Choose new role:',
                                choices: role_options,
                                name: 'role_choice'
                            }
                        ]).then((data) => {
                            connection.query(
                                `SELECT id FROM roles WHERE role_name = ?`, [data.role_choice], (e, res) => {
                                    if (e) throw e;
                                    newRoleId = res[0].id;
                                    console.log(`role id: ${newRoleId}`);
                                    connection.query(
                                        `UPDATE employees SET role_id = ? WHERE id = ?`, [newRoleId, employee_id], (e, res) => {
                                            if(e) throw e;
                                            console.log('Role updated.');
                                            backMenu();
                                        });
                                });
                        });
                    }); 
            });
} // --------------- UPDATE ROLE FUNCTION ENDS

// update an employee's manager

function updateEmployeeManager(){
    inquirer
        .prompt([
            {
                type: 'input',
                message: "Employee's first name:",
                name: 'first_name'
            },
            {
                type: 'input',
                message: "Employee's last name:",
                name: 'last_name'
            }
            ]).then((data) => {
                connection.query(
                    `SELECT * FROM employees WHERE first_name = ? AND last_name = ?;`, [data.first_name, data.last_name], (e, res) => {
                    if(e) throw e;
                    //if employee not found
                    if (res.length === 0){
                        console.log('Sorry! Employee not found.')
                        //return to update menu
                        updateMenu();
                        return
                    }
                    const table = consoletable.getTable(res);
                    employee_id = res[0].id;
                    console.log(`Selected Employee: \n ${table}`);
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: 'New manager first name:',
                                name: 'manager_first'
                            },
                            {
                                type: 'input',
                                message: 'New manager last name:',
                                name: 'manager_last'
                            }
                        ]).then((data) => {
                            connection.query(
                                `SELECT id FROM employees WHERE first_name = ? AND last_name = ?`, [data.manager_first, data.manager_last], (e, res) => {
                                    if (e) throw e;
                                    newManagerId = res[0].id;
                                    connection.query(
                                        `UPDATE employees SET manager_id = ? WHERE id = ?`, [newManagerId, employee_id], (e, res) => {
                                            if(e) throw e;
                                            console.log('Manager updated.');
                                            backMenu();
                                        });
                                });
                        });
                    }); 
            });
} // --------------- UPDATE MANAGER FUNCTION ENDS



// DELETE FUNCTIONS -------------------------------------------------------------

// delete employee
function deleteEmployee(first_name, last_name){
    // delete employee
    connection.query(
        `DELETE FROM employees WHERE first_name = ? AND last_name = ?;`, [first_name, last_name], (e, res) => {
        if(e) throw e;
        // show result here
        console.log(`Employee deleted: ${first_name} ${last_name}`);
        
        backMenu();
        });
}

// delete role
function deleteRole(){
    role_options = [];
    connection.query(
    `SELECT * FROM roles;`, (e, res) => {
    if(e) throw e;
    // show result here
    for (i = 0; i < res.length; i++){
        role = res[i].role_name;
        role_options.push(role);
    }
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Role name:',
                choices: role_options,
                name: 'role_name'
            }
            ]) .then((data) => {
                    connection.query(
                        `DELETE FROM roles WHERE role_name = ?`, [data.role_name], (e, res) => {
                        if(e) throw e;
                        // show result here
                        console.log(`Role deleted: ${data.role_name}`);
                        backMenu();
                    });
                }); 
    });    
}

// delete department
function deleteDepartment(){
    department_options = [];
    connection.query(
    `SELECT * FROM departments;`, (e, res) => {
    if(e) throw e;
    // show result here
    for (i = 0; i < res.length; i++){
        let department = res[i].department_name;
        department_options.push(department);
    }
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Department name:',
                choices: department_options,
                name: 'department_name'
            }
            ]) .then((data) => {
                connection.query(
                    `DELETE FROM departments WHERE department_name = ?`, [data.department_name], (e, res) => {
                    if(e) throw e;
                    console.log(`Department deleted: ${data.department_name}`); 
                    backMenu();
                    });            
            });
    });   
}


// INIT function --------------------------------------------------------------

function init(){
    //mysql connection
    connection.connect((error) => {
        if(error) throw error;
        console.log('Welcome to Employee Tracker');
        mainMenu();
    }); 
}

init();