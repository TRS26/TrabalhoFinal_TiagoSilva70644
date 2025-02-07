<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="container">
    <h1>Admin Page</h1>
    <div class="cards">
      <RouterLink to="/admin/users" class="card">
        <h2>Gerir Utilizadores</h2>
        <p>Adicionar, editar ou remover utilizadores.</p>
      </RouterLink>
      <RouterLink to="/admin/books" class="card">
        <h2>Gerir Livros</h2>
        <p>Adicionar, editar ou remover Livros.</p>
      </RouterLink>
    </div>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 60px;
  font-weight: bold;
  color: #ffffff;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
}

input,
textarea {
  background: #f5f5f5;
}

.enviar {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background: #ddd;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

enviar:hover {
  background: #ccc;
}
</style>