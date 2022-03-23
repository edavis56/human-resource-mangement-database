-- Drops the employee_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;

-- Creates the database --
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT NOT NULL,
    departmentName VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT NOT NULL,
    roleTitle VARCHAR(30) NOT NULL,
    roleSalary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    employeeDepartment VARCHAR(30) NOT NULL,
    roleSalary DECIMAL NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (roles_id) REFERENCES roles (id),
    PRIMARY KEY (id)
);