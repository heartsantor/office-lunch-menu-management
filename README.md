
# Office Lunch Menu Management System

I'm Shafiul Alam

its a test project for Software Engineer Internship Opportunity at RoBenDevs


## live link

 - [Front-end Live Link -https://office-lunch-menu-management.vercel.app](https://office-lunch-menu-management.vercel.app)
 - [Backend Live Link -https://office-lunch-menu-management.vercel.app](https://office-lunch-api.vercel.app)
## credentials

**admin**

```bash
email:- admin@admin.com
password:- adminpassword
```
**employee**
```bash
email:- employee6@admin.com
password:- adminpassword

email:- employee7@admin.com
password:- adminpassword
```
## Tech Stack

**Client:** 
- React JS
- MUI
- Redux toolkit
- TypeScript
- Toastify
- Cloudinary

**Server:** 
- NodeJS
- ExpressJS
- PostgreSQL


## Features

- Login (role -employee, admin)
- Registration (role -employee)
---
- **admin**
- |---   view today food menu 
- |---   view previous food menu
- |---   create,delete menu
- |---   view employee choice list
----
- **Employee**
- |---   view today food menu 
- |---   choose today lunch menu


## Run Locally client

Clone the project

```bash
  git clone https://github.com/heartsantor/office-lunch-menu-management.git
```

Go to the project directory

```bash
  cd office-lunch-menu-management
```

Go to the client

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Environment Variables Client

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_URL = http://localhost:5000`

`REACT_APP_CLOUDINARY_CLOUD_NAME = `
`REACT_APP_CLOUDINARY_UPLOAD_PERSET = `


## Run Locally Server

Clone the project

```bash
  git clone https://github.com/heartsantor/office-lunch-menu-management.git
```

Go to the project directory

```bash
  cd office-lunch-menu-management
```

Go to the server

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables server

To run this project, you will need to add the following environment variables to your .env file

`POSTGRES_URL`

`POSTGRES_USER`

`POSTGRES_HOST`

`POSTGRES_PASSWORD`

`POSTGRES_DATABASE`

`JWT_SECRET`

`PORT`

## PostgreSQL Schemas
**Create users table**
```javascript
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);
```

**Create food menu**
```javascript
CREATE TABLE IF NOT EXISTS menus (
    menu_id SERIAL PRIMARY KEY,
    date DATE,
    title VARCHAR(255),
    description TEXT,
    rating DECIMAL(3, 2),
    rating_amount INTEGER,
    price DECIMAL(10, 2),
    category VARCHAR(255),
    img_url VARCHAR(255)
);
```

**Create emplyee choicese**
```javascript
CREATE TABLE user_choices (
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    menuId INTEGER,
    username VARCHAR(255),
    date VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    rating DECIMAL(3, 2),
    rating_amount INTEGER,
    price DECIMAL(10, 2),
    category VARCHAR(255),
    img_url VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (menuId) REFERENCES menus(menu_id) ON DELETE CASCADE
);
```

**Drop Table**
```javascript
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS user_choices CASCADE;
```

**Clean Table**
```javascript
TRUNCATE TABLE users;
TRUNCATE TABLE menus;
TRUNCATE TABLE user_choices;
```
## Feedback

If you have any feedback, please reach out to us at shafiulalam.sra@gmail.com

