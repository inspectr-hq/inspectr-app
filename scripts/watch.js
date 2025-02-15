import fs from 'fs';
import { exec } from 'child_process';

const nodeModulesPath = './node_modules/@inspectr/ui/dist';
let timeoutId;

fs.watch(nodeModulesPath, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`File ${filename} in ${nodeModulesPath} changed (${eventType}).`);

    // Clear any previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      exec('npm run build', (error, stdout, stderr) => {
        if (error) {
          console.error(`Build failed: ${error}`);
          if (stderr) {
            console.error(`Build stderr: ${stderr}`);
          }
          return;
        }
        console.log(`Build successful: ${stdout}`);
      });
    }, 5000); // 5000 milliseconds = 5 seconds
  }
});

console.log(`Watching ${nodeModulesPath} for changes...`);