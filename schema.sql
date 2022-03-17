-- Drops the employee_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;

-- Creates the database --
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (

id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(30) NOT NULL
 
);

CREATE TABLE role (

id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (

id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
FOREIGN KEY (role_id) REFERENCES role (id),
manager_id INTEGER NULL,
FOREIGN KEY (manager_id) REFERENCES employee (id)
);