<script>
import axios from 'axios';

export default {
    data() {
        return {
            titulo: '',
            autor: '',
            ano: '',
            successMessage: '',
            errorMessage: ''
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post('http://localhost:5000/api/books', {
                    titulo: this.titulo,
                    autor: this.autor,
                    ano: this.ano,
                    message: this.message
                });

                this.successMessage = response.data.message;
                this.titulo = '';
                this.autor = '';
                this.ano = '';
            } catch (error) {
                this.errorMessage = 'Erro ao enviar mensagem. Tente novamente.';
            }
        }
    }
};
</script>
<template>
    <div class="container">
        <form @submit.prevent="submitForm">
            <h1>Novo Livro</h1>
            <input type="text" v-model="titulo" required placeholder="Titulo">
            <input type="text" v-model="autor" required placeholder="Autor">
            <input type="text" v-model="ano" required placeholder="Ano">
            <button class="enviar">Enviar</button>
        </form>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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