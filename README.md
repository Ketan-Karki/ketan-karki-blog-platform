# Slow Down Time - Personal Blog

A full-stack personal blogging platform built with modern technologies.

## Tech Stack

### Client (slow-down-time-client)

- **Nuxt 3** - Vue.js framework
- **TailwindCSS** - Utility-first CSS framework
- **Pinia** - State management
- **TypeScript** - Type safety

### Server (slow-down-time-server)

- **NestJS** - Node.js framework
- **PostgreSQL** - Database
- **TypeORM** - ORM

## Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
2. Install root dependencies:

   ```bash
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd slow-down-time-client
   npm install
   ```

4. Install server dependencies:

   ```bash
   cd ../slow-down-time-server
   npm install
   ```

5. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

6. Create PostgreSQL database:
   ```sql
   CREATE DATABASE slowdowntime;
   ```

### Running in Development

Run both client and server:

```bash
npm run dev
```

Or run individually:

```bash
# Server (http://localhost:3001)
npm run dev:server

# Client (http://localhost:3000)
npm run dev:client
```

## Deployment

The project is configured for deployment on SSH server (vegeta):

```bash
npm run deploy
```

## Database Schema

### Posts Table

- id (Primary Key)
- title
- slug (Unique)
- content (Text)
- excerpt (Text)
- published (Boolean)
- read_time (Integer)
- category_id (Foreign Key)
- created_at
- updated_at
- published_at

### Categories Table

- id (Primary Key)
- name
- slug (Unique)
- description (Text)
- created_at

## Features

- ✅ Responsive design
- ✅ Blog post management
- ✅ Category system
- ✅ SEO optimization
- ✅ Fast loading with Nuxt 3
- ✅ Type-safe API with NestJS
- ✅ Modern UI with TailwindCSS

## Development Notes

- Use DataGrip for database management
- Server runs on port 3001
- Client runs on port 3000
- Database synchronization is enabled in development
# ketan-karki-blog-platform
