# Volunteer Management System

### Live Link: [Volunteer Management System](https://volunteer-management-99706.web.app)

This project is built using **React with Vite** for high performance and faster development. Below is a detailed overview of the technologies and tools used in the project.

## Overview
The **Volunteer Management System** is designed to streamline the process of managing volunteers. It allows users to sign up, browse volunteer opportunities, and participate in different events. The system ensures smooth management and tracking of volunteer activities.

## Key Features

- **Vite**: A fast and modern frontend build tool.
- **React**: A JavaScript library for building user interfaces.
- **MongoDB**: A NoSQL database for storing and managing data.
- **Node.js & Express.js**: Backend development framework for RESTful APIs.
- **React Router**: For efficient routing and navigation.
- **Axios**: For handling HTTP requests to the backend.
- **SweetAlert2**: Elegant alert messages and confirmation dialogs.
- **JWT Authentication**: Secure user authentication and authorization.
- **CRUD Operations**: Fully functional backend to manage volunteers.
- **Responsive UI**: Ensures usability across all devices.

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-repo.git
```

### 2. Navigate to the project directory
```bash
cd volunteer-management-system
```

### 3. Install dependencies
#### Frontend:
```bash
cd client
npm install
```

#### Backend:
```bash
cd server
npm install
```

### 4. Set up environment variables
Create a `.env` file in the `server/` directory and add the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 5. Start the development server
#### Frontend:
```bash
cd client
npm run dev
```

#### Backend:
```bash
cd server
npm run dev
```

## Folder Structure
```
├── client             # Frontend (React)
│   ├── src
│   │   ├── components  # Reusable components
│   │   ├── pages       # Application pages
│   │   ├── hooks       # Custom React hooks
│   │   ├── App.jsx     # Main application component
│   │   ├── main.jsx    # Entry point
├── server             # Backend (Node.js & Express.js)
│   ├── models         # Database models
│   ├── routes         # API routes
│   ├── controllers    # Business logic
│   ├── config         # Configuration files
│   ├── index.js       # Server entry point
├── package.json       # Project dependencies
└── README.md          # Documentation
```

## Backend API Endpoints
| Method | Endpoint          | Description                     |
|--------|------------------|---------------------------------|
| GET    | /api/volunteers  | Fetch all volunteers           |
| POST   | /api/volunteers  | Add a new volunteer            |
| GET    | /api/events      | Fetch all events               |
| POST   | /api/events      | Add a new event                |
| POST   | /api/auth/login  | User login                      |
| POST   | /api/auth/signup | User registration              |

## Deployment

### 1. Build the project for production:
```bash
npm run build
```

### 2. Deploy to Netlify, Vercel, or another hosting platform
- **Frontend**: Deploy the `client/dist` folder to Netlify or Vercel.
- **Backend**: Deploy the `server/` folder to Render, Heroku, or another backend hosting service.

## Contribution Guidelines

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make changes and commit:
   ```bash
   git commit -m 'Add feature-name'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License
This project is licensed under the **MIT License**.

---
For any questions or issues, please contact [your-email@example.com].

