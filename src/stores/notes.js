import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])
  const loading = ref(false)

  function getHeaders() {
    const auth = useAuthStore()
    return { Authorization: `Bearer ${auth.token}` }
  }

  async function fetchNotes() {
    loading.value = true
    const res = await axios.get('http://localhost:5000/api/notes', { headers: getHeaders() })
    notes.value = res.data
    loading.value = false
  }


async function pinNote(id, pinned) {
  const res = await axios.put(
    `http://localhost:5000/api/notes/${id}`,
    { pinned },
    { headers: getHeaders() }
  )
  const index = notes.value.findIndex(n => n._id === id)
  if (index !== -1) notes.value[index] = res.data
}
async function createNote(title, content, color = '#ffffff', tags = []) {
  const res = await axios.post('http://localhost:5000/api/notes',
    { title, content, color, tags },
    { headers: getHeaders() }
  )
  notes.value.unshift(res.data)
}


  async function deleteNote(id) {
    await axios.delete(`http://localhost:5000/api/notes/${id}`, { headers: getHeaders() })
    notes.value = notes.value.filter(n => n._id !== id)
  }
async function updateNote(id, title, content, color = '#ffffff', tags = []) {
  const res = await axios.put(
    `http://localhost:5000/api/notes/${id}`,
    { title, content, color, tags },
    { headers: getHeaders() }
  )
  const index = notes.value.findIndex(n => n._id === id)
  if (index !== -1) notes.value[index] = res.data
}
  return { notes, loading, fetchNotes, createNote, deleteNote, updateNote ,pinNote}
})

