const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page_template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
    return inquirer
    .prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            }
            else {
                console.log("Please enter your name!")
                return false
            }
        }
        },
        {
        type: 'input',
        name: 'github',
        message: 'Enter your github Username? (Required)',
        validate: GitHubUsername => {
            if (GitHubUsername) {
                return true;
            }
            else {
                console.log("Please enter your GitHub Username!");
                return false;
            }
        }
        },

        //about section
        {
        type: 'confirm',
        name: "confirmAbout",
        message: 'Would you like to enter some information about yourself for an "about" section?',
        default: true 
        },
        {
        type: 'input',
        name: 'about',
        message: 'Provide some information about your self:',
        when: ({confirmAbout}) => {
            if (confirmAbout) {
                return true;
            }

            else {
                return false;
            }
        }
        },
    ]);
}



const promptProject = portfolioData => {
//if there are no 'projects' array property, create one
if (!portfolioData.projects) {
portfolioData.projects = [];    
}


//form start
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: ProjectName => {
            if (ProjectName) {
                return true;
            }
            else {
                console.log("Please enter your GitHub Username!");
                return false;
            }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: ProjectDescription => {
            if (ProjectDescription) {
                return true;
            }
            else {
                console.log("Please enter your GitHub Username!");
                return false;
            }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: GitHubLink => {
            if (GitHubLink) {
                return true;
            }
            else {
                console.log("Please enter your GitHub Username!");
                return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        }

        else {
            return portfolioData;
        }
    });
  };
 
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });