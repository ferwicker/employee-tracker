const inquirer = require('inquirer');
const mysql = require('mysql');
const {mainMenu} = require('./menus');
const backMenu = require('./backmenu');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'employees_db'
});


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
            if(role_id === 0){
                console.log('PLEASE NOTE: The role you have tried to assign to this employee does not exist. Please add role and update employee.');
            }
            backMenu(connection);
            });
        });
}

exports.createEmployee = createEmployee;


//create role
function createRole(role_name, salary, department_id){
    salarynum = parseInt(salary);
    // insert new role
    connection.query(
        `INSERT INTO roles(role_name, salary, department_id) VALUES ('${role_name}', '${salarynum}', '${department_id}');`, (e, res) => {
        if(e) throw e;
        // show result here
        console.log(`New role added: ${role_name}`);
        backMenu(connection);
        });
}

exports.createRole = createRole;

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

exports.createDepartment = createDepartment;