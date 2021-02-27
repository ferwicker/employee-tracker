const inquirer = require('inquirer');
const mysql = require('mysql');
const consoletable = require('console.table');

const {mainMenu} = require('./util/menus');
//const {createEmployee, createRole, createDepartment} = require('./util/create');


let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'employees_db'
});


// INIT function
function init(){
    //mysql connection
    connection.connect((error) => {
        if(error) throw error;
        console.log('Welcome to Employee Tracker');
        mainMenu();
    }); 
}

init();