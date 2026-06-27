<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
      <button @click="$router.back()" class="text-sm text-gray-500 hover:text-gray-800 transition">
        ← Back
      </button>
      <h1 class="text-xl font-bold text-blue-600">📝 New Note</h1>
    </nav>

    <div class="max-w-2xl mx-auto px-6 py-8">
      <div class="bg-white rounded-2xl shadow-sm p-6">

        <div v-if="error" class="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4">
          {{ error }}
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

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            v-model="content"
            placeholder="Write your note here..."
            rows="8"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        <button
          @click="handleCreate"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : 'Save Note' }}
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes'

const router = useRouter()
const notes = useNotesStore()

const title = ref('')
const content = ref('')
const loading = ref(false)
const error = ref('')

const colors = ['#ffffff', '#fef9c3', '#dcfce7', '#dbeafe', '#fce7f3', '#ede9fe', '#ffedd5']
const selectedColor = ref('#ffffff')

async function handleCreate() {
  if (!title.value || !content.value) {
    error.value = 'Title and content are required'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await notes.createNote(title.value, content.value, selectedColor.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>