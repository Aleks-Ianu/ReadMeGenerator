const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const util = require('util');
// import checkbox from '@inquirer/checkbox';


const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const questions = [
    'Title: What is the title of your project?',
    'Description: Write a description of your project',
    'Installation: What are the steps required to install your project?',
    'Usage: Provide instructions and examples for use. Include screenshots as needed.',
    'Credits: List your collaborators, if any, with links to their GitHub profiles.',
    'Licence: If you need help choosing a license, use [https://choosealicense.com/]',
    // not used for project
    // 'Badges: Check out the badges hosted by (https://shields.io/)',
    'Features: add features of the project  here',
    'Contributing: The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, check it out',
    'Test: Go the extra mile and write tests for your application',
    'Question1: What is your email? ',
    'Question2: What is your github account?',


];

// function to initialize program
const  init = () => 
   
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
    {
        type: 'input',
        message: questions[2],
        name: 'Installation',
        default: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.'
    },
    {
        type: 'input',
        message: questions[3],
        name: 'Usage',
        default: "Provide instructions and examples for use. Include screenshots as needed.To add a screenshot, create an assets/images folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README "
    },
    {
        type: 'input',
        message: questions[4],
        name: 'Credits',
        default: "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well."
    },
    {
        type: 'list',
        message: questions[5],
        name: 'Licence',
        choices: [
            {name:"MIT Licence", value:"![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)"},
            {name: "GNU GPL v3", value:"![GithubLicence](https://img.shields.io/badge/License-GPLv3-blue.svg)"},
            {name: "Mozilla Public Licence 2.0", value: "![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)"},
        ],
        default: "MIT Licence"
    },
    // not used for project
    // {
    //     type: 'input',
    //     message: questions[6],
    //     name: 'Badges',
    //     default: "Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by shields.io."
    // },
    {
        type: 'input',
        message: questions[6],
        name: 'Features',
        default: "If your project has a lot of features, consider adding a heading called 'Features' and listing them there."
    },
    {
        type: 'input',
        message: questions[7],
        name: 'Contributing',
        default: "If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The Contributor Covenant is an industry standard, but you can always write your own"
    },
    {
        type: 'input',
        message: questions[8],
        name: 'Test',
        default: 'Go the extra mile and write tests for your application. Then provide examples on how to run them.'
    },
    {
        type: 'input',
        message: questions[9],
        name: 'Question1',
        default: 'Enter your email'
    },
    {
        type: 'input',
        message: questions[10],
        name: 'Question2',
        default: 'Enter your github username'
    }
  ]);

  const generateREADME = (answers) => `
# ${answers.Title}
${answers.Licence}

## Description
${answers.Description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Licence Description](#licence-description) 
- [Features](#features)
- [Contributing](#contributing)
- [Test](#test)
- [Questions](#questions)

## Installation
${answers.Installation}

## Usage
${answers.Usage}

## Credits
${answers.Credits}


## Licence Description
${getLicenseDescription(answers.Licence)}


## Features
${answers.Features}

## Contributing
${answers.Contributing}

## Test
${answers.Test}

## Questions
In this section, you will find links to my GitHub and email address to contact me if you have any questions or you want to chat about the project.

[GitHub Profile](https://github.com/${answers.Question2})

[Email Me](mailto:${answers.Question1})
`;

// function to get the description based on the lcience that the user selected
const getLicenseDescription = (license) => {
    switch (license) {
        case "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)":
            return "This project is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) for details.";
        case "![GithubLicence](https://img.shields.io/badge/License-GPLv3-blue.svg)":
            return "This project is licensed under the GNU General Public License v3.0 - see the [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0) for details.";
        case "![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)":
            return "This project is licensed under the Mozilla Public License 2.0 - see the [Mozilla Public License 2.0](https://opensource.org/licenses/MPL-2.0) for details.";
        default:
            return "";
    }
};

// function call to initialize program
init()
    .then((answers) => {
        const markdown = generateREADME(answers);
        return writeFileAsync('README.md', markdown);
    })
    .then(() => console.log('Created file and wrote to README.md'))
    .catch((err) => console.error(err));


