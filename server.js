const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '16251GoKennesaw@wls',
    database: 'employee_db'
});

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
    const query = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, " ",manager.last_name) AS Manager, manager.id AS ManagerID FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    INNER JOIN employee manager ON employee.manager_id = manager.id`;

    connection.query(query, function(err, res) {
        console.table('employee', res);
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