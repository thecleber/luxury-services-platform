import Client from 'ssh2-sftp-client';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const execAsync = promisify(exec);

async function deployToCPanel() {
  try {
    // Build da aplicação
    console.log('Building application...');
    await execAsync('npm run build');

    const sftp = new Client();
    const { CPANEL_HOST, CPANEL_USERNAME, CPANEL_PASSWORD, DEPLOY_PATH } = process.env;

    if (!CPANEL_HOST || !CPANEL_USERNAME || !CPANEL_PASSWORD || !DEPLOY_PATH) {
      throw new Error('Missing required environment variables for deployment');
    }

    // Conexão com cPanel via SFTP
    console.log('Connecting to cPanel...');
    await sftp.connect({
      host: '212.1.210.198',
      port: 65002,
      username: CPANEL_USERNAME,
      password: CPANEL_PASSWORD,
      retries: 3,
      retry_factor: 2,
      retry_minTimeout: 2000,
    });

    console.log('Connected to cPanel via SFTP');

    // Verificar se o diretório remoto existe
    try {
      await sftp.mkdir(`/${DEPLOY_PATH}`, true);
    } catch (error) {
      console.log('Directory already exists or cannot be created');
    }

    // Upload do diretório dist
    const localPath = path.join(process.cwd(), 'dist');
    const remotePath = `/${DEPLOY_PATH}`;

    console.log(`Uploading files to ${remotePath}`);
    await sftp.uploadDir(localPath, remotePath);

    // Criar e fazer upload do .htaccess
    const htaccessContent = `
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>`;

    console.log('Creating .htaccess file...');
    await sftp.put(
      Buffer.from(htaccessContent),
      `/${DEPLOY_PATH}/.htaccess`
    );

    console.log('Setting file permissions...');
    await sftp.chmod(`/${DEPLOY_PATH}`, 0o755);

    console.log('Deployment completed successfully');
    await sftp.end();

  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deployToCPanel();