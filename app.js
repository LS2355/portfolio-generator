const fs = require('fs');
//import
const generatePage = require('./src/page_template.js');

const profileDataArgs = process.argv.slice(2, process.argv.length);

const [name, Github] = profileDataArgs;


fs.writeFile('./index.html', generatePage(name, Github), err => {
    if (err) throw err;

    console.log('Portfolio complete! Checkout index.html to see the output!')
});
