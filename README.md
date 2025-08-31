# QuestMove - Interactive Quest Platform

QuestMove is a full-stack web application that combines interactive quests with geolocation features. Users can explore, create, and complete location-based quests with multiple checkpoints.

## 🌟 Features

### User Features

* **User Authentication** - Registration, login, and JWT-based authentication
* **Quest Exploration** - Browse available quests on an interactive map
* **Quest Completion** - Solve puzzles and answer questions at each checkpoint
* **Progress Tracking** - Track completed quests and achievements
* **User Profiles** - View quest history and progress

### Quest Creation

* **Interactive Map Interface** - Drag and drop markers to set quest locations
* **Multi-checkpoint Quests** - Create quests with multiple stages
* **Custom Content** - Add questions, tasks, and answers for each checkpoint
* **Role-based Access** - Admin/moderator permissions for quest creation

### Technical Features

* **Responsive Design** - Works on desktop and mobile devices
* **Real-time Map Integration** - Powered by Leaflet with custom markers
* **State Management** - Redux Toolkit for efficient state handling
* **API Integration** - RESTful API with authentication interceptors
* **Database Persistence** - PostgreSQL with Prisma ORM

## 🛠️ Tech Stack

### Frontend

* React 18 with TypeScript
* Redux Toolkit for state management
* React Router for navigation
* React Hook Form for form handling
* Leaflet for map functionality
* Axios for API requests
* React Icons for UI icons

### Backend

* Node.js with Express.js
* PostgreSQL database
* Prisma ORM
* JWT authentication
* Nodemailer for email services
* Bcrypt for password hashing
* Express Validator for input validation

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* PostgreSQL database
* npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lalkazaurus/questMove.git
cd questmove

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Set up environment variables

**Server `.env` file:**

```env
DATABASE_URL="postgresql://username:password@localhost:5432/questmove"
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
PORT=5000
```

**Client `.env` file:**

```env
VITE_SERVER_URL=http://localhost:5000
```

### Set up the database

```bash
cd server
npx prisma generate
npx prisma db push
```

### Run the application

```bash
# Start the server
cd server
npm run dev

# Start the client (in a new terminal)
cd client
npm run dev
```

Access the application:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```
questmove/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── layout/         # Layout components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   ├── types/          # TypeScript types
│   │   └── http.ts         # Axios configuration
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── prisma/         # Database schema and client
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── index.ts        # Server entry point
│   └── package.json
└── README.md
```

## 🎮 Usage

* **Register/Login** - Create an account or login to access all features
* **Browse Quests** - View available quests on the main map
* **Start a Quest** - Click on a quest marker to begin
* **Complete Checkpoints** - Answer questions at each location
* **Track Progress** - View your completed quests in your profile
* **Create Quests** - *(Admin/Moderator)* Use the quest creation interface to design new adventures

## 🔧 API Endpoints

### Authentication

* `POST /auth/registration` - User registration
* `POST /auth/login` - User login
* `POST /auth/logout` - User logout
* `GET /auth/refresh` - Refresh access token
* `GET /auth/users` - Get all users (admin only)

### Quests

* `GET /` - Get all quests
* `POST /` - Create a new quest (admin/moderator)
* `GET /:id` - Get quest by ID

### Profile

* `GET /profile/quests/:userId` - Get user's quest progress
* `POST /profile/complete` - Mark quest as completed

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

* Yehor Zarembytskyi - Initial work

## 🙏 Acknowledgments

* Leaflet for mapping functionality
* Redux Toolkit for state management
* Prisma for database ORM
* React community for excellent components and libraries
