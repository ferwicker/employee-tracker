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



function deleteEmployee(first_name, last_name){
        // delete employee
        connection.query(
            `DELETE FROM employees WHERE first_name = ? AND last_name = ?;`, [first_name, last_name], (e, res) => {
            if(e) throw e;
            // show result here
            console.log(`Employee deleted: ${first_name} ${last_name}`);
            
            backMenu(connection);
            });
}

exports.deleteEmployee = deleteEmployee;


//delete role
function deleteRole(role_name){
    // delete role
    connection.query(
        `DELETE FROM roles WHERE role_name = ?`, [role_name], (e, res) => {
        if(e) throw e;
        // show result here
        console.log(`Role deleted: ${role_name}`);
        backMenu(connection);
        });
}

exports.deleteRole = deleteRole;

//create department
function deleteDepartment(department_name){
    // insert new department
    connection.query(
        `DELETE FROM departments WHERE department_name = ?`, [department_name], (e, res) => {
        if(e) throw e;
        // show result here
        console.log(`New department added: ${department_name}`); // display new department's id as well
        backMenu(connection);
        });
}

exports.deleteDepartment = deleteDepartment;