# Guia de Integração - LuxeServ

## Índice
1. [Visão Geral](#visao-geral)
2. [Integrações Principais](#integracoes-principais)
3. [APIs e Serviços](#apis-e-servicos)
4. [Segurança](#seguranca)

## 1. Visão Geral

### 1.1. Arquitetura
- Frontend: React + TypeScript
- Backend: Node.js
- Banco de Dados: MySQL/MariaDB
- Cache: Redis
- Serviços de Email: SMTP
- Integrações: 
  - Google Maps
  - Stripe
  - Socket.io

### 1.2. Requisitos
- Node.js 18+
- MySQL 8+
- Redis 6+
- SSL Certificate
- Chaves de API:
  - Google Maps
  - Stripe
  - SMTP

## 2. Integrações Principais

### 2.1. Google Maps
```typescript
// Exemplo de integração
import { Loader } from '@googlemaps/js-api-loader';

const initMap = async () => {
  const loader = new Loader({
    apiKey: process.env.VITE_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
  });

  const google = await loader.load();
  // Configuração do mapa
};
```

### 2.2. Stripe
```typescript
// Exemplo de integração
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY);

const handlePayment = async () => {
  const stripe = await stripePromise;
  // Processamento do pagamento
};
```

### 2.3. Socket.io
```typescript
// Exemplo de integração
import { io } from 'socket.io-client';

const socket = io(process.env.VITE_API_BASE_URL, {
  autoConnect: false,
  transports: ['websocket'],
});

// Configuração dos eventos
socket.on('connect', () => {
  console.log('Connected to WebSocket');
});
```

## 3. APIs e Serviços

### 3.1. Endpoints Principais
```typescript
// Autenticação
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh-token

// Usuários
GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id

// Agendamentos
GET /api/bookings
POST /api/bookings
PUT /api/bookings/:id
DELETE /api/bookings/:id

// Avaliações
GET /api/reviews
POST /api/reviews
PUT /api/reviews/:id
DELETE /api/reviews/:id

// Pagamentos
POST /api/payments/create-session
POST /api/payments/webhook
GET /api/payments/status/:id
```

### 3.2. Webhooks
```typescript
// Exemplo de configuração de webhook
app.post('/api/webhooks/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Processar pagamento bem-sucedido
      break;
    case 'payment_intent.failed':
      // Processar falha no pagamento
      break;
  }

  res.json({ received: true });
});
```

## 4. Segurança

### 4.1. Autenticação
```typescript
// Exemplo de middleware de autenticação
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token não fornecido');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Não autorizado' });
  }
};
```

### 4.2. Validação de Dados
```typescript
// Exemplo de schema de validação
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['client', 'professional']),
});

// Middleware de validação
const validateUser = (req, res, next) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
```

### 4.3. Rate Limiting
```typescript
// Exemplo de configuração de rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite por IP
});

app.use('/api/', limiter);
```

## 5. Monitoramento

### 5.1. Logs
```typescript
// Exemplo de configuração de logs
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 5.2. Métricas
```typescript
// Exemplo de coleta de métricas
import prometheus from 'prom-client';

const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 500]
});
```

## 6. Deployment

### 6.1. Configuração do PM2
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'luxeserv-api',
    script: 'dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

### 6.2. Nginx Configuration
```nginx
# nginx.conf
server {
    listen 80;
    server_name api.luxeserv.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```