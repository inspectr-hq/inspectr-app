import fs from 'fs';
import { exec } from 'child_process';

const nodeModulesPath = './node_modules/@inspectr/ui/dist';
let timeoutId;
let buildInProgress = false;

fs.watch(nodeModulesPath, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`File ${filename} in ${nodeModulesPath} changed (${eventType}).`);

    if (buildInProgress) {
      console.log('Build already in progress, skipping.');
      return;
    }

    clearTimeout(timeoutId); // Clear any pending timeouts

    timeoutId = setTimeout(() => {
      if (buildInProgress) return; // Double-check

      buildInProgress = true;
      console.log('Starting build...');

      exec('npm run build', (error, stdout, stderr) => {
        buildInProgress = false;

        if (error) {
          console.error(`Build failed: ${error}`);
          if (stderr) {
            console.error(`Build stderr: ${stderr}`);
          }
          return;
        }
        console.log(`Build successful: ${stdout}`);

        // Relative paths here:
        const sourcePath = './dist/*';
        const destinationPath = '../go/inspectr-proxy/app/';

        exec(`cp -r ${sourcePath} ${destinationPath}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Copy failed: ${error}`);
            if (stderr) {
              console.error(`Copy stderr: ${stderr}`);
            }
            return;
          }
          console.log(`Build successful: ${stdout}`);
        });
      });
    }, 5000);
  }
});

console.log(`Watching ${nodeModulesPath} for changes...`);