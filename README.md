# 🎬 MediaFuZe

A modern **React-based Entertainment Discovery Platform** that lets users explore **movies, TV shows, and anime** in one unified interface.

---

## 📌 Overview

MediaFuZe solves the problem of fragmented content discovery by combining multiple entertainment sources into one clean, fast, and responsive web app.

Instead of switching between platforms, users can:

* Search across categories
* Discover trending content
* View detailed information
* Save items to a personal watchlist

---

## ✨ Features

### 🔍 Unified Search

* Search **movies, TV shows, and anime** in one place
* Debounced input for performance
* Multi-API result merging

### 📈 Trending Sections

* Trending Movies
* Trending TV Shows
* Trending Anime
* Smooth horizontal scroll UI

### 📄 Detailed View

* Ratings, release info, descriptions
* 🎥 Embedded trailers (YouTube)
* 📺 Streaming platforms (via TMDB)

### ❤️ Watchlist

* Add/remove items
* Persistent storage using `localStorage`
* Handles multiple content types

### 🎛 Filtering & UX

* Category-based filtering (movie / tv / anime)
* Clean empty states
* Error handling
* Responsive UI

---

## 🛠 Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** Context API
* **Routing:** React Router
* **API Handling:** Fetch API / Axios

---

## 🔗 APIs Used

* 🎬 TMDB API → Movies & TV Shows
* 🎌 AniList API → Anime

---

## ⚡ Performance & Optimization

* Lazy loading with `React.lazy`
* Debounced search input
* Optimized image loading
* Efficient state updates
* Smooth scrolling UI

---

## 🎨 UI/UX Highlights

* Modern dark theme with neon accents
* Responsive design (mobile + desktop)
* Horizontal scroll sections (Netflix-style)
* Clean card-based layout
* Subtle animations and hover effects

---

## 🧠 Key Learnings

* Handling multiple APIs and merging data
* Managing global state with Context API
* Building scalable component structure
* Implementing real-time search with debounce
* Designing responsive and user-friendly UI

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/mediafuze.git
cd mediafuze
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add environment variables

Create a `.env` file:

```
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### 4️⃣ Run the app

```bash
npm run dev
```

---

## 📸 Screenshots

*Add screenshots here for better presentation*

---

## 🌱 Future Improvements

* Infinite scrolling
* Genre-based filtering UI
* “Watch Now” deep links
* User authentication
* Dark/Light theme toggle

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 🙌 Acknowledgements

* TMDB for movie and TV data
* AniList for anime data

---

⭐ If you like this project, consider giving it a star!
