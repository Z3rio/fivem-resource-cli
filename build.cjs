const { spawnSync } = require("child_process");
const { rmSync, existsSync } = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "dist");

if (existsSync(distDir)) {
  console.info("Deleting dist folder");
  rmSync(distDir, {
    recursive: true
  });
} else {
  console.info("Dist folder already doesnt exist");
}

console.info("Building project");
spawnSync("npx tsc", {
  cwd: __dirname
});
