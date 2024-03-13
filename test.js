const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your name?"
  }
];

inquirer.prompt(questions).then((answers) => {
  console.log("Hello, " + answers.name + "!");
});