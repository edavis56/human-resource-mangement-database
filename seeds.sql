INSERT INTO department (depname)
VALUES ("Manager Placeholder"),
       ("Sales"),
       ("Accounting"),
       ("Design");

INSERT INTO role (title, salary, department_id)
VALUES ("Managers", 1, 1),
       ("Sales Associate", 50000.00, 2),
       ("Assitant Accountant", 45000.00, 3),
       ("Graphics Designer", 48000.00, 4);

INSERT INTO  employee (first_name, last_name, role_id, manager_id)
VALUES 
       ("Brandon", "O'Neal", 2, 1),
       ("Mike", "Ross", 2, 2),
       ("Connor", "O'Hora", 3, 1),
       ("Adam", "Binder", 3, 4),
       ("Rich", "Slate", 4, 1),
       ("Sarah", "Silverman", 4, 6);