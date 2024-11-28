import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

export const execAsync = promisify(exec);

export function validateConfig(config) {
  const required = ['host', 'username', 'password'];
  const missing = required.filter(key => !config.sftp[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required configuration: ${missing.join(', ')}`);
  }

  // Validate paths
  if (!config.paths?.local?.dist || !config.paths?.remote?.base) {
    throw new Error('Missing required path configuration');
  }
}

export async function buildProject() {
  console.log('Building project...');
  try {
    // Clean dist directory if it exists
    try {
      await fs.rm(path.join(process.cwd(), 'dist'), { recursive: true });
      console.log('Cleaned existing build directory');
    } catch (error) {
      // Ignore if directory doesn't exist
    }

    // Run build
    const { stdout, stderr } = await execAsync('npm run build');
    if (stderr) {
      console.error('Build warnings:', stderr);
    }
    console.log('Build output:', stdout);
    console.log('Build completed successfully');

    // Verify build output
    const distPath = path.join(process.cwd(), 'dist');
    const distExists = await fs.access(distPath)
      .then(() => true)
      .catch(() => false);

    if (!distExists) {
      throw new Error('Build failed: dist directory not created');
    }

    // Verify key files exist
    const files = await fs.readdir(distPath);
    if (!files.includes('index.html')) {
      throw new Error('Build failed: index.html not found in dist directory');
    }

  } catch (error) {
    throw new Error(`Build failed: ${error.message}`);
  }
}