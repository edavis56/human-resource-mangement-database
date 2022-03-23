const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '16251GoKennesaw@wls',
    database: 'employee_db'
})

connection.connect(function(){
    userMenu();
})

function userMenu() {
    inquirer.prompt({
        name: 'menu',
        type: 'list',
        message: 'Please select an option using arrow keys.',
        choices: ['Departments', 'Roles', 'Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
    })
    .then(function(answer) {
        switch(answer.menu) {
            case 'Departments':
                Departments();
                break;
            case 'Employees':
                Employees();
                break;
            case 'Roles':
                Roles();
                break;    
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'Exit':
                connection.end();
                break;    
            default:
                userMenu();                            
        }
    });
};

function Departments() {
    connection.query("select id, depName", function() {
        console.table('Department');
        userMenu() 
    })
}

function Employees() {
    let query = `SELECT employee.id AS ID, employee.firstName AS First_Name`;

    connection.query(query, function(err, res) {
        console.table(res);
        userMenu();
    })
}

function Roles() {
    const query = `SELECT role.id AS ID, role.title AS Job_Title, role.salary AS Salary, department.name AS Department FROM role
    INNER JOIN department ON role.department_id = department.id`;

    connection.query(query, function(err, res) {
        console.table('roles', res);
        userMenu();
    })
}

userMenu()