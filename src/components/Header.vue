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
    <div style="display: flex; align-items: center">
      <!-- 현재 월 또는 "Monthly" 표시, "월"은 currentMonth가 "Monthly"가 아닐 때만 표시 -->
      <span style="font-style: italic; font-size: 50px; font-weight: 700">
        {{ currentMonth }}<span v-if="currentMonth !== 'Monthly'">월</span>
      </span>
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
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();

// 현재 경로에 따라 반환되는 아이콘 클래스를 설정하는 함수
const iconClass = () => {
  return route.path === '/calendar' ? 'bi bi-pie-chart-fill' : 'bi bi-calendar';
};

// 현재 경로에 따라 페이지를 이동시키는 함수
const goToPage = () => {
  if (route.path === '/calendar') {
    router.push('/');
    currentMonth.value = getToday(); // 현재 월로 변경
  } else {
    router.push('/calendar');
    currentMonth.value = 'Monthly'; // "Monthly"로 변경
  }
};

// 오늘 날짜에서 월을 추출하는 함수
const getToday = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return `${month}`;
};

// 현재 월을 저장하는 반응형 변수
const currentMonth = ref(getToday()); // getToday 함수로 얻은 현재 월을 초기값으로 설정
</script>
