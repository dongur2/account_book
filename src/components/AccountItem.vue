<template>
  <li
    class="list-group-item hover"
    style="
      display: flex;
      border: 1px solid red;
      background-color: #fefefe;
      width: 100%;
      border-radius: 5px;
      padding: 5px;
    "
  >
    <!-- 날짜 -->
    <div v-if="!isModifying" style="flex: 1; align-items: center">
      <p>{{ accountItem.date }}</p>
    </div>
    <div v-else style="flex: 1; align-items: center">
      <input type="date" v-model="accountItem.date" class="form-control" />
    </div>

    <!-- 분류 -->
    <div v-if="isModifying" style="flex: 1; align-items: center">
      <select
        name="type"
        v-model="accountItem.type"
        @change="
          accountItem.incomeCategory = 'salary';
          accountItem.expenseCategory = 'fixed';
        "
        class="form-select"
      >
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>

    <!-- 카테고리 -->
    <div v-if="!isModifying" style="flex: 1">
      <span style="margin: 0px; display: flex; align-items: center">
        <p class="badge bg-secondary">
          {{
            accountItem.type === 'income'
              ? accountItem.incomeCategory
              : accountItem.expenseCategory
          }}
        </p>
      </span>
    </div>
    <div v-else style="flex: 1; align-items: center">
      <select
        v-if="accountItem.type === 'income'"
        name="category"
        v-model="accountItem.incomeCategory"
        class="form-select"
      >
        <option value="salary">근로소득</option>
        <option value="pin">용돈</option>
        <option value="etc">기타</option>
      </select>

      <select
        v-else
        name="category"
        v-model="accountItem.expenseCategory"
        class="form-select"
      >
        <option value="fixed">고정지출</option>
        <option value="culture">문화생활</option>
        <option value="life">생활비</option>
        <option value="etc">기타</option>
      </select>
    </div>

    <!-- 내용 -->
    <div v-if="!isModifying" style="flex: 2; align-items: center">
      <p>{{ accountItem.title }}</p>
    </div>
    <div v-else style="flex: 1; align-items: center">
      <input
        type="text"
        v-model="accountItem.title"
        placeholder="내역을 입력하세요"
        class="form-control"
      />
    </div>

    <!-- 메모 -->
    <div v-if="!isModifying" style="flex: 3; align-items: center">
      <p>{{ accountItem.desc }}</p>
    </div>
    <div v-else style="flex: 3; align-items: center">
      <input
        type="text"
        v-model="accountItem.desc"
        placeholder="메모를 입력하세요(선택)"
        class="form-control"
      />
    </div>

    <!-- 금액 -->
    <div v-if="!isModifying" style="flex: 1; align-items: center">
      <p :style="{ color: accountItem.type === 'income' ? 'green' : 'red' }">
        {{ moneyFormat(accountItem.amount) }}
      </p>
    </div>
    <div v-else style="flex: 1; align-items: center">
      <input
        type="text"
        v-model="accountItem.amount"
        placeholder="금액을 입력하세요"
        class="form-control"
      />
    </div>

    <!-- 버튼(수정, 삭제) -->
    <div style="flex: 1; align-items: center; justify-content: end">
      <!-- 수정 버튼 -->
      <button
        type="button"
        class="btn"
        @click="isModifying ? modifyAccountHandler(accountItem) : changeInput()"
      >
        <i class="fa-solid fa-pen"></i>
      </button>
      <!-- 삭제 버튼 -->
      <button
        type="button"
        class="btn"
        @click="deleteAccountHandler(accountItem.id)"
      >
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAccountListStore } from '@/stores/account.js';
import { useCalendarAccountStore } from '@/stores/calendarAccount'; //calendar
import { moneyFormat } from '../utils/moneyFormat';
import { ref } from 'vue';

// 컴포넌트 속성 정의
defineProps({
  accountItem: {
    type: Object,
    required: true,
  },
});

// 라우터 사용
const router = useRouter();

// 스토어 사용
const accountListStore = useAccountListStore();
const calendarAccountStore = useCalendarAccountStore(); //calendar

/* 목록 제거 */
const { deleteAccount } = accountListStore;
const deleteAccountHandler = (id) => {
  if (confirm('해당 항목을 삭제하시겠습니까?')) {
    deleteAccount(id, fetchSummaryList); //callback: fetchCalendarSummary
  }
};

/* 목록 수정 */
const isModifying = ref(false);
const { modifyAccount } = accountListStore;
const { fetchSummaryList } = calendarAccountStore;

const changeInput = () => {
  isModifying.value = true;
};

const modifyAccountHandler = (item) => {
  if (item.title === '' || item.title.trim() === '') {
    //title not null
    alert('내역을 입력해주세요.');
  } else if (item.amount === '' || item.amount.trim() === '') {
    //amount not null
    alert('금액을 입력해주세요.');
  } else if (parseFloat(item.amount) <= 0 || parseFloat(item.amount) % 1 > 0) {
    //amount > 0 && amount is Integer
    alert('금액은 1원 이상부터 입력 가능합니다. (소수점 불가)');
  } else {
    modifyAccount(item, fetchSummaryList); //callback: fetchCalendarSummary
    isModifying.value = false;
  }
};
</script>

<style scoped>
* {
  font-size: 1.1rem;
  margin: 0;
  padding: 0;
  /* border: 1px solid blue; */
}

/* 한 덩어리 전체 */
.list-group-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}
</style>
