# 📝 Notes App — Frontend

A full-stack notes application built with Vue.js 3 and Tailwind CSS. Create, organize, and manage your notes with tags, colors, and pin support.

🔗 **Live Demo:** Coming soon

---

## ✨ Features

- 🔐 JWT Authentication (register, login, logout)
- 📝 Create, edit and delete notes
- 🎨 Color-code your notes
- 📌 Pin important notes to the top
- 🏷️ Add tags and filter notes by tag
- 🔍 Search notes by title
- 📊 Character and word count on edit page
- 🗑️ Confirm dialog before deleting
- 🌀 Smooth page transition animations
- 📱 Mobile responsive design
- 👤 Profile dropdown with user info

---

## 🛠️ Built With

- [Vue.js 3](https://vuejs.org/) — Composition API + `<script setup>`
- [Pinia](https://pinia.vuejs.org/) — state management
- [Vue Router](https://router.vuejs.org/) — client side routing + route guards
- [Axios](https://axios-http.com/) — HTTP requests
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Vite](https://vitejs.dev/) — build tool

---

## 🧠 Vue Concepts Practiced

- `ref` and `computed` for reactive state
- `v-model` for two way binding
- `v-for` for rendering lists
- `onMounted` and `onUnmounted` lifecycle hooks
- `props` and `defineProps`
- Pinia store with actions
- Vue Router navigation guards (protected routes)
- `<Transition>` for page animations
- `<style scoped>` vs Tailwind utility classes

---

## 🚀 Getting Started

```bash
# clone the repo
git clone https://github.com/HamdiNur/notes-app-frontend.git

cd notes-app-frontend

npm install

npm run dev
```

Make sure the backend is running on `http://localhost:5000`

👉 Backend repo: [notes-app-backend](https://github.com/HamdiNur/notes-app-backend)

---

## 📁 Project Structure
src/
├── views/
│   ├── LoginView.vue       # split screen login
│   ├── RegisterView.vue    # split screen register
│   ├── DashboardView.vue   # notes grid with search, filter, pin
│   ├── NewNoteView.vue     # create note with color + tags
│   └── NoteDetailView.vue  # edit note
├── stores/
│   ├── auth.js             # JWT token + user state
│   └── notes.js            # notes CRUD actions
├── router/
│   └── index.js            # routes + auth guard
└── App.vue                 # root + page transitions

---

## 🔗 Related

- 🔧 [Backend Repo](https://github.com/HamdiNur/notes-app-backend) — Express + MongoDB + JWT

---

## 👨‍💻 Author

**Hamdi Nur**
[github.com/HamdiNur](https://github.com/HamdiNur)

---

## 📄 License

MIT