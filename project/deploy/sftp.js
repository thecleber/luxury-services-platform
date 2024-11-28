import Client from 'ssh2-sftp-client';
import path from 'path';

export async function setupSftpClient(config) {
  const sftp = new Client();
  
  try {
    console.log('Attempting SFTP connection...');
    
    await sftp.connect({
      host: config.sftp.host,
      port: config.sftp.port,
      username: config.sftp.username,
      password: config.sftp.password,
      readyTimeout: config.sftp.readyTimeout,
      retries: config.sftp.retries,
      retry_factor: config.sftp.retry_factor,
      retry_minTimeout: config.sftp.retry_minTimeout,
      debug: config.sftp.debug ? console.log : undefined,
      algorithms: {
        kex: [
          'ecdh-sha2-nistp256',
          'ecdh-sha2-nistp384',
          'ecdh-sha2-nistp521',
          'diffie-hellman-group-exchange-sha256',
          'diffie-hellman-group14-sha1'
        ],
        cipher: [
          'aes128-ctr',
          'aes192-ctr',
          'aes256-ctr',
          'aes128-gcm',
          'aes256-gcm'
        ]
      }
    });

    console.log('Successfully connected to cPanel via SFTP');
    return sftp;
  } catch (error) {
    console.error('SFTP Connection Error:', error);
    throw error;
  }
}

export async function uploadFiles(sftp, config) {
  try {
    console.log('Starting file upload process...');

    const { local, remote } = config.paths;

    // Ensure remote directory exists
    console.log(`Creating/verifying remote directory: ${remote.base}`);
    await sftp.mkdir(remote.base, true);

    // Upload files with progress tracking
    console.log('Uploading files...');
    let filesUploaded = 0;

    const uploadWithProgress = async (localPath, remotePath) => {
      const files = await sftp.list(localPath);
      
      for (const file of files) {
        const localFilePath = path.join(localPath, file.name);
        const remoteFilePath = path.join(remotePath, file.name);

        if (file.type === 'd') {
          await sftp.mkdir(remoteFilePath, true);
          await uploadWithProgress(localFilePath, remoteFilePath);
        } else {
          await sftp.put(localFilePath, remoteFilePath);
          filesUploaded++;
          console.log(`Uploaded (${filesUploaded}): ${file.name}`);
        }
      }
    };

    await uploadWithProgress(local.dist, remote.base);

    // Upload .htaccess
    console.log('Creating .htaccess file...');
    await sftp.put(
      Buffer.from(config.htaccess.content),
      path.join(remote.base, '.htaccess')
    );

    // Set permissions
    console.log('Setting file permissions...');
    await sftp.chmod(remote.base, 0o755);

    console.log('Deployment completed successfully');
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}