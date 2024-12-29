# 🏠 Benji Pays Project

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

This repository contains both the frontend and backend for the **Benji Pays** application—a sophisticated mortgage calculator.

## 📂 Table of Contents

- [Project Structure](#project-structure)
- [Author](#author)
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Running the Applications](#running-the-applications)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Key Highlights](#key-highlights)

## 📂 Project Structure

- **`/BenjiPaysBack`**: Backend (NestJS)  
  A robust backend for managing mortgage calculations.  
  See the [Backend README](BenjiPaysBack/README.md) for more details.

- **`/BenjiPaysFront`**: Frontend (Next.js)  
  A dynamic and intuitive user interface for the Benji Pays application.  
  See the [Frontend README](BenjiPaysFront/README.md) for more details.

> You can find more details about each service in the README.md files located in each service folder.

## 👤 Author

- **Name**: Mehrshad Darvish
- **Email**: [mshad.darvish@gmail.com](mailto:mshad.darvish@gmail.com)
- **Phone**: +1 (604) 220-2775
- [LinkedIn](https://www.linkedin.com/in/mehrshad-darvish/)

## 🎥 Project Overview

Watch the video explanation of this project:  
[![Video Preview](https://blog.hansoninc.com/wp-content/uploads/2017/05/YouTube-logo-full_color.png)](https://youtu.be/uEjILEdAlao)

---

## 🛠 Tech Stack

- **Frontend**: Next.js (TypeScript, Tailwind CSS)
- **Backend**: NestJS (Nodejs, TypeScript, Jest)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version)
- **npm** or **yarn**

---

### Installation & Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:MshadDr/Benji-Pays-Services.git
   cd main
   ```

2. Set up the backend:

   ```bash
   cd BenjiPaysBack
   cp .env.example .env
   npm install
   ```

3. Set up the frontend:
   ```bash
   cd ../BenjiPaysFront
   cp .env.example .env
   npm install
   ```

### Running the Applications

#### Start the Backend

Navigate to the backend folder:

```bash
cd BenjiPaysBack
```

Start the server in development mode:

```bash
npm run start:dev
```

#### Start the Frontend

Navigate to the frontend folder:

```bash
cd ../BenjiPaysFront
```

Start the development server:

```bash
npm run dev
```

📄 License  
This project is licensed under the MIT License. See the LICENSE file for details.

🤝 Contributing  
Fork the repository.  
Create a feature branch (git checkout -b feature/amazing-feature).  
Commit your changes (git commit -m 'Add some amazing feature').  
Push the branch (git push origin feature/amazing-feature).  
Open a Pull Request.

🙏 Acknowledgments  
Special thanks to the Benji Pays team for the opportunity to develop this project.

---

### Key Highlights:

1. **Structure Explanation**: Clear breakdown of `BenjiPaysBack` and `BenjiPaysFront` folders.
2. **Unified Workflow**: Instructions on how to set up, run, and test both parts of the project.
3. **Central Reference**: Makes it easy for collaborators to understand the relationship between frontend and backend.

This main README ensures contributors have a seamless starting point for working on the entire project.
