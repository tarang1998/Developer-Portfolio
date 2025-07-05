# Tarang Nair - Software Developer Portfolio

A modern, responsive portfolio website showcasing my skills, experience, and projects. Built with React and featuring real-time online user tracking, dynamic theming, and elegant animations.

**🌐 Live Demo:** [tarangnair.com](https://tarangnair.com/)

## 🚀 Features

- **Real-time Online Tracking** - Shows current visitors using Firebase Firestore
- **Dynamic Theming** - Light/Dark mode with smooth transitions
- **Responsive Design** - Optimized for all devices and screen sizes
- **Interactive Project Cards** - Click to view GitHub repositories
- **GitHub Integration** - Live contribution graph and project showcase
- **Smooth Animations** - Fade, flip, and reveal effects using React Reveal
- **Currently Working Section** - Real-time updates of ongoing projects
- **Skills Visualization** - Interactive tech stack with icons
- **Contact Integration** - Multiple social media and professional links

## 🛠️ Technical Stack

### **Frontend**
- **[React](https://reactjs.org/)** - Modern UI library for building interactive interfaces
- **[Material-UI](https://material-ui.com/)** - React components for faster development
- **[Styled Components](https://styled-components.com/)** - CSS-in-JS for theming and styling
- **[React Router](https://reactrouter.com/)** - Client-side routing

### **Backend & Database**
- **[Firebase](https://firebase.google.com/)** - Backend-as-a-Service
  - **Firestore** - NoSQL database for project data and real-time presence
  - **Authentication** - User management (if needed)
- **[React Redux Firebase](https://react-redux-firebase.com/)** - React bindings for Firebase

### **Animations & UI**
- **[React Reveal](https://www.react-reveal.com/)** - Scroll animations and transitions
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[Iconify](https://iconify.design/)** - Unified icon framework

### **Development Tools**
- **[Create React App](https://create-react-app.dev/)** - React development environment
- **[npm](https://www.npmjs.com/)** - Package manager

## 📦 Installation

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn package manager

### **Setup Instructions**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Firebase** (Optional - for online tracking)
   - Create a Firebase project
   - Enable Firestore database
   - Update `src/config/firebaseConfig.js` with your Firebase config

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Customization

### **Personal Information**
- Update `src/react_portfolio_1/utils/portfolioData.js` with your details
- Modify project data in `src/react_portfolio_1/utils/projectData.js`
- Update experience in `src/react_portfolio_1/utils/experienceData.js`

### **Styling**
- Theme colors in `src/react_portfolio_1/utils/themeData.js`
- CSS variables in `src/react_portfolio_1/reactPortfolio.css`
- Component-specific styles in respective `.css` files

### **Content Sections**
- **Home**: `src/react_portfolio_1/pages/home/Home.js`
- **Projects**: `src/react_portfolio_1/pages/projects/projects.js`
- **Experience**: `src/react_portfolio_1/pages/workExperience/workExperience.js`
- **Education**: `src/react_portfolio_1/pages/education/education.js`

## 📱 Sections

- **🏠 Home** - Introduction, skills, and currently working on
- **💼 Experience** - Work history and achievements
- **🎓 Education** - Academic background and certifications
- **🚀 Projects** - Portfolio of completed projects
- **💻 Programming** - Code solutions and algorithms

## 🔧 Configuration

### **Firebase Setup** (for online tracking)
1. Create a Firebase project
2. Enable Firestore database
3. Set security rules for `onlineUsers` collection
4. Update configuration in `src/config/firebaseConfig.js`

### **Deployment**
- **GitHub Pages**: `npm run deploy`
- **Netlify**: Connect repository and build
- **Vercel**: Import project and deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[saadpasta/developerFolio](https://github.com/saadpasta/developerFolio)** - Original inspiration and base structure
- **[unDraw](https://undraw.co/illustrations)** - Beautiful illustrations
- **[Skill Icons](https://icon-sets.iconify.design/skill-icons/)** - Technology icons

## 📞 Contact

- **Website**: [tarangnair.com](https://tarangnair.com/)
- **LinkedIn**: [Tarang Nair](https://www.linkedin.com/in/tarang-nair-752aa8179/)
- **GitHub**: [tarang1998](https://github.com/tarang1998)
- **Email**: tarangnair98@gmail.com

---

⭐ **Star this repository if you found it helpful!**