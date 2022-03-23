const Inquirer = require("inquirer");
const mySQL = require("mysql2");

var connection = mySQL.createConnection({
  host: 'localhost',
    user: 'root',
    password: '16251GoKennesaw@wls',
    database: 'employee_db'
});

connection.connect(function (err) {
  if (err) throw err;
  userMenu();
});

function userMenu() {
  Inquirer.prompt([
    {
      type: "list",
      name: "userOption",
      message: "Main Menu",
      loop: false,
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Exit Application",
      ],
    },
  ]).then(function ({ userOption }) {
    switch (userOption) {
      case "View Departments": {
        viewDepartments();
        break;
      }
      case "View Roles": {
        viewRoles();
        break;
      }
      case "View Employees": {
        viewEmployees();
        break;
      }
      case "Add a Department": {
        addDepartment();
        break;
      }
      case "Add a Role": {
        addRole();
        break;
      }
      case "Add an Employee": {
        addEmployee();
        break;
      }
      case "Exit Application": {
        connection.end();
        break;
      }
    }
  });
}

function viewDepartments() {
  const query = `SELECT * FROM department`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    userMenu();
  });
}

function viewRoles() {
  const query = `SELECT role.id, role.roleTitle, role.salary, department.depName AS department FROM role INNER JOIN department ON department.id = role.department_id`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    userMenu();
  });
}

function viewEmployees() {
  const query = `SELECT employeeData.firstName, role.roleTitle, role.salary, department.depName AS department FROM role INNER JOIN department ON department.id = role.department_id`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    userMenu();
  });
}


function addDepartment() {
  var query = `SELECT * FROM department`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const availableDepartments = res.map(({ id, depName }) => ({
      value: id,
      Department: `${depName}`,
    }));

    createDepartment(availableDepartments);
  });
}

function createDepartment() {
  Inquirer.prompt([
    {
      type: "input",
      name: "depName",
      message: "New Department Name?",
    },
  ]).then(function (answer) {
    console.log(answer);

    var depAddQuery = `INSERT INTO department SET ?`;

    connection.query(
      depAddQuery,
      {
        depName: answer.depName,
      },
      function (err, res) {
        if (err) throw err;

        console.table(res);

        userMenu();
      }
    );
  });
}

function addRole() {
  Inquirer.prompt([
    {
      type: "input",
      name: "roleTitle",
      message: "Enter New Job Title",
      validate: (roleTitle) => {
        if (roleTitle) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      type: "input",
      name: "salary",
      message: "Enter Salary",
      validate: (salary) => {
        if (isNaN(salary)) {
          return false;
        } else if (!salary) {
          return false;
        } else {
          return true;
        }
      },
    },
    {
      type: "input",
      name: "department_id",
      message: "Enter New Job's Department",
      validate: (department_id) => {
        if (isNaN(department_id)) {
          return false;
        } else if (!department_id) {
          return false;
        } else {
          return true;
        }
      },
    },
  ]).then(({ roleTitle, salary, department_id }) => {
    const query = `INSERT INTO role (roleTitle, salary, department_id) VALUES ('${roleTitle}','${salary}','${department_id}')`;
    connection.query(query, function (err, res) {
      if (err) throw err;

      console.table(res);

      userMenu();
    });
  });
}

function addEmployee() {
  Inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employee's First Name?",
      validate: (firstName) => {
        if (firstName) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee's Last Name",
      validate: (lastName) => {
        if (lastName) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      type: "input",
      name: "role_id",
      message: "Employee's Role ID",
      validate: (role_id) => {
        if (isNaN(role_id)) {
          return false;
        } else if (!role_id) {
          return false;
        } else {
          return true;
        }
      },
    },
  ]).then(({ firstName, lastName, role_id}) => {
    const query = `INSERT INTO employee (firstName, lastName, role_id) VALUES ('${firstName}','${lastName}','${role_id}')`;
    connection.query(query, function (err, res) {
      if (err) throw err;

      console.table(res);

      userMenu();
    });
  });
}