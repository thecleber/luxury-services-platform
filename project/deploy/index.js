import { config } from './config.js';
import { validateConfig, buildProject } from './utils.js';
import { setupFtpClient, uploadFiles } from './ftp.js';

async function deploy() {
  let client = null;
  
  try {
    console.log('Starting deployment process...');
    
    // Build project
    await buildProject();
    
    // Setup FTP client
    client = await setupFtpClient(config);
    
    // Upload files
    await uploadFiles(client, config);
    
    console.log('Deployment completed successfully');
    
  } catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      try {
        console.log('Closing FTP connection...');
        await client.close();
      } catch (error) {
        console.error('Error closing FTP connection:', error.message);
      }
    }
  }
}

deploy();