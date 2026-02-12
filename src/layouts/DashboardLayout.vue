<template>
  <div>
    <!-- Top Navbar -->
    <nav class="navbar navbar-dark bg-dark px-4">
      <span class="navbar-brand">POS System</span>
      <button class="btn btn-danger btn-sm" @click="logout">
        Logout
      </button>
    </nav>

    <div class="container-fluid">
      <div class="row">

        <!-- Sidebar -->
        <div class="col-md-2 bg-light vh-100 p-3 border-end shadow-sm">
          <ul class="nav flex-column">

            <li class="nav-item mb-2">
              <router-link to="/dashboard" class="nav-link" active-class="active-link">
                <i class="bi bi-speedometer2 me-2"></i>
                Dashboard
              </router-link>
            </li>

            <li class="nav-item mb-2">
              <router-link to="/dashboard/categories" class="nav-link" active-class="active-link">
                <i class="bi bi-tags me-2"></i>
                Categories
              </router-link>
            </li>

            <li class="nav-item mb-2">
              <router-link to="/dashboard/products" class="nav-link" active-class="active-link">
                <i class="bi bi-box-seam me-2"></i>
                Products
              </router-link>
            </li>

          </ul>
        </div>

        <!-- Main Content -->
        <div class="col-md-10 p-4">
          <router-view />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.nav-link {
  color: #333;
  border-radius: 6px;
  padding: 8px 12px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #e9ecef;
  color: #000;
}

.active-link {
  background-color: #0d6efd;
  color: white !important;
  font-weight: 500;
}
</style>

