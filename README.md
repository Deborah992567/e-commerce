<div align="center">

# Dez Collection — Full-Stack E-Commerce Platform

### FastAPI Backend + React Native Mobile App

A complete, production-grade e-commerce platform consisting of a **Python FastAPI REST API** backend and a **React Native** mobile application, built from scratch with a focus on security, animations, and polished UI.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React Native](https://img.shields.io/badge/React_Native-0.84.1-61DAFB?logo=react&logoColor=white)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.23-d71f00?logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org)
[![License](https://img.shields.io/badge/License-Private-red)](#)

</div>

---

## Repository Overview

This repository contains **two main applications** that together form a full e-commerce platform:

```
e-commerce/
├── backend/                          # Python FastAPI REST API
│   ├── app/
│   │   ├── main.py                   # FastAPI app entry point
│   │   ├── core/                     # Config, database, security, Redis/Celery
│   │   ├── routers/                  # API endpoints (auth, products, orders, etc.)
│   │   ├── models/                   # SQLAlchemy ORM models
│   │   ├── schemas/                  # Pydantic validation schemas
│   │   ├── services/                 # Business logic layer
│   │   ├── middleware/               # Auth, logging, rate limiting, security headers
│   │   └── dependencies/             # Reusable dependency injection
│   ├── alembic/                      # Database migrations
│   ├── tests/                        # Pytest test suite (80% coverage enforced)
│   └── requirements.txt              # Python dependencies
│
└── frontend/
    └── ecommerce_frontend/           # React Native mobile app (TypeScript)
        ├── App.tsx                   # Root component & navigation
        └── src/
            ├── components/           # 120+ UI, animation & screen components
            ├── contexts/             # Auth, Cart, Wishlist, Notification state
            └── types.ts              # Shared TypeScript types
```

---

## Backend (FastAPI)

A secure, production-ready REST API for the e-commerce platform.

### Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| FastAPI | 0.104.1 | Async web framework |
| Uvicorn | 0.24.0 | ASGI server |
| SQLAlchemy | 2.0.23 | ORM & database access |
| Alembic | 1.12.1 | Database migrations |
| Pydantic | 2.5.0 | Request/response validation |
| Pydantic Settings | 2.1.0 | Environment configuration |
| Passlib + Bcrypt | 1.7.4 / 4.0.1 | Password hashing |
| python-jose | 3.3.0 | JWT authentication |
| Celery | 5.3.4 | Background task queue |
| Redis | 5.0.1 | Caching & task broker |
| Cloudinary | 1.36.0 | Image upload/storage |
| Loguru | 0.7.2 | Structured logging |
| FastAPI-Mail | 1.4.1 | Email notifications |
| pytest | 7.4.3 | Testing (80% coverage enforced) |

### API Routers

| Router | Prefix | Description |
|--------|--------|-------------|
| Auth | `/auth` | Register, login, JWT tokens, password reset |
| Products | `/products` | Product catalog, search, filtering |
| Orders | `/orders` | Order creation, status, history |
| Reviews | `/reviews` | Product reviews & ratings |
| Discounts | `/discounts` | Coupons, promo codes, discount logic |
| Analytics | `/analytics` | Sales & user analytics |
| Admin | `/admin` | Admin-only management endpoints |
| Health | `/health` | Service health check |

### Models

`User` · `Profile` · `Product` · `ProductImage` · `Category` · `Order` · `OrderItem` · `Payment` · `Review` · `Discount` · `OrderDiscount`

### Middleware & Security

- **Security headers** — `SecurityHeadersMiddleware` (X-Content-Type-Options, CSP, etc.)
- **Rate limiting** — `rate_limit_middleware` to prevent abuse
- **Logging** — request/response logging via `logging_middleware`
- **CORS** — configurable allowed origins
- **Global exception handlers** — structured error responses for HTTP, DB, and internal errors

### Tests

The backend enforces **80%+ code coverage** via pytest.

```bash
cd backend
# Run the full test suite with coverage
pytest
```

Tests cover: auth API, products API, orders API, discounts API, order service, discount service, and general security.

### Running the Backend

```bash
cd backend

# Setup virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
# Create a .env file with:
#   ENV, DATABASE_URL, JWT_SECRET, REDIS_URL,
#   CLOUDINARY credentials, CELERY_BROKER_URL, CELERY_RESULT_BACKEND

# Apply database migrations
alembic upgrade head

# Seed demo data
python -m app.scripts.seed

# Start the server
uvicorn app.main:app --reload
```

API docs are auto-generated at `http://localhost:8000/docs`.

---

## Frontend (React Native)

A feature-rich, Temu-style mobile shopping app with a dark theme, 35+ custom SVG icons, and 40+ animations.

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.84.1 | Core mobile framework |
| React | 19.2.3 | UI library |
| TypeScript | 5.8.3 | Type safety |
| react-native-reanimated | 3.17.4 | Advanced physics-based animations |
| react-native-svg | 15.15.3 | Custom SVG icons (35+) |
| react-native-safe-area-context | 5.5.2 | Safe area handling |
| @react-native-async-storage | 3.0.1 | Persistent local storage |
| react-native-linear-gradient | — | Gradient effects |
| react-native-vector-icons | — | Additional icons |

### Key Features

| Category | Features |
|----------|----------|
| **Shopping** | Product catalog, search & filters, cart, checkout, wishlist, order tracking |
| **Gamification** | Spin-to-win wheel, daily streaks, badges, coin rewards, referral program |
| **UX** | Animated onboarding, skeleton loading, pull-to-refresh, toast notifications |
| **Auth** | Login/signup, forgot password, role-based access (Admin/Customer) |
| **Animations** | 40+ custom — confetti, particles, neon glow, wave text, rainbow borders, and more |
| **Icons** | 35+ hand-crafted SVG components |
| **State** | Context API + AsyncStorage for cart, wishlist, onboarding persistence |

### Running the Frontend

See the full detailed README in [`frontend/ecommerce_frontend/README.md`](frontend/ecommerce_frontend/README.md).

```bash
cd frontend/ecommerce_frontend
npm install
cd ios && pod install && cd ..

# Start Metro + run iOS
npm start
npm run ios

# Or run on Android
npm run android
```

### Mock Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@ecommerce.com` | `admin123` |
| Customer | `user1@ecommerce.com` | `user123` |

---

## Dark Theme (Frontend)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0D0D12` | Screen background |
| Card | `#23232B` | Card backgrounds |
| Border | `#2D2D38` | Card borders, dividers |
| Accent | `#FF5722` | Primary actions, highlights |
| Success | `#4ECDC4` | Positive states |
| Error | `#FF2D55` | Errors, warnings |
| Gold | `#FFD700` | Stars, ratings |
| Muted | `#A0A0A0` | Secondary text |

---

## License

This project is private. All rights reserved to Dez Collection 2026.
