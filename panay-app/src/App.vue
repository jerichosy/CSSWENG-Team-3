<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import AdminNav from './components/admin/AdminNav.vue'
</script>

<template>
  <header>  
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <AdminNav />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
