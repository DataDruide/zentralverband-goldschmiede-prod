import fs from 'fs/promises';
import path from 'path';

const root = path.resolve('dist');
const clientDir = path.join(root, 'client');
const serverDir = path.join(root, 'server');

async function copyDir(src, dest, exclude = []) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    if (exclude.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath, exclude);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  // Copy client static files (not assets) to server root for direct serving
  // This includes things like index.html, favicon.ico
  await copyDir(clientDir, serverDir, ['assets']);
  
  // Merge client assets into server assets folder
  await copyDir(path.join(clientDir, 'assets'), path.join(serverDir, 'assets'));
  
  // Rename index.js to _worker.js for Pages Function compatibility
  const indexPath = path.join(serverDir, 'index.js');
  const workerPath = path.join(serverDir, '_worker.js');
  try {
    await fs.rename(indexPath, workerPath);
  } catch (e) {
    // If already renamed, that's fine
  }
  console.log(`Built for Cloudflare Pages. Deploy ${serverDir} with output directory set to dist/server`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
