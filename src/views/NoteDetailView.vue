<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
      <button
        @click="$router.back()"
        class="text-sm text-gray-500 hover:text-gray-800 transition"
      >
        ← Back
      </button>
      <h1 class="text-xl font-bold text-blue-600">📝 Edit Note</h1>
    </nav>

    <div class="max-w-2xl mx-auto px-6 py-8">
      <div class="bg-white rounded-2xl shadow-sm p-6">

        <div v-if="error" class="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-50 text-green-600 text-sm p-3 rounded-lg mb-4">
          Note updated successfully!
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            v-model="title"
            type="text"
            placeholder="Note title..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Color</label>
          <div class="flex gap-2">
            <button
              v-for="c in colors"
              :key="c"
              @click="selectedColor = c"
              :style="{ background: c }"
              :class="selectedColor === c ? 'ring-2 ring-offset-2 ring-blue-500' : ''"
              class="w-7 h-7 rounded-full border border-gray-200 transition"
            ></button>
          </div>
        </div>
        <div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
  <div class="flex gap-2 flex-wrap mb-2">
    <span
      v-for="tag in selectedTags"
      :key="tag"
      class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full flex items-center gap-1"
    >
      {{ tag }}
      <button @click="removeTag(tag)" class="hover:text-red-500 transition">×</button>
    </span>
  </div>
  <div class="flex gap-2">
    <input
      v-model="tagInput"
      @keydown.enter.prevent="addTag"
      type="text"
      placeholder="Type a tag and press Enter..."
      class="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      @click="addTag"
      class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
    >
      Add
    </button>
  </div>
</div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            v-model="content"
            placeholder="Write your note here..."
            rows="8"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        <!-- Character count -->
     <p class="text-xs text-gray-400 text-right mb-4">
  {{ content.length }} characters · {{ content.trim() ? content.trim().split(/\s+/).length : 0 }} words
</p>

        <div class="flex gap-3">
          <button
            @click="handleUpdate"
            :disabled="loading"
            class="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {{ loading ? 'Saving...' : 'Update Note' }}
          </button>
          <button
            @click="handleDelete"
            class="px-4 py-2 bg-red-50 text-red-500 rounded-lg font-medium hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes'

const route = useRoute()
const router = useRouter()
const notes = useNotesStore()

const title = ref('')
const content = ref('')
const selectedColor = ref('#ffffff')
const selectedTags = ref([])
const tagInput = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const colors = ['#ffffff', '#fef9c3', '#dcfce7', '#dbeafe', '#fce7f3', '#ede9fe', '#ffedd5']

onMounted(() => {
  const note = notes.notes.find(n => n._id === route.params.id)
  if (note) {
    title.value = note.title
    content.value = note.content
    selectedColor.value = note.color || '#ffffff'
    selectedTags.value = note.tags ? [...note.tags] : []
  } else {
    router.push('/dashboard')
  }
})

function addTag() {
  const t = tagInput.value.trim().toLowerCase()
  if (t && !selectedTags.value.includes(t)) {
    selectedTags.value.push(t)
  }
  tagInput.value = ''
}

function removeTag(tag) {
  selectedTags.value = selectedTags.value.filter(t => t !== tag)
}

async function handleUpdate() {
  if (!title.value || !content.value) {
    error.value = 'Title and content are required'
    return
  }
  loading.value = true
  error.value = ''
  success.value = false
  try {
    await notes.updateNote(route.params.id, title.value, content.value, selectedColor.value, selectedTags.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}

async function handleDelete() {
  await notes.deleteNote(route.params.id)
  router.push('/dashboard')
}
</script>