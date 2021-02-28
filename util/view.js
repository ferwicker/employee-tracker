const inquirer = require('inquirer');
const mysql = require('mysql');
const {mainMenu} = require('./menus');
const backMenu = require('./backmenu');
const consoletable = require('console.table');


let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'employees_db'
});



function viewEmployees(){
        // view all employees
        connection.query(
            `SELECT * FROM employees;`, (e, res) => {
            if(e) throw e;
            // make table
            let table = consoletable.getTable(res);
            console.log(table);
            
            backMenu(connection);
            });
}

exports.viewEmployees = viewEmployees;


//view all roles
function viewRoles(){
    // delete role
    connection.query(
        `SELECT * FROM roles`, (e, res) => {
        if(e) throw e;
        // show result here
        let table = consoletable.getTable(res);
        console.log(table);
        backMenu(connection);
        });
}

exports.viewRoles = viewRoles;

//view departments
function viewDepartments(){
    // insert new department
    connection.query(
        `SELECT * FROM departments`, (e, res) => {
        if(e) throw e;
        // show result here
        let table = consoletable.getTable(res);
        console.log(table);
        backMenu(connection);
        });
}

exports.viewDepartments = viewDepartments;