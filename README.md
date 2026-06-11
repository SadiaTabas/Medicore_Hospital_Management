 

#  MediCore Hospital Management System (Full Stack)

A scalable and modern **full-stack Hospital Management System** built using:

* **Backend:** NestJS, TypeScript, PostgreSQL
* **Frontend:** Next.js, React, Tailwind CSS
* **Authentication:** JWT-based secure login system

This system streamlines **doctor management, appointment scheduling, and profile handling** with a responsive and user-friendly interface.

 

#  System Overview

MediCore is designed to connect doctors and patients efficiently by providing:

* Secure authentication system
* Doctor profile management
* Appointment scheduling system
* Responsive web-based dashboard

 

#  Tech Stack

## Backend

* NestJS
* Node.js
* TypeScript
* PostgreSQL
* JWT Authentication
* BCrypt Password Hashing
* TypeORM / Prisma (optional)

## Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* Axios (API communication)

---

#  Authentication System

* Doctor registration
* Secure login/logout
* JWT-based session control
* Password encryption using BCrypt

---

#  Doctor Management

* Create doctor accounts
* Update doctor profiles
* Manage specialization & experience
* Upload supporting documents

---

#  Appointment Management

* Create appointments
* Assign doctors to patients
* View appointment history
* Track consultation schedules

---

#  Profile System

* One-to-one doctor profile mapping
* Store hospital & address details
* Update profile information

---

#  Database Structure

## Doctor Table

* ID (Primary Key)
* Name
* Specialization
* Experience
* Password (Encrypted)
* Phone (Unique)
* File
* ProfileId (Foreign Key)

## Doctor_Profile Table

* ID (Primary Key)
* Address
* Hospital

## Appointment Table

* ID (Primary Key)
* Patient Name
* Date
* DoctorId (Foreign Key)

---

#  Database Relationships

* Doctor ↔ Profile → One-to-One
* Doctor ↔ Appointment → One-to-Many

---

#  Installation Guide

## 1️ Clone Repositories

### Backend

```bash
git clone https://github.com/your-username/medicore-backend.git
```

### Frontend

```bash
git clone https://github.com/your-username/medicore-frontend.git
```

---

## 2️ Backend Setup

```bash
cd medicore-backend
npm install
```

### Create `.env` file

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=MedicoreDB

JWT_SECRET=your_secret_key
PORT=5000
```

### Create Database

```sql
CREATE DATABASE MedicoreDB;
```

### Run Server

```bash
npm run start:dev
```

Backend runs at:

```
http://localhost:5000
```

---

## 3️ Frontend Setup

```bash
cd medicore-frontend
npm install
```

### Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Run Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

#  API Endpoints

## Authentication

* `POST /auth/register` → Doctor registration
* `POST /auth/login` → Login

## Doctor

* `GET /doctor/profile` → Get profile
* `PUT /doctor/profile` → Update profile

## Appointment

* `POST /appointment` → Create appointment
* `GET /appointment` → Get appointments

---

#  UI/UX Features

* Fully responsive design (mobile + desktop)
* Clean medical dashboard UI
* Fast navigation with Next.js routing
* Tailwind CSS styling

---

#  Future Enhancements

* Patient module integration
* Video consultation system
* AI-based diagnosis suggestions
* Email/SMS notifications
* Payment gateway integration
* Live chat between doctor & patient

---

 

# 📚 Resources

* NestJS Docs: [https://docs.nestjs.com](https://docs.nestjs.com)
* Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
* PostgreSQL Docs: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)

---

# 📄 License

This project is developed for **academic and educational purposes only**.

 

 
