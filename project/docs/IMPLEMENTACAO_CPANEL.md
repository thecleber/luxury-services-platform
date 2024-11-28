# Guia de Implementação no cPanel

## Índice
1. [Requisitos Preliminares](#requisitos-preliminares)
2. [Configuração do Ambiente](#configuracao-do-ambiente)
3. [Configuração do Banco de Dados](#configuracao-do-banco-de-dados)
4. [Configuração do Node.js](#configuracao-do-nodejs)
5. [Deploy da Aplicação](#deploy-da-aplicacao)
6. [Configuração de E-mail](#configuracao-de-email)
7. [Configuração de SSL](#configuracao-de-ssl)
8. [Cron Jobs](#cron-jobs)
9. [Monitoramento](#monitoramento)

## 1. Requisitos Preliminares

Antes de iniciar a implementação, certifique-se de ter:

- Acesso ao painel de controle cPanel
- Domínio configurado e apontando para o servidor
- Plano de hospedagem com suporte a:
  - Node.js
  - MySQL/MariaDB
  - SSL
  - Cron Jobs

## 2. Configuração do Ambiente

### 2.1. Configuração do .env

1. Acesse o cPanel e crie um arquivo `.env` na raiz do projeto:
```bash
# Configurações do cPanel
CPANEL_HOST=seu-dominio.com
CPANEL_USERNAME=seu-usuario
CPANEL_PASSWORD=sua-senha
CPANEL_DOMAIN=seu-dominio.com
DEPLOY_PATH=public_html

# Chaves de API
VITE_GOOGLE_MAPS_API_KEY=sua-chave-google-maps
VITE_STRIPE_PUBLIC_KEY=sua-chave-publica-stripe

# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu-usuario-db
DB_PASSWORD=sua-senha-db
DB_NAME=nome-do-banco

# SMTP
SMTP_HOST=seu-servidor-smtp
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=seu-email
SMTP_PASS=sua-senha-email
```

## 3. Configuração do Banco de Dados

1. No cPanel, acesse "MySQL Databases"
2. Crie um novo banco de dados
3. Crie um usuário para o banco de dados
4. Atribua todas as permissões necessárias ao usuário

```sql
-- Execute estes comandos no phpMyAdmin
CREATE DATABASE nome_do_banco CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON nome_do_banco.* TO 'usuario'@'localhost';
FLUSH PRIVILEGES;
```

## 4. Configuração do Node.js

1. No cPanel, localize a seção "Setup Node.js App"
2. Configure uma nova aplicação Node.js:
   - Escolha a versão do Node.js (recomendado: 18.x ou superior)
   - Defina o diretório da aplicação
   - Configure o comando de início: `npm start`
   - Defina as variáveis de ambiente

## 5. Deploy da Aplicação

1. Execute o script de deploy:
```bash
npm run deploy
```

2. O script irá:
   - Fazer build da aplicação
   - Enviar os arquivos via SFTP
   - Configurar o Node.js
   - Configurar os arquivos estáticos

## 6. Configuração de E-mail

1. No cPanel, configure as contas de e-mail necessárias
2. Atualize as configurações SMTP no arquivo `.env`
3. Verifique se o servidor SMTP está funcionando:
```bash
node scripts/test-email.js
```

## 7. Configuração de SSL

1. No cPanel, acesse "SSL/TLS"
2. Instale o certificado SSL para seu domínio
3. Configure o redirecionamento HTTPS:

```apache
# Adicione ao .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 8. Cron Jobs

1. No cPanel, acesse "Cron Jobs"
2. Configure os seguintes jobs:

```bash
# Limpeza de sessões expiradas (diariamente à meia-noite)
0 0 * * * /usr/local/bin/node /home/usuario/public_html/scripts/cleanup-sessions.js

# Envio de lembretes (diariamente às 9h)
0 9 * * * /usr/local/bin/node /home/usuario/public_html/scripts/send-reminders.js
```

## 9. Monitoramento

1. Configure o monitoramento de recursos:
   - CPU
   - Memória
   - Espaço em disco
   - Tráfego de rede

2. Configure alertas para:
   - Alto uso de recursos
   - Erros na aplicação
   - Falhas de backup
   - Certificado SSL próximo do vencimento

## Verificação Final

- [ ] Aplicação acessível via HTTPS
- [ ] Banco de dados conectado e funcionando
- [ ] E-mails sendo enviados corretamente
- [ ] Arquivos estáticos sendo servidos com cache
- [ ] Cron jobs executando conforme programado
- [ ] SSL configurado e funcionando
- [ ] Backups automáticos configurados
- [ ] Monitoramento ativo

## Suporte e Manutenção

1. Mantenha um registro de:
   - Atualizações realizadas
   - Problemas encontrados
   - Soluções aplicadas
   - Backups realizados

2. Realize verificações periódicas de:
   - Logs de erro
   - Desempenho da aplicação
   - Uso de recursos
   - Atualizações de segurança

3. Mantenha um plano de contingência para:
   - Falhas de servidor
   - Ataques DDoS
   - Corrupção de dados
   - Problemas de SSL