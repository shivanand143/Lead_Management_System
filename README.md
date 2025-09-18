
# Lead Management System

## Description

A full-stack Lead Management System that allows users to **register, login, and manage leads**.
Leads are displayed in a grid with **pagination**.

## Tech Stack

* **Frontend**: ReactJS, AG Grid
* **Backend**: Node.js, Express
* **Database**: MongoDB Atlas
* **Authentication**: JWT (httpOnly cookies)
* **Deployment**: Frontend on Vercel, Backend on Render

## Features

* User **registration, login, logout**
* **CRUD operations** for leads
* Server-side **pagination** and **filters**
* Leads contain fields like name, email, phone, company, status, score, lead value, etc.
* Unauthorized requests return **401**

## Setup

### Backend

1. Go to backend folder
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` with:

   ```
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Start backend:

   ```bash
   npm start
   ```

### Frontend

1. Go to frontend folder
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start frontend:

   ```bash
   npm start
   ```

## Live Demo

* **Frontend**: \[[Vercel URL]](https://lead-management-system-virid.vercel.app/)
* **Backend**: \[[Render URL]](https://lead-management-system-s6lh.onrender.com/)

