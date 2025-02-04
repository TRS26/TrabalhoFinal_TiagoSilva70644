<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contatos">Contatos</RouterLink>
      </nav>
              <!-- Botão de Login / Logout -->
              <button @click="isAuthenticated ? logout() : router.push('/login')">
        {{ isAuthenticated ? 'Logout' : 'Login' }}
      </button>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center; /* Centraliza o conteúdo */
  align-items: center;
  background-color: transparent; /* Fundo transparente */
  padding: 20px;
  position: fixed; /* Fixa o header no topo */
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000; /* Garante que o header fique acima de outros elementos */
}
</style>
