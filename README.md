# MediCore Hospital Management System

A web-based Hospital Management System developed to streamline doctor management, patient appointment scheduling, and healthcare service administration. The system enables patients to book appointments with doctors while providing doctors with profile management and appointment tracking functionalities.

---

# Features

 

# Doctor Module

### Authentication

* Secure doctor registration
* Login and logout functionality
* Password encryption for account security
* Logout

### Profile Management

* Create professional profiles
* Update personal information
* Upload supporting documents
* Manage hospital affiliation details

### Appointment Management

* View patient appointments
* Track appointment schedules
* Manage consultation records
  
## Doctor Search
* Browse available doctors
* View doctor specializations
* Check other doctor experience

 
# Database Structure

## Tables

### Doctor

Stores doctor information:

* ID (Primary Key)
* Name
* Specialization
* Experience
* Password (Encrypted)
* Phone Number
* File Upload
* ProfileId (Foreign Key)

### Doctor_Profile

Stores doctor profile details:

* ID (Primary Key)
* Address
* Hospital

### Appointment

Stores appointment information:

* ID (Primary Key)
* PatientName
* Appointment Date
* DoctorId (Foreign Key)

---

# Database Relationships

### Doctor ↔ Doctor_Profile

* One-to-One Relationship
* Each doctor can have one profile
* Profile contains hospital and address information

### Doctor ↔ Appointment

* One-to-Many Relationship
* One doctor can have multiple appointments
* Each appointment belongs to a single doctor

---

# Technology Stack

## Frontend
 
*Next.js
*Tailwind CSS
*React
 
## Backend

* Nest.js
* TypeScript

## Database

* PostgreSQL

## Authentication

* BCrypt Password Hashing

## Development Tools

* Visual Studio Code
* pgAdmin
 

---

# Core Functionalities

### Doctor Registration

* Create doctor accounts
* Secure password storage
* Upload qualification documents

### Appointment Scheduling

* Patient appointment booking
* Doctor assignment
* Appointment tracking

### Profile Management

* Hospital information management
* Doctor profile updates
* Address management

### Security

* Encrypted passwords
* Unique phone number validation
* Database relationship constraints

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/your-username/Medicore_Hospital_Management.git
```

## Database Setup

### Create PostgreSQL Database

```sql
CREATE DATABASE MedicoreDB;
```

### Restore Database

Using PostgreSQL:

```bash
psql -U postgres -d MedicoreDB -f database.sql
```

Or using pgAdmin:

1. Open pgAdmin.
2. Create a new database.
3. Right-click the database.
4. Select **Restore**.
5. Import the provided SQL file.

---

# Configure Environment Variables

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=MedicoreDB

PORT=3000
JWT_SECRET=your_secret_key
```

---

# Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start:dev
```

The application will run at:

```text
http://localhost:3000
```

---

# Future Enhancements

* Doctor Registration System
* Online Consultation
* Prescription Management
* Medical Records Storage
* Payment Gateway Integration
* Doctor Availability Scheduling
* Email Notifications
* SMS Appointment Reminders
* Admin Dashboard Analytics

---

# Project Objective

The objective of the MediCore Hospital Management System is to simplify healthcare appointment management by providing a secure and efficient platform for doctors and patients. The system improves appointment scheduling, doctor profile management, and overall healthcare service coordination.

---

# License

This project is developed for educational and academic purposes.
