<template>
  <div class="login-page d-flex align-items-center justify-content-center">
    <div class="card shadow login-card">
      <div class="card-body">
        <h4 class="text-center mb-4">POS Login</h4>

        <form @submit.prevent="login">
          <!-- Email -->
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              placeholder="Enter email"
              v-model="form.email"
            />
            <div class="invalid-feedback text-start">
              {{ errors.email }}
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label class="form-label">Password</label>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                placeholder="Enter password"
                v-model="form.password"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
            <div class="invalid-feedback d-block text-start">
              {{ errors.password }}
            </div>
          </div>

          <!-- Login Button -->
          <button
            class="btn btn-primary w-100"
            type="submit"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-2"
            ></span>
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Toast -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div
        class="toast show align-items-center text-white"
        :class="toast.type"
        v-if="toast.show"
      >
        <div class="d-flex">
          <div class="toast-body">
            {{ toast.message }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            @click="toast.show = false"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const showPassword = ref(false)

const toast = ref({
  show: false,
  message: '',
  type: 'bg-success' // bg-success | bg-danger
})

function showToast(message, type = 'bg-success') {
  toast.value = {
    show: true,
    message,
    type
  }

  setTimeout(() => {
    toast.value.show = false
  }, 1000)
}

function validateForm() {
  let valid = true
  errors.value.email = ''
  errors.value.password = ''

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!form.value.email) {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Enter a valid email'
    valid = false
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required'
    valid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Minimum 6 characters'
    valid = false
  }

  return valid
}

async function login() {
  if (!validateForm()) return

  loading.value = true

  try {
    const res = await api.post('/login', form.value)

    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))

    showToast('Login successful')
    form.value.email = '';
    form.value.password = '';

    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)

  } catch (err) {
    showToast(
      err.response?.data?.message || 'Invalid email or password',
      'bg-danger'
    )
    form.value.email = '';
    form.value.password = '';
  } finally {
    loading.value = false
        form.value.email = '';
        form.value.password = '';
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f4f6f9;
}

.login-card {
  width: 360px;
}
</style>