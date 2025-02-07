<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';

const router = useRouter();
const isAuthenticated = ref(false);
const userTipo = ref('');

const checkAuth = () => {
  const token = localStorage.getItem('token');
  userTipo.value = localStorage.getItem('userTipo') || ''; 
  isAuthenticated.value = !!token;
};

onMounted(() => {
  checkAuth();
});

const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userTipo');
  
  isAuthenticated.value = false;
  userTipo.value = '';
  
  await nextTick(); 
  
  router.push('/');
};
</script>

<template>
  <header>
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contatos" class="contatos">Contatos</RouterLink>
      </nav>
      <button @click="isAuthenticated ? logout() : router.push('/login')">
        {{ isAuthenticated ? 'Logout' : 'Login' }}
      </button>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  margin-left: 18%;
}
button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 10px;
  padding: 15px 40px;
  font-size: 24px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  backdrop-filter: blur(5px);
  margin-left: 30%;
}

button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.nav{
  font-size: 24px;
}

.contatos{
  margin-left: 30px;
}
</style>
