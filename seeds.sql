-- Create sample data for the 'departments' table
INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Marketing');
INSERT INTO departments (name) VALUES ('Engineering');

-- Create sample data for the 'roles' table
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Representative', 50000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Manager', 70000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Marketing Coordinator', 40000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Marketing Manager', 60000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 80000.00, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Senior Software Engineer', 100000.00, 3);

-- Create sample data for the 'employees' table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jim', 'Smith', 3, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jake', 'Johnson', 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jill', 'Johnson', 5, 4);