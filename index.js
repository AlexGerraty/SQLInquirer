const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hawthorn$1',
  database: 'company_db'
});

// Function to prompt the user for their choice of action
const promptUser = async () => {
  try {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          { name: 'View all departments', value: 'VIEW_DEPARTMENTS' },
          { name: 'View all roles', value: 'VIEW_ROLES' },
          { name: 'View all employees', value: 'VIEW_EMPLOYEES' },
          { name: 'Add a department', value: 'ADD_DEPARTMENT' },
          { name: 'Add a role', value: 'ADD_ROLE' },
          { name: 'Add an employee', value: 'ADD_EMPLOYEE' },
          { name: 'Update an employee role', value: 'UPDATE_EMPLOYEE_ROLE' }
        ]
      }
    ]);

    switch (choice) {
      case 'VIEW_DEPARTMENTS':
        viewDepartments();
        break;
      case 'VIEW_ROLES':
        viewRoles();
        break;
      case 'VIEW_EMPLOYEES':
        viewEmployees();
        break;
      case 'ADD_DEPARTMENT':
        addDepartment();
        break;
      case 'ADD_ROLE':
        addRole();
        break;
      case 'ADD_EMPLOYEE':
        addEmployee();
        break;
      case 'UPDATE_EMPLOYEE_ROLE':
        updateEmployeeRole();
        break;
      default:
        console.log('Invalid choice.');
        promptUser();
    }
  } catch (err) {
    console.error(err);
    promptUser();
  }
};

// Function to view all departments in the database
const viewDepartments = () => {
  const sql = 'SELECT * FROM departments';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    promptUser();
  });
};

// Function to view all roles in the database
const viewRoles = () => {
  const sql = 'SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    promptUser();
  });
};

// Function to view all employees in the database
const viewEmployees = () => {
  const sql = `
    SELECT
      employees.id,
      employees.first_name,
      employees.last_name,
      roles.title,
      departments.name AS department,
      roles.salary,
      employees.manager_id
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    ORDER BY employees.id;
  `;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    promptUser();
  });
};

// Function to add a department to the database
const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
      validate: input => input !== ''
    }
  ]);

  const sql = 'INSERT INTO departments SET ?';
  connection.query(sql, { name }, err => {
    if (err) throw err;
    console.log(`Added department: ${name}`);
    promptUser();
 });
};

// Function to add a role to the database
const addRole = async () => {
  const departments = await viewDepartments();
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
      validate: input => input !== ''
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the role:',
      validate: input => input !== ''
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Choose the department of the role:',
      choices: departments
    }
  ]);

  const sql = 'INSERT INTO roles SET ?';
  connection.query(sql, { title, salary, department_id }, err => {
    if (err) throw err;
    console.log(`Added role: ${title}`);
    promptUser();
  });
};

// Function to add an employee to the database
const addEmployee = async () => {
  const roles = await viewRoles();
  const managers = await viewEmployees();
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
      validate: input => input !== ''
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
      validate: input => input !== ''
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Choose the role of the employee:',
      choices: roles
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Choose the manager of the employee:',
      choices: managers
    }
  ]);

  const sql = 'INSERT INTO employees SET ?';
  connection.query(sql, { first_name, last_name, role_id, manager_id }, err => {
    if (err) throw err;
    console.log(`Added employee: ${first_name} ${last_name}`);
    promptUser();
  });
};

// Function to update an employee's role in the database
const updateEmployeeRole = async () => {
  const employees = await viewEmployees();
  const roles = await viewRoles();
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Choose the employee to update:',
      choices: employees
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Choose the new role of the employee:',
      choices: roles
    }
  ]);

  const sql = 'UPDATE employees SET role_id = ? WHERE id = ?';
  connection.query(sql, [role_id, employee_id], err => {
    if (err) throw err;
    console.log(`Updated employee ${employee_id}'s role to ${role_id}`);
    promptUser();
  });
};

// Call the promptUser function to start the application
promptUser();