# 📅 Event Management Platform

<a id="readme-top"></a>

## 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#triangular_flag_on_post-deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

---

## 📖 About the Project <a id="about-project"></a>

**Event Management Platform** is a full-stack web application that allows users to create, manage, and discover events with real-time updates and authentication. Users can RSVP for events, see live attendee updates, and filter events based on categories, dates, and timeframes.

Backend is implemented as an API-only service, while the frontend is built using React.

## 🛠 Built With <a id="built-with"></a>

### Tech Stack <a id="tech-stack"></a>

#### **Frontend**

- React.js (with React Router)
- Axios (HTTP client)
- Tailwind CSS (UI Styling)
- React Hot Toast (Notifications)
- Socket.IO Client (WebSocket updates)

#### **Backend**

- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- Cloudinary (Image Storage)
- JWT (Authentication)
- Socket.IO (WebSocket Communication)

### Key Features <a id="key-features"></a>

- **User Authentication** (JWT-based login and registration)
- **Create, Edit, and Delete Events** (Only event creators can modify their events)
- **Upload Event Images** (Cloudinary integration)
- **Real-time Attendee Updates** (WebSockets for instant RSVP updates)
- **Event Filtering** (By category, date, and timeframe)
- **Upcoming & Past Events Separation**
- **Fully Responsive UI** (Tailwind CSS)

---

## 🚀 Live Demo <a id="live-demo"></a>

Live demo: [Link](https://event-management-platform-mocha.vercel.app/)

## 💻 Getting Started <a id="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

- **Node.js** (v20)
- **MongoDB** (Local/Atlas)
- **Cloudinary Account**
- **Postman** (for API Testing)

### Setup

Clone this repository:

```bash
  git clone https://github.com/your-username/event-management-platform.git
```

---

### Install

#### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following:

```env
MONGODB_URI=mongodb://localhost:27017/event-platform
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

### Usage <a id="usage"></a>

- Register/Login as a user.
- Create an event with a name, date, location, description, and image.
- Edit or delete events (only the creator can modify their events).
- RSVP to events and see real-time updates.
- Filter events by category, date, and timeframe.

---

### Run Tests <a id="run-tests"></a>

To run backend tests:

```bash
cd backend
npm test
```

To run frontend tests:

```bash
cd frontend
npm test
```

---

## 👥 Authors <a id="authors"></a>

👤 **Tajul Afreen**

- GitHub: [@tajulafreen](https://github.com/tajulafreen)
- LinkedIn: [Tajul Afreen](https://www.linkedin.com/in/tajul-afreen/)

---

## 🔭 Future Features <a id="future-features"></a>

- **[Google Calendar Integration]**
- **[Email Notifications for RSVP]**
- **[Event Categories with Icons]**

---

## 🤝 Contributing <a id="contributing"></a>

Contributions are welcome!

Feel free to check the [issues page](https://github.com/your-username/event-management-platform/issues).

---

## ⭐️ Show your support <a id="support"></a>

If you like this project, please give it a ⭐️!

---

## 🙏 Acknowledgements <a id="acknowledgements"></a>

- **Cloudinary** for image storage
- **MongoDB** for database services
- **Tailwind CSS** for UI styling

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>
