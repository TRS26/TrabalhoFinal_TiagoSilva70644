<script>
import axios from 'axios';

export default {
  data() {
    return {
      nome: '',
      email: '',
      password: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          nome: this.nome,
          email: this.email,
          password: this.password
        });

        this.successMessage = 'Registo bem-sucedido!';
        localStorage.setItem('token', response.data.token);
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.response?.data?.msg || 'Erro no registo.';
      }
    }
  }
};
</script>
<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
    <input type="name" placeholder="Name" v-model="nome" required />
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button class="enviar" type="submit">Register</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>Se tiveres conta<RouterLink to="/login">Login</RouterLink>
    </p>
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