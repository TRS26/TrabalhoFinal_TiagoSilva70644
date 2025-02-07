<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const books = ref([]);

const fetchBooks = async () => {
  try {
    const response = await api.get('/books');
    books.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
  }
};

onMounted(fetchBooks);
</script>

<template>
  <div class="container">
    <h1>Lista de Livros</h1>
    <ul>
      <li v-for="book in books" :key="book._id">
        <strong>{{ book.titulo }}</strong> - {{ book.autor }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  margin-top: 5%;
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
h1 {
  color: #ffffff;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  color: black;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>
