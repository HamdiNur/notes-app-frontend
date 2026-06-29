<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
     <!--  -->
<nav class="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between relative">
  <h1 class="text-lg sm:text-xl font-bold text-blue-600">📝 Notes App</h1>
  
  <div class="relative">
    <button
      @click="showDropdown = !showDropdown"
      class="flex items-center gap-2 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-lg transition"
    >
      <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
        {{ auth.user?.name?.charAt(0).toUpperCase() }}
      </div>
      <span class="hidden sm:block text-sm font-medium text-gray-700">{{ auth.user?.name }}</span>
      <span class="text-gray-400 text-xs">{{ showDropdown ? '▲' : '▼' }}</span>
    </button>

    <!-- Dropdown stays the same -->
    <div
      v-if="showDropdown"
      class="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden"
    >
      <div class="px-4 py-3 border-b border-gray-100">
        <p class="text-sm font-semibold text-gray-800">{{ auth.user?.name }}</p>
        <p class="text-xs text-gray-400 mt-0.5">{{ auth.user?.email }}</p>
      </div>
      <div class="px-4 py-3 border-b border-gray-100">
        <p class="text-xs text-gray-400">Total notes</p>
        <p class="text-sm font-bold text-blue-600">{{ notes.notes.length }} notes</p>
      </div>
      <div class="px-2 py-2">
        <button
          @click="handleLogout"
          class="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  </div>
</nav>

    <!-- Main -->
<div class="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <!-- Header -->
  <div class="flex items-center justify-between mb-6">
      <div>
      <h2 class="text-xl sm:text-2xl font-bold text-gray-800">My Notes</h2>
      <p class="text-sm text-gray-500">{{ notes.notes.length }} notes</p>
    </div>
    <RouterLink
      to="/notes/new"
      class="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
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
      <!-- Tag filter -->
<div class="flex gap-2 flex-wrap mb-6">
  <button
    @click="selectedTag = ''"
    :class="selectedTag === '' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'"
    class="text-xs px-3 py-1.5 rounded-full border border-gray-200 transition"
  >
    All
  </button>
  <button
    v-for="tag in allTags"
    :key="tag"
    @click="selectedTag = tag"
    :class="selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'"
    class="text-xs px-3 py-1.5 rounded-full border border-gray-200 transition"
  >
    {{ tag }}
  </button>
</div>

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
<!-- Notes grid -->
      <div v-else class="space-y-6">
        <!-- Pinned section -->
        <div v-if="filtered.some(n => n.pinned)">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">📌 Pinned</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="note in filtered.filter(n => n.pinned)" :key="note._id"
              :style="{ background: note.color || '#ffffff' }"
              class="rounded-xl p-5 shadow-sm border border-yellow-200 hover:shadow-md transition"
            >
              <div class="flex items-start justify-between mb-2">
                <h3 @click="$router.push('/notes/' + note._id)"
                  class="font-semibold text-gray-800 truncate cursor-pointer hover:text-blue-600 flex-1">
                  {{ note.title }}
                </h3>
        <button @click="notes.pinNote(note._id, true)" 
  class="ml-2 text-gray-300 hover:text-yellow-400 text-base leading-none flex-shrink-0 transition">📌</button>
             </div>
              <p @click="$router.push('/notes/' + note._id)"
                class="text-sm text-gray-500 line-clamp-3 cursor-pointer mb-4">
                {{ note.content }}
              </p>
              <div class="flex gap-1 flex-wrap mb-2">
       <span
          v-for="tag in note.tags"
          :key="tag"
       class="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
  >
    {{ tag }}
  </span>
</div>

              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-400">{{ new Date(note.createdAt).toLocaleDateString() }}</span>
                <div class="flex gap-2">
                  <button @click="$router.push('/notes/' + note._id)"
                    class="text-xs bg-white/70 text-blue-500 px-3 py-1 rounded-lg hover:bg-white transition">Edit</button>
                  <button @click="handleDelete(note._id)"
                    class="text-xs bg-white/70 text-red-400 px-3 py-1 rounded-lg hover:bg-white transition">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Other notes -->
        <div>
          <p v-if="filtered.some(n => n.pinned)" class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Others</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="note in filtered.filter(n => !n.pinned)" :key="note._id"
              :style="{ background: note.color || '#ffffff' }"
              class="rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div class="flex items-start justify-between mb-2">
                <h3 @click="$router.push('/notes/' + note._id)"
                  class="font-semibold text-gray-800 truncate cursor-pointer hover:text-blue-600 flex-1">
                  {{ note.title }}
                </h3>
                <button @click="notes.pinNote(note._id, true)" class="ml-2 text-gray-300 hover:text-yellow-400 text-lg transition">📌</button>
              </div>
              <p @click="$router.push('/notes/' + note._id)"
                class="text-sm text-gray-500 line-clamp-3 cursor-pointer mb-4">
                {{ note.content }}
              </p>
              <div v-if="note.tags?.length" class="flex gap-1 flex-wrap mb-4">
  <span
    v-for="tag in note.tags"
    :key="tag"
    class="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
  >
    {{ tag }}
  </span>
</div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-400">{{ new Date(note.createdAt).toLocaleDateString() }}</span>
                <div class="flex gap-2">
                  <button @click="$router.push('/notes/' + note._id)"
                    class="text-xs bg-white/70 text-blue-500 px-3 py-1 rounded-lg hover:bg-white transition">Edit</button>
                  <button @click="handleDelete(note._id)"
                    class="text-xs bg-white/70 text-red-400 px-3 py-1 rounded-lg hover:bg-white transition">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete confirm modal -->
<div v-if="showConfirm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  <div class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
    <h3 class="text-lg font-bold text-gray-800 mb-2">Delete note?</h3>
    <p class="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
    <div class="flex gap-3">
      <button
        @click="showConfirm = false"
        class="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
      >
        Cancel
      </button>
      <button
        @click="confirmDelete"
        class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotesStore } from '../stores/notes'

const router = useRouter()
const auth = useAuthStore()
const notes = useNotesStore()
const search = ref('')
const showDropdown = ref(false)
const selectedTag = ref('')
const showConfirm = ref(false)
const noteToDelete = ref(null)

const allTags = computed(() => {
  const tagSet = new Set()
  notes.notes.forEach(n => {
    console.log('note tags:', n.title, n.tags)
    n.tags?.forEach(t => tagSet.add(t))
  })
  return [...tagSet]
})
function handleClickOutside(e) {
  if (!e.target.closest('.relative')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  notes.fetchNotes()
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const filtered = computed(() => {
  const result = notes.notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesTag = selectedTag.value ? n.tags?.includes(selectedTag.value) : true
    return matchesSearch && matchesTag
  })
  return [
    ...result.filter(n => n.pinned),
    ...result.filter(n => !n.pinned)
  ]
})

function handleDelete(id) {
  noteToDelete.value = id
  showConfirm.value = true
}

async function confirmDelete() {
  await notes.deleteNote(noteToDelete.value)
  showConfirm.value = false
  noteToDelete.value = null
}
function handleLogout() {
  auth.logout()
  router.push('/login')
}


</script>