<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 class="text-xl font-bold text-blue-600">📝 Notes App</h1>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-500">Hey, {{ auth.user?.name }}</span>
        <button
          @click="handleLogout"
          class="text-sm bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>

    <!-- Main -->
    <div class="max-w-4xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">My Notes</h2>
          <p class="text-sm text-gray-500">{{ notes.notes.length }} notes</p>
        </div>
        <RouterLink
          to="/notes/new"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          + New Note
        </RouterLink>
      </div>

      <!-- Search -->
      <input
        v-model="search"
        type="text"
        placeholder="🔍 Search notes..."
        class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Loading -->
      <div v-if="notes.loading" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="n in 4" :key="n" class="bg-white rounded-xl h-36 animate-pulse"></div>
      </div>

      <!-- Empty -->
      <div v-else-if="filtered.length === 0" class="text-center py-16 text-gray-400">
        <p class="text-4xl mb-3">📭</p>
        <p class="text-lg font-medium">No notes found</p>
        <p class="text-sm">Create your first note to get started</p>
      </div>

      <!-- Notes grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="note in filtered"
          :key="note._id"
          @click="$router.push('/notes/' + note._id)"
          class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
        >
          <h3 class="font-semibold text-gray-800 mb-2 truncate">{{ note.title }}</h3>
          <p class="text-sm text-gray-500 line-clamp-3">{{ note.content }}</p>
          <div class="flex items-center justify-between mt-4">
            <span class="text-xs text-gray-400">{{ new Date(note.createdAt).toLocaleDateString() }}</span>
            <button
              @click.stop="handleDelete(note._id)"
              class="text-xs text-red-400 hover:text-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotesStore } from '../stores/notes'

const router = useRouter()
const auth = useAuthStore()
const notes = useNotesStore()
const search = ref('')

const filtered = computed(() => {
  return notes.notes.filter(n =>
    n.title.toLowerCase().includes(search.value.toLowerCase())
  )
})

async function handleDelete(id) {
  await notes.deleteNote(id)
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}

onMounted(() => {
  notes.fetchNotes()
})
</script>