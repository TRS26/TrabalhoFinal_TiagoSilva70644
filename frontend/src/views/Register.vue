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
        localStorage.setItem('token', response.data.token); // Guarda o token JWT no armazenamento local
        this.$router.push('/'); // Redireciona após o registo
      } catch (error) {
        this.errorMessage = error.response?.data?.msg || 'Erro no registo.';
      }
    }
  }
};
</script>
<template>
  <div class="container">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
    <input type="name" placeholder="Name" v-model="nome" required />
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button class="login" type="submit">Register</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>Se tiveres conta<RouterLink to="/login">Login</RouterLink>
    </p>
  </div>
</template>