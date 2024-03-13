MySQL Inquirer App
This is a simple command-line application that allows you to view and manage the data in a MySQL database using the mysql2 and inquirer Node.js packages.

Prerequisites
Node.js installed
MySQL server running and accessible

Installation

Clone this repository to your local machine.
Run npm install to install the required packages.
Update the connection object in the code with your MySQL server credentials.
Run node index.js to start the application.

Usage

The application will prompt you to choose an action from the following options:

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role


Depending on your choice, the application will either display the requested data or prompt you for additional information to add or update records in the database.


