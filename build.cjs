const { rmSync, existsSync } = require("fs");
const path = require("path");
const esbuild = require("esbuild")

async function main() {
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
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: "node",
    minify: true,
    outfile: 'dist/index.cjs',
  })
}

void main()