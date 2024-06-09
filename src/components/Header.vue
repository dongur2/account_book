<template>
  <div
    class="container"
    style="
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-between;
    "
  >
    <div style="display: flex; align-items: center">
      <span style="font-style: italic; font-size: 50px; font-weight: 700"
        >curretnMonth{{
      }}</span>
      <button type="button" class="btn" @click="goToPage">
        <i :class="iconClass()" style="font-size: 3rem"></i>
      </button>
    </div>
    <div style="display: flex; align-items: center">
      <i class="bi bi-chevron-double-left" style="font-size: 3rem"></i>
      <i class="bi bi-house" style="font-size: 3rem"></i>
      <i class="bi bi-chevron-double-right" style="font-size: 3rem"></i>
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
