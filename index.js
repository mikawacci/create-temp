#!/usr/bin/env node

const { exec } = require('child_process');

exec('git --version', (error, stdout, stderr) => {
    if (error) {
        console.error('Git not found.  Please install Git.');
        return;
    }

    // console.log('Git is installed:', stdout.trim());
    console.log('creating a sdk project...');

    const repoURL = 'https://github.com/mikawacci/create-temp.git';
    const projectName = 'create-ps-sdk';

    exec(`git clone ${repoURL} ${projectName}`, (cloneError, cloneStdout, cloneStderr) => {
        if (cloneError) {
            console.error(`Git clone error: ${cloneError}`);
            return;
        }
        console.log(cloneStdout.trim());

        console.log(`Installing dependencies in ${projectName}...`);
        exec(`cd ${projectName} && npm install`, (installError, installStdout, installStderr) => {
            if (installError) {
                console.error(`npm install error: ${installError}`);
                return;
            }
            console.log(installStdout.trim());

            console.log(`
Project setup is complete! 🎉

To get started:
1. cd ${projectName}
2. Run your app:
   - npm start: Starts the development server.
   - npm run build: Builds the app for production.
   - npm test: Run tests.
   - ... any other commands provided by the cloned project.

For more details, refer to the README in the project directory.
            `);
        });
    });
});
