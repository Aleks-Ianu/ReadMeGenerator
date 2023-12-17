const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const util = require('util');


const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const questions = [
    'Title: What is the title of your project?',
    'Description: Write a description of your project',
    // to change before deploying
    // 'Table of Contents',
    'Installation: What are the steps required to install your project?',
    'Usage: Provide instructions and examples for use. Include screenshots as needed.',
    'Credits: List your collaborators, if any, with links to their GitHub profiles.',
    'Licence: If you need help choosing a license, use [https://choosealicense.com/]',
    'Badges: Check out the badges hosted by (https://shields.io/)',
    'Features: add features of the project  here',
    'Contributing: The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, check it out',
    'Test: Go the extra mile and write tests for your application',


];

// // function to write README file
// function writeToFile("README.md" , data , init(){
//     fs.writeFile("./README.md", data , (err) => {
//         err ? console.error(err) : console.log('response Accepted');
//     })
// });

// function to initialize program
const  init = () => 
    // console.log("answer the questions as well as you can...But,don't worry, if you are not sure on how to reply just skip to the next one and modify the README after, there will be detailed descriptions on how to fill the section on the README file after.");
    // inquirer
  inquirer.prompt([
    {
      type: 'input',
      message: questions[0],
      name: 'Title',
      default: 'Your Title Here',
    },
    {
      type: 'input',
      message: questions[1],
      name: 'Description',
      default: 'Description of the project',
    },
    // to fix before deploying
    // {
    //   type: 'checkbox',
    //   message: questions[2],
    //   name: 'TableOfContent',

    // },
    {
        type: 'input',
        message: questions[3],
        name: 'Installation',
        default: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.'
    },
    {
        type: 'input',
        message: questions[4],
        name: 'Usage',
        default: "Provide instructions and examples for use. Include screenshots as needed.To add a screenshot, create an assets/images folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README "
    },
    {
        type: 'input',
        message: questions[5],
        name: 'Credits',
        default: "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well."
    },
    {
        type: 'input',
        message: questions[6],
        name: 'Licence',
        default: "The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use https://choosealicense.com/"
    },
    {
        type: 'input',
        message: questions[7],
        name: 'Badges',
        default: "Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by shields.io."
    },
    {
        type: 'input',
        message: questions[8],
        name: 'Features',
        default: "If your project has a lot of features, consider adding a heading called 'Features' and listing them there."
    },
    {
        type: 'input',
        message: questions[9],
        name: 'Contributing',
        default: "If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The Contributor Covenant is an industry standard, but you can always write your own"
    },
    {
        type: 'input',
        message: questions[10],
        name: 'Test',
        default: 'Go the extra mile and write tests for your application. Then provide examples on how to run them.'
    },
  ]);

 const generateREADME = (answers) => 
 `# Title
     ${answers.Title}
  ## Description
     ${answers.Description}
  ## Table of Content
  - [Installation](#installation)
  - [Badges](#badges)
  - [Test](#test)
  ## Installation
     ${answers.Installation}
  ## Usage
     ${answers.Usage}
  ## Credits
     ${answers.Credits}
  ## Licence
     ${answers.Licence}
  ## Badges
     ${answers.Badges}
  ## Features
     ${answers.Features}
  ## Contributing
     ${answers.Contributing}
  ## Test
     ${answers.Test}
    `


// function call to initialize program
init()
 .then((answers) => writeFileAsync('README.md' , generateREADME(answers)))
 .then(() => console.log('Created file and wrote to README.md'))
 .catch((err) => console.error(err));
 