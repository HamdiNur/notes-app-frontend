<template>
  <div class="min-h-screen flex">
    <!-- Left side -->
    <div class="hidden lg:flex flex-col justify-between w-1/2 bg-blue-600 p-12">
      <div>
        <h1 class="text-white text-3xl font-bold">📝 Notes App</h1>
        <p class="text-blue-200 text-sm mt-1">Your thoughts, organized.</p>
      </div>

      <div class="space-y-6">
        <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <p class="text-white text-lg font-semibold mb-1">Stay organized</p>
          <p class="text-blue-200 text-sm">Create, pin and color-code your notes to keep everything in order.</p>
        </div>
        <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <p class="text-white text-lg font-semibold mb-1">Access anywhere</p>
          <p class="text-blue-200 text-sm">Your notes are saved securely in the cloud, accessible from any device.</p>
        </div>
        <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <p class="text-white text-lg font-semibold mb-1">Private & secure</p>
          <p class="text-blue-200 text-sm">Each account is protected with JWT authentication and encrypted passwords.</p>
        </div>
      </div>

      <p class="text-blue-300 text-xs">© 2026 Notes App by Hamdi Nur</p>
    </div>

    <!-- Right side -->
    <div class="flex-1 flex items-center justify-center bg-gray-50 px-6">
      <div class="w-full max-w-md">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800">Create account 🚀</h2>
          <p class="text-gray-500 text-sm mt-1">Start writing your notes today</p>
        </div>

        <div v-if="error" class="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4">
          {{ error }}
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="name"
              type="text"
              placeholder="Hamdi Nur"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            @click="handleRegister"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 mt-2"
          >
            {{ loading ? 'Creating account...' : 'Register' }}
          </button>
        </div>

        <p class="text-sm text-center text-gray-500 mt-6">
          Already have an account?
          <RouterLink to="/login" class="text-blue-600 font-medium hover:underline">Login</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

async function handleRegister() {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    auth.setAuth(res.data.token, res.data.user)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>