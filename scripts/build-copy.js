import { exec } from 'child_process';
import path from 'path';

let buildInProgress = false;
const isDebug = process.argv[2] === 'debug';
const buildCommand = isDebug ? 'npm run build:debug' : 'npm run build';

const runBuildAndCopy = () => {
  if (buildInProgress) {
    console.log('Build already in progress, skipping.');
    return;
  }

  buildInProgress = true;
  console.log('Starting build...');

  exec(buildCommand, (error, stdout, stderr) => {
    buildInProgress = false;

    if (error) {
      console.error(`Build failed: ${error}`);
      if (stderr) {
        console.error(`Build stderr: ${stderr}`);
      }
      return;
    }
    console.log(`Build successful: ${stdout}`);

    // Resolve paths relative to the current working directory where this script is run
    // Assuming this script is run from the same directory as the original watcher script
    const sourcePath = path.resolve('./dist/*');
    const destinationPath = path.resolve('../go/inspectr-proxy/app/');

    exec(`cp -r ${sourcePath} ${destinationPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Copy failed: ${error}`);
        if (stderr) {
          console.error(`Copy stderr: ${stderr}`);
        }
        return;
      }
      console.log(`Copy successful.`); // Changed from "Build successful" to "Copy successful"
      if (stdout) {
        console.log(`Copy stdout: ${stdout}`);
      }
    });
  });
};

// Execute the function when the script is run
runBuildAndCopy();