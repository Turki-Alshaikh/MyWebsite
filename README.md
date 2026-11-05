<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<h1 align="center">MyWebsite - Personal Portfolio</h1>

<p align="center">
  A futuristic, dynamic, and fully responsive personal portfolio designed to showcase projects, skills, and professional experience.
</p>

## ✨ Features

- **Modern UI/UX:** Built with a futuristic **Glassmorphism** design, ambient neon glows, and smooth scroll behaviors[cite: 10].
- **Bilingual Support:** Seamless toggling between **Arabic** (RTL) and **English** (LTR) without reloading the page[cite: 10].
- **Dynamic GitHub Integration:** Automatically fetches and displays public repositories directly from the GitHub API, sorted by the latest updates[cite: 10].
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing[cite: 10].
- **Zero-Dependency Architecture:** Developed using vanilla HTML, CSS, and JavaScript, with Tailwind CSS via CDN for rapid UI styling[cite: 10].

## 🛠️ Tech Stack

- **Structure:** HTML5[cite: 10]
- **Styling:** Custom CSS3 & [Tailwind CSS](https://tailwindcss.com/)[cite: 10]
- **Logic & API calls:** Vanilla JavaScript (ES6+)[cite: 10]
- **Icons:** [FontAwesome 6](https://fontawesome.com/)[cite: 10]
- **Fonts:** [Google Fonts](https://fonts.google.com/) ('Cairo' for Arabic, 'Outfit' for English)[cite: 10]

## 📂 Project Structure

```text
├── index.html       # Main HTML structure and content[cite: 10]
├── style.css        # Custom CSS styles, animations, and Glassmorphism effects[cite: 10]
├── script.js        # Core logic, language toggle, and GitHub API integration[cite: 10]
└── README.md        # Project documentation

```

## 🚀 How It Works (Dynamic Fetching)

The portfolio utilizes the public GitHub REST API to dynamically render project cards. It filters out forked repositories and displays the project name, the `About` description directly from the repo, programming language, and star count.

```javascript
// Example of the fetch logic used in script.js
const res = await fetch(`[https://api.github.com/users/Turki-Alshaikh/repos?sort=updated&per_page=20](https://api.github.com/users/Turki-Alshaikh/repos?sort=updated&per_page=20)`);
let repos = await res.json();

```

## 👨‍💻 Author

**Turki Alshaikh**

* IT Specialist & Computer Science Graduate
* Founder of [Mfatihy](https://mfatihy.com/)


* LinkedIn: [Turki--Alshaikh](https://linkedin.com/in/Turki--Alshaikh)


* GitHub: [@Turki-Alshaikh](https://github.com/Turki-Alshaikh)
