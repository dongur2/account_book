<template>
  <div
    class="container"
    style="
      background-color: #fcda76;
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-between;
    "
  >
    <div style="display: flex; align-items: center; color: rgb(96, 88, 76)">
      <!-- 현재 월 또는 "Monthly" 표시 -->
      <span class="month-monthly">
        {{ displayMonth }}
      </span>
      <button
        type="button"
        class="btn"
        @click="goToPage"
        style="color: rgb(96, 88, 76); border: none"
      >
        <i :class="iconClass()" style="font-size: 3rem"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useMonthlyAccountStore } from '@/stores/monthlyAccount'; // 경로를 실제 stores 경로로 수정하세요.

const route = useRoute();
const router = useRouter();
const monthlyAccountStore = useMonthlyAccountStore();

// 현재 경로에 따라 반환되는 아이콘 클래스를 설정하는 함수
const iconClass = () => {
  return route.path === '/calendar'
    ? 'bi bi-pie-chart-fill'
    : 'fa-regular fa-calendar-check';
};

// 현재 경로에 따라 페이지를 이동시키는 함수
const goToPage = () => {
  if (route.path === '/calendar') {
    router.push('/');
    monthlyAccountStore.setCurrentMonth(
      monthlyAccountStore.getMonthName(new Date().getMonth())
    ); // 현재 월로 변경
  } else {
    router.push('/calendar');
    monthlyAccountStore.setCurrentMonth('Monthly'); // "Monthly"로 변경
  }
};

// currentMonth가 변경될 때마다 값을 반영
const displayMonth = computed(() => {
  return (
    monthlyAccountStore.currentMonth ||
    monthlyAccountStore.getMonthName(new Date().getMonth())
  );
});
</script>

<style scoped>
.month-monthly {
  font-style: italic;
  font-size: 50px;
  font-weight: 700;
  margin: 0.5rem;
}
</style>
