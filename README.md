# PET CARE API

A Website for managing dog grooming appointments, including user registration, login, and appointment scheduling.

## Getting Started

Follow these steps to set up and run the Dog Grooming Appointment System on your local machine.

1. Open your terminal in VS Code
2. git clone https://github.com/patrikimaru/PetCare-Admin.git
3. cd PetCare-Admin
4. npm install
5. npm run dev

## User Routes

1. **Register a new user**
   - **Endpoint:** `POST http://localhost:3001/api/users/register`
   - **Description:** Register a new user.
   - **Request Body:**
     ```json
     {
       "username": "user",
       "email": "user@gmail.com",
       "phoneNumber": "09123456789",
       "password": "user_password"
     }
     ```
   - **Response:**
     ```json
     {
       "_id": "user_id",
       "username": "user",
       "email": "user@gmail.com",
       "phoneNumber": "09123456789",
       "role": "user"
     }
     ```

2. **Register a new admin**
   - **Endpoint:** `POST http://localhost:3001/api/users/admin/register`
   - **Description:** Register a new admin.
   - **Request Body:**
     ```json
     {
       "username": "admin",
       "email": "admin123@gmail.com",
       "phoneNumber": "09123456789",
       "password": "admin_password"
     }
     ```
   - **Response:**
     ```json
     {
       "_id": "admin_id",
       "username": "admin",
       "email": "admin123@gmail.com",
       "phoneNumber": "09123456789",
       "role": "admin"
     }
     ```

3. **Login**
   - **Endpoint:** `POST http://localhost:3001/api/users/login`
   - **Description:** Login with existing user credentials.
   - **Request Body:**
     ```json
     {
       "email": "user@gmail.com",
       "password": "user_password"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Login successful.",
       "token": "user_token",
       "userId": "user_id",
       "role": "user"
     }
     ```

4. **Get all users**
   - **Endpoint:** `GET http://localhost:3001/api/users`
   - **Description:** Get all registered users.

5. **Get one specific user**
   - **Endpoint:** `GET http://localhost:3001/api/users/:id`
   - **Description:** Get information about a specific user.

6. **Update user info**
   - **Endpoint:** `PUT http://localhost:3001/api/users/:id`
   - **Description:** Update information for a specific user.
   - **Request Body:**
     ```json
     {
       "username": "updated_user",
       "email": "updated_user@gmail.com",
       "phoneNumber": "09123456789",
       "password": "updated_password"
     }
     ```

7. **Delete all users**
   - **Endpoint:** `DELETE http://localhost:3001/api/users`
   - **Description:** Delete all registered users.


## Appointment Routes

1. **Create a new appointment**
   - **Endpoint:** `POST http://localhost:3001/api/appointments/`
   - **Description:** Create a new appointment.
   - **Request Body:**
     ```json
     {
       "dogCategory": "small",
       "service": "basic",
       "schedule": "2023-12-29T06:42:00.000Z",
       "price": 500,
       "status": "unconfirmed",
       "user": "user_id"
     }
     ```
   - **Response:**
     ```json
     {
       "_id": "appointment_id",
       "dogCategory": "small",
       "service": "basic",
       "schedule": "2023-12-29T06:42:00.000Z",
       "price": 500,
       "status": "unconfirmed",
       "user": {
         "_id": "user_id",
         "username": "user",
         "email": "user@gmail.com",
         "phoneNumber": "09123456789",
         "role": "user"
       }
     }
     ```

2. **Get all appointments**
   - **Endpoint:** `GET http://localhost:3001/api/appointments/`
   - **Description:** Get all appointments.

3. **Get unconfirmed appointments**
   - **Endpoint:** `GET http://localhost:3001/api/appointments/unconfirmed`
   - **Description:** Get all unconfirmed appointments.

4. **Get confirmed appointments**
   - **Endpoint:** `GET http://localhost:3001/api/appointments/confirmed`
   - **Description:** Get all confirmed appointments.

5. **Get done appointments**
   - **Endpoint:** `GET http://localhost:3001/api/appointments/done`
   - **Description:** Get all done appointments.

6. **Confirm appointment**
   - **Endpoint:** `PUT http://localhost:3001/api/appointments/confirm/:id`
   - **Description:** Confirm an appointment.

7. **Mark appointment as done**
   - **Endpoint:** `PUT http://localhost:3001/api/appointments/done/:id`
   - **Description:** Mark an appointment as done.

8. **Delete all appointments**
   - **Endpoint:** `DELETE http://localhost:3001/api/appointments/`
   - **Description:** Delete all appointments.


## Admin Model
```json
{
  "_id": "658e6592537e2dbed0626151",
  "username": "admin",
  "email": "admin123@gmail.com",
  "phoneNumber": "09123456789",
  "password": "$2b$10$jhxMz.gXkzHarCS0T1r5wOb.PX7a745F4VACJhyBTT1LpdOZgKliW",
  "role": "admin",
},
```

## User Model
```json
{
  "_id": "658e6a43a7462db6a67e47a6",
  "username": "user",
  "email": "user@gmail.com",
  "phoneNumber": "09123456789",
  "password": "$2b$10$REx9RO/FNVEUGjB67Gnnr.sg0Ue4Zys7GOjDFMvK3iK17JvHQP2W.",
  "role": "user",
},
```

## Appointments Model
```json

{
  "_id": "658e6a6fa7462db6a67e47aa",
  "dogCategory": "small",
  "service": "basic",
  "schedule": "2023-12-29T06:42:00.000Z",
  "price": 500,
  "status": "done",
  "user": {
    "_id": "658e6a43a7462db6a67e47a6",
    "username": "user",
    "email": "user@gmail.com",
    "phoneNumber": "09123456789",
    "password": "$2b$10$REx9RO/FNVEUGjB67Gnnr.sg0Ue4Zys7GOjDFMvK3iK17JvHQP2W.",
    "role": "user",
  },
},
```

