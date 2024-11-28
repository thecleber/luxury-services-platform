export const cpanelConfig = {
  // Database Configuration
  database: {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
  },

  // Email Configuration
  email: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },

  // Cron Jobs Configuration
  cronJobs: [
    {
      name: 'cleanup-expired-sessions',
      schedule: '0 0 * * *', // Run daily at midnight
      command: 'node scripts/cleanup-sessions.js',
    },
    {
      name: 'send-reminder-emails',
      schedule: '0 9 * * *', // Run daily at 9 AM
      command: 'node scripts/send-reminders.js',
    },
  ],

  // Static Files Configuration
  static: {
    uploadDir: 'public/uploads',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },

  // Security Configuration
  security: {
    sslRedirect: true,
    xssProtection: true,
    noSniff: true,
    frameGuard: true,
  },
};