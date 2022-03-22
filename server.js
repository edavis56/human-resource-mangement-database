const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '16251GoKennesaw@wls',
    database: 'employee_db'
});

const userMenu = () => {
    return inquirer.prompt ({
        
            type: 'list',
            message: 'Please select an option.',
            name: 'menu',
            loop: false,
            choices: ['Departments', 'Roles', 'Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit'],
        
})
    .then((answer) => {
        switch(answer.choices) {
            case 'Departments':
                Departments();
                break;
            case 'Roles':
                Roles();
                break;
            case 'Employees':
                Employees();
                break;    
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
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

const Departments = () => {
    const dpt = `SELECT department.id AS ID, department.name AS Department FROM department`;

    connection.query(dpt, (err, info) => {
        if (err) throw err;
        console.table(info);
        userMenu();
    });
};

const Roles = () => {
    const rls = `SELECT role.id AS ID, role.title AS Job_Title, role.salary AS Salary, department.name AS Department FROM role
    INNER JOIN department ON role.department_id = department.id`;

    connection.query(rls, (err, info) => {
        if (err) throw err;
        console.table(info);
        userMenu();
    });
};

const Employees = () => {
    const emp = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, " ",manager.last_name) AS Manager, manager.id AS ManagerID FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    INNER JOIN employee manager ON employee.manager_id = manager.id`;

    connection.query(emp, (err, info) => {
        if (err) throw err;
        console.table(info);
        userMenu();
    });
};

const addDepartment = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter Department Name.',
            name: 'name',
            validate: name => {
                if (!name) {
                    console.log('Please enter a Department Name!');
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(answer => {
        const title = answer.name;

        const add = `INSERT INTO department (name) VALUES ("${title}")`;

        connection.query(add, answer.name, (err) => {
            if (err) throw err;
            console.log(`Added ` + answer.name + ` to the Department database!`);
            viewDepartments();
        });
    });
};

const addRole = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter a new Job Title.',
            name: 'title',
            validate: title => {
                if (!title) {
                    console.log('Please enter a Job Title!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: 'Please enter a Salary for this Job Title.',
            name: 'salary',
            validate: salary => {
                if (!salary) {
                    console.log('Please enter a Salary for this Job Title!');
                    return false;
                } else if (isNaN(salary)) {
                    console.log('Please enter a number for Salary!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: 'Please enter the Department ID this Job Title is in. Select View All Departments to get the ID. Press Ctrl+C (windows) CMD+C (Mac) to end application and restart app to view all departments if you need the ID.',
            name: 'dept',
            validate: dept => {
                if (!dept) {
                    console.log('Please enter a Department ID for this role!');
                    return false;
                } else if (isNaN(dept)) {
                    console.log('Please enter an ID Number for the Department!');
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(function (answer) {
        const title = answer.title;
        const salary = answer.salary;
        const dept = answer.dept;

        const add = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${dept}")`;

        connection.query(add, function (err) {
            if (err) throw err;
            console.log(`Added ` + answer.title + answer.salary + answer.dept + ` to the Roles Database!`);
            viewRoles();
        });
    });
};

const addEmployee = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            message: "Please enter the Employee's First Name.",
            name: 'firstName',
            validate: firstName => {
                if (!firstName) {
                    console.log("Please enter a First Name for the Employee!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: "Please enter the Employee's Last Name.",
            name: 'lastName',
            validate: lastName => {
                if (!lastName) {
                    console.log("Please enter a Last Name for the Employee!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: "Please enter the Role ID for the employee. If you need the role ID press CTRL+C (windows) CMD+C (mac) and restart the application and select View All Roles.",
            name: 'roleID',
            validate: roleID => {
                if (!roleID) {
                    console.log("Please enter a Role ID for the Employee!");
                    return false;
                } else if (isNaN(roleID)) {
                    console.log("Please enter a number for the Role ID for the Employee!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: "Please enter the Manager ID for the employee. If they are a Manager leave this field Blank. If you need the manager ID press CTRL+C (windows) CMD+C (mac) and restart the application and select View All Employees.",
            name: 'managerID'
        }
    ])
    .then(function (answer) {
        if (answer.managerID === '') {
            const first = answer.firstName;
            const last = answer.lastName;
            const job = answer.roleID;
            const manager = '1';

            const add = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first}", "${last}", "${job}", "${manager}")`;

            connection.query(add, function (err) {
                if (err) throw err;
                console.log(`Added ` + answer.firstName + answer.lastName + answer.roleID + answer.managerID + ` to the Employee Database!`);
                viewEmployees();
        });
        } else {
            const first = answer.firstName;
            const last = answer.lastName;
            const job = answer.roleID;
            const manager = answer.managerID;

            const add = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first}", "${last}", "${job}", "${manager}")`;

            connection.query(add, function (err) {
                if (err) throw err;
                console.log(`Added ` + answer.firstName + answer.lastName + answer.roleID + answer.managerID + ` to the Employee Database!`);
                viewEmployees();
        })
      }
    });
};

const updateEmployee = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            message: "Enter the employee's ID that you wish to update. You can select View all employees to get the ID for the employee you wish to update. CTRL+C (windows) CMD+C (mac) to quit and then restart application if you need to.",
            name: 'id',
            validate: id => {
                if (!id) {
                    console.log('Please enter an ID for the employee!');
                    return false;
                } else if (isNaN(id)) {
                    console.log('Please enter a number for the ID for the employee!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: "Please enter a new role ID that you wish to update for the employee.",
            name: 'role',
            validate: role => {
                if (!role) {
                    console.log('Please enter an ID for the role you with to update to!');
                    return false;
                } else if (isNaN(role)) {
                    console.log("Please enter a number for the ID for the role you wish to update to!");
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(function (answer) {
        const id = answer.id;
        const role = answer.role;

        const add = `UPDATE employee SET role_id = "${role}" WHERE id = "${id}"`;

        connection.query(add, function (err) {
            if (err) throw err;
            console.log(`Updating Employee ` + answer.id + ` to ` + answer.role + ` Successful!`);
            viewEmployees();
        })
    });
};

userMenu()