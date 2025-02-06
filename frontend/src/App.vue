<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';

const router = useRouter();
const isAuthenticated = ref(false);
const userTipo = ref('');

// Função para verificar se o utilizador está autenticado
const checkAuth = () => {
  const token = localStorage.getItem('token');
  userTipo.value = localStorage.getItem('userTipo') || ''; 
  isAuthenticated.value = !!token; // Converte para booleano
};

// Chama checkAuth quando o componente é montado
onMounted(() => {
  checkAuth();
});

// Logout
const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userTipo');
  
  // Atualiza os estados de autenticação
  isAuthenticated.value = false;
  userTipo.value = '';
  
  // Garante que o Vue atualize o DOM corretamente
  await nextTick(); 
  
  // Redireciona para a página inicial
  router.push('/');
};
</script>

<template>
  <header>
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contatos" class="contatos">Contatos</RouterLink>
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
  margin-left: 18%;
}
button {
  background: rgba(255, 255, 255, 0.2); /* Fundo semi-transparente */
  border: none; /* Sem borda */
  border-radius: 10px; /* Cantos arredondados */
  padding: 15px 40px;
  font-size: 24px;
  font-weight: bold;
  color: black; /* Cor do texto */
  cursor: pointer;
  backdrop-filter: blur(5px); /* Efeito de vidro fosco */
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
