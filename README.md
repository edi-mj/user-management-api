# User Management API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

REST API untuk sistem manajemen pengguna yang dilengkapi dengan fitur autentikasi dan otorisasi berbasis JWT. API ini menyediakan endpoint untuk registrasi, login, dan pengelolaan data user.

## Fitur Utama

- **Autentikasi & Otorisasi**: Sistem login dan register dengan JWT token
- **Manajemen User**: CRUD operations untuk data pengguna
- **Role-based Access**: Pembagian role member dan admin
- **Validasi Input**: Validasi data menggunakan express-validator
- **Password Hashing**: Enkripsi password dengan bcryptjs
- **Database ORM**: Integrasi dengan Sequelize untuk MySQL
- **Caching**: Dukungan Redis untuk optimasi performa

## Struktur Project

```
user-management-api/
├── src/
│   ├── config/          # Konfigurasi database
│   ├── controllers/     # Business logic handlers
│   ├── middleware/      # Auth & validation middleware
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes (versioned)
│   ├── services/        # Business logic services
│   └── utils/           # Helper utilities
├── server.js            # Entry point
└── package.json         # Dependencies
```

## Prerequisites

Pastikan sistem Anda sudah terinstall:

- Node.js (v14 atau lebih tinggi)
- MySQL (v5.7 atau lebih tinggi)
- Redis (opsional, untuk caching)

## Instalasi

1. Clone repository ini

```bash
git clone https://github.com/edi-mj/user-management-api.git
cd user-management-api
```

2. Install dependencies

```bash
npm install
```

3. Buat file `.env` dari template `.env.example`

```bash
cp .env.example .env
```

4. Atur konfigurasi di file `.env`

```env
PORT=3000

# Database configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=user_management_db

# Token JWT
JWT_SECRET=your_secret_key_here
```

5. Buat database MySQL

```sql
CREATE DATABASE user_management_db;
```

## Menjalankan Aplikasi

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server akan berjalan di `http://localhost:3000` (atau sesuai PORT di .env)

## API Endpoints

### Authentication

| Method | Endpoint                | Deskripsi            | Auth  |
| ------ | ----------------------- | -------------------- | ----- |
| POST   | `/api/v1/auth/register` | Registrasi user baru | Tidak |
| POST   | `/api/v1/auth/login`    | Login user           | Tidak |

**Register Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "contact_info": "081234567890"
}
```

**Login Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### User Management

| Method | Endpoint            | Deskripsi        | Auth |
| ------ | ------------------- | ---------------- | ---- |
| GET    | `/api/v1/users/:id` | Get user by ID   | Ya   |
| PUT    | `/api/v1/users/:id` | Update user data | Ya   |

**Authorization Header:**

```
Authorization: Bearer <your_jwt_token>
```

## Database Schema

**Table: users**

| Field        | Type         | Description                  |
| ------------ | ------------ | ---------------------------- |
| id           | INTEGER      | Primary key (auto increment) |
| name         | VARCHAR(50)  | Nama lengkap user            |
| email        | VARCHAR(100) | Email (unique)               |
| password     | VARCHAR(255) | Password (hashed)            |
| contact_info | VARCHAR(100) | Nomor kontak (optional)      |
| role         | ENUM         | Role user: 'member', 'admin' |
| created_at   | TIMESTAMP    | Waktu pembuatan              |
| updated_at   | TIMESTAMP    | Waktu update terakhir        |

## Validasi

API menggunakan express-validator dengan aturan:

- **Name**: Required, tidak boleh kosong
- **Email**: Required, format email valid, unique
- **Password**: Required, minimal 6 karakter
- **Contact Info**: Optional, harus berupa angka

## Error Handling

API mengembalikan response dengan format standar:

**Success Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

## Security

- Password di-hash menggunakan bcryptjs sebelum disimpan
- JWT token untuk autentikasi endpoint yang dilindungi
- Validasi input untuk mencegah SQL injection
- Role-based access control untuk otorisasi
