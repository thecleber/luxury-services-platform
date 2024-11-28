import * as ftp from 'basic-ftp';
import fs from 'fs/promises';
import path from 'path';

export async function setupFtpClient(config) {
  const client = new ftp.Client(config.ftp.timeout);
  client.ftp.verbose = config.ftp.verbose;
  
  try {
    console.log('Attempting FTP connection...');
    
    await client.access({
      host: config.ftp.host,
      port: config.ftp.port,
      user: config.ftp.username,
      password: config.ftp.password,
      secure: config.ftp.secure
    });
    
    console.log('Successfully connected to cPanel via FTP');
    return client;
  } catch (error) {
    console.error('FTP Connection Error Details:', error);
    throw new Error(`FTP connection failed: ${error.message}`);
  }
}

export async function uploadFiles(client, config) {
  const { local, remote } = config.paths;
  
  try {
    console.log('Starting file upload process...');

    // Ensure we're in binary mode for all transfers
    await client.binary();
    
    // Navigate to or create remote directory
    console.log(`Checking/creating remote directory: ${remote.base}`);
    try {
      await client.ensureDir(remote.base);
      await client.clearWorkingDir();
    } catch (error) {
      console.log('Creating new directory structure');
    }

    // Upload static files first
    console.log('Uploading static files...');
    await client.uploadFromDir(local.static, remote.static);

    // Upload remaining files from dist
    console.log('Uploading main files...');
    await client.uploadFromDir(local.dist, remote.base, {
      overwrite: true,
      skip: (remotePath) => remotePath.includes('/static/') // Skip static files we already uploaded
    });

    // Upload .htaccess
    console.log('Creating .htaccess file...');
    const htaccessPath = path.join(process.cwd(), 'temp-htaccess');
    await fs.writeFile(htaccessPath, config.htaccess.content);
    await client.uploadFrom(htaccessPath, '.htaccess');
    await fs.unlink(htaccessPath);

    console.log('Files uploaded successfully');
  } catch (error) {
    console.error('File Upload Error Details:', error);
    throw new Error(`File upload failed: ${error.message}`);
  }
}