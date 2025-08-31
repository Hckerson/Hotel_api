# 🏨 SerenaHeaven - Hotel Booking System

A comprehensive hotel booking and management system built with NestJS, featuring authentication, payment processing, room management, and content management.

## ✨ Features

- **🔐 Authentication & Authorization**
  - Multi-provider authentication (Local, Google, Facebook, GitHub)
  - Two-factor authentication (2FA) with TOTP
  - Session management with encrypted cookies
  - Role-based access control (Guest/Admin)

- **🏠 Room Management**
  - Room availability filtering
  - Dynamic pricing and amenities
  - Booking system with status tracking
  - Room type categorization

- **💳 Payment Processing**
  - Paystack integration for payments
  - Webhook handling for payment verification
  - Transaction status tracking
  - Payment history management

- **📝 Content Management**
  - Blog post management
  - Testimonials system
  - Dynamic content delivery

- **🌍 Geolocation & Security**
  - IP-based geolocation tracking
  - Device fingerprinting
  - Rate limiting and throttling
  - Redis caching for performance

## 🛠️ Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/) (v11)
- **Database**: PostgreSQL with [Prisma](https://www.prisma.io/) ORM
- **Authentication**: Passport.js with multiple strategies
- **Payment**: [Paystack](https://paystack.com/) integration
- **Caching**: Redis
- **Documentation**: Swagger/OpenAPI
- **Language**: TypeScript
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Redis server
- pnpm package manager

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd serena-heaven
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/serena_heaven"

# Redis
REDIS_URL="redis://localhost:6379"

# Authentication
COOKIE_SECRET="your-super-secret-cookie-key"
JWT_SECRET="your-jwt-secret"

# Paystack
PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_PUBLIC_KEY="pk_test_..."

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Server
PORT=3000
```

### 4. Database Setup

```bash
# Generate Prisma client
pnpm run prisma:generate

# Run database migrations
npx prisma migrate dev

# Seed the database (if you have seed data)
npx prisma db seed
```

### 5. Custom Library Setup

This project uses a custom version of `geoip-lite`. After installation, copy the custom library:

```bash
cp -r custom_libs/geoip-lite/* node_modules/geoip-lite/
```

### 6. Start the application

```bash
# Development mode
pnpm run start:dev

# Production mode
pnpm run start:prod

# Debug mode
pnpm run start:debug
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:

- **Swagger UI**: `http://localhost:3000/api`
- **OpenAPI JSON**: `http://localhost:3000/api-json`

## 🏗️ Project Structure

```
src/
├── auth/                 # Authentication & authorization
│   ├── dto/             # Data transfer objects
│   ├── entities/        # User entities
│   └── service/         # Auth utilities
├── payment/             # Payment processing
│   ├── dto/            # Payment DTOs
│   ├── services/       # Paystack integration
│   └── db/             # Payment database operations
├── room/               # Room management
│   ├── dto/           # Room DTOs
│   └── entities/      # Room entities
├── content/            # Content management
│   ├── dto/           # Content DTOs
│   └── entities/      # Blog & testimonial entities
├── prisma/            # Database configuration
├── services/          # Shared services
│   └── redis/         # Redis connection
└── lib/               # Utility libraries
```

## 🔧 Available Scripts

```bash
# Development
pnpm run start:dev      # Start in watch mode
pnpm run start:debug    # Start with debugger
pnpm run start:sdev     # Start with webpack HMR

# Production
pnpm run build          # Build the application
pnpm run start:prod     # Start production server

# Testing
pnpm run test           # Run unit tests
pnpm run test:watch     # Run tests in watch mode
pnpm run test:cov       # Run tests with coverage
pnpm run test:e2e       # Run end-to-end tests

# Code Quality
pnpm run lint           # Run ESLint
pnpm run format         # Format code with Prettier

# Database
pnpm run prisma:generate # Generate Prisma client
```

## 🔐 Authentication Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/2fa/enable` - Enable 2FA
- `POST /auth/2fa/verify` - Verify 2FA code
- `GET /auth/profile` - Get user profile

## 🏠 Room Management Endpoints

- `GET /rooms` - Get all available rooms
- `GET /rooms/:id/details` - Get specific room details
- `POST /rooms/available/filter` - Filter rooms by criteria
- `POST /rooms/bookings/single` - Book a room
- `POST /rooms/bookings/multiple` - Book multiple rooms
- `PUT /rooms/bookings/cancel/:id` - Cancel booking

## 💳 Payment Endpoints

- `POST /payment/initialize` - Initialize payment
- `POST /payment/verify/:reference` - Verify payment
- `GET /payment/transactions` - Get transaction history
- `POST /payment/webhook/paystack` - Paystack webhook

## 📝 Content Endpoints

- `GET /content/blog` - Get blog posts
- `POST /content/blog` - Create blog post (Admin)
- `GET /content/testimonials` - Get testimonials
- `POST /content/testimonials` - Create testimonial

## 🧪 Testing

```bash
# Run all tests
pnpm run test

# Run tests with coverage
pnpm run test:cov

# Run e2e tests
pnpm run test:e2e
```

## 🚀 Deployment

### Using Docker (Recommended)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
```

### Environment Variables for Production

Make sure to set all required environment variables in your production environment:

- Database connection string
- Redis connection string
- All OAuth provider credentials
- Paystack API keys
- Cookie and JWT secrets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [API documentation](http://localhost:3000/api) when running locally
2. Review the [NestJS documentation](https://docs.nestjs.com/)
3. Open an issue in this repository

## 🔗 Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Paystack API Documentation](https://paystack.com/docs/)
- [Redis Documentation](https://redis.io/documentation)

---

Built with ❤️ using [NestJS](https://nestjs.com/)
