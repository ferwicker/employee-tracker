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

let options = [];
let employee_id;
let newRoleId;

function getRoles() {
    connection.query(
    `SELECT * FROM roles;`, (e, res) => {
    if(e) throw e;
    // show result here
    for (i = 0; i < res.length; i++){
        role = res[i].role_name;
        options.push(role);
    }
    });
    return options
}

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
                                choices: options,
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
}

function updateRole(){
    getRoles();
    updateEmployeeRole();  
}


exports.updateRole = updateRole;