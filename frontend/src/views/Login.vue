<template>
    <div class="container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button class="login" type="submit">Login</button>
      </form>
      <p>Se não tiveres conta<RouterLink to="/register">Register</RouterLink></p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: this.email,
            password: this.password
          });
          localStorage.setItem('token', response.data.token); // Guardar token no localStorage
          this.$router.push('/'); // Redirecionar para a página de livros
        } catch (err) {
          alert('Erro ao fazer login');
        }
      }
    }
  };
  </script>
  
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
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 24px;
  font-weight: bold;
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

.login {
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

login:hover {
  background: #ccc;
}
</style>