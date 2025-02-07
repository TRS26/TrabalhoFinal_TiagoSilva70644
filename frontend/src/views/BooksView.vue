<script>
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      books: []
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/books', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.books = response.data;
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    },
    editUser(bookId) {
      console.log('Editar Livro:', bookId);
    },
    async deleteUser(bookId) {
      if (confirm('Tem a certeza que quer apagar este Livro?')) {
        try { 
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.fetchBooks();
        } catch (error) {
          console.error('Erro ao apagar livro:', error);
        }
      }
    }
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>


<template>
  <div class="container">
    <h1>Lista de Livros</h1>
    <table>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Autor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book._id">
          <td>{{ book.titulo }}</td>
          <td>{{ book.autor }}</td>
          <td>
            <button class="button" @click="editUser(book._id)">Editar</button>
            <button class="button" @click="deleteUser(book._id)">Apagar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>Para adicionar um novo livro clica:<RouterLink to="/admin/books/add">Aqui</RouterLink></p>
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
  font-size: 60px;
  font-weight: bold;
  color: #ffffff;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}


input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
}

.button {
  width: 40%;
  padding: 10px;
  margin: 10px 10px;
  border: none;
  border-radius: 5px;
  background: #ddd;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.button:hover {
  background: #ccc;
}
</style>