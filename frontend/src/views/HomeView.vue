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
  <div>
    <h1>Lista de Livros</h1>
    <ul>
      <li v-for="book in books" :key="book._id">
        <strong>{{ book.titulo }}</strong> - {{ book.autor }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  color: #333;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>
