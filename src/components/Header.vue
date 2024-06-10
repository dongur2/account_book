<template>
  <div
    class="container"
    style="flex: 1; justify-content: space-between; background-color: #fcda76"
  >
    <div>
      <span>curretnMonth{{}}</span>
      <button type="button" class="btn" @click="goToPage">
        <i :class="iconClass()"></i>
      </button>
    </div>
    <div>
      <i class="bi bi-chevron-double-left"></i>
      <i class="bi bi-house"></i>
      <i class="bi bi-chevron-double-right"></i>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const iconClass = () => {
  return route.path === '/calendar' ? 'bi bi-pie-chart-fill' : 'bi bi-calendar';
};
const goToPage = () => {
  if (route.path === '/calendar') {
    router.push('/');
  } else {
    router.push('/calendar');
  }
};
</script>
