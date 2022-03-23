INSERT INTO department (depName)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Marketing');

INSERT INTO role (roleTitle, salary, department_id)
VALUES 
    ('Sales Manager', 80000, 1),
    ('Engineering Manager', 100000, 2),
    ('Finance Manager', 70000, 3),
    ('Legal Staff', 105000, 4),
    ('Accountant', 85000, 3),
    ('Marketing Associate', 55000, 5);

INSERT INTO employee (firstName, lastName, role_id)
VALUES
    ('Eric', 'Davis', 3),
    ('John', 'Doe', 1),
    ('Jane', 'Smith', 2),
    ('Mike', 'Nolan', 6),
    ('Connor', 'Guy', 5),
    ('Fake', 'Person', 4);
    