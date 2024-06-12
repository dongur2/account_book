<template>
  <li
    class="list-group-item"
    style="
      background-color: #fcda76;
      border: none;
      display: flex;
      width: 100%;
      padding: 0;
    "
  >

    <div v-if="isModifying" style="flex: 1; align-items: center">
      <select name="type" v-model="accountItem.type">
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>

    <div v-if="!isModifying" style="flex: 1; align-items: center;">
      <p>{{ accountItem.date }}</p>
    </div>
    <div v-else style="flex: 1; align-items: center;">
      <input type="date" v-model="accountItem.date">
    </div>
  

    <div v-if="!isModifying" style="flex: 1">
      <span>
        <span class="badge text-bg-secondary">
          {{
            accountItem.type === 'income'
              ? accountItem.incomeCategory
              : accountItem.expenseCategory
          }}
        </span>
      </span>
    </div>
    <div v-else style="flex: 1; align-items: center">
      <select v-if="accountItem.type === 'income'" name="incomeCategory" v-model="accountItem.incomeCategory">
        <option value="salary">근로소득</option>
        <option value="pin">용돈</option>
        <option value="etc">기타</option>
      </select>

      <select v-else name="expenseCategory" v-model="accountItem.expenseCategory">
        <option value="fixed">고정지출</option>
        <option value="culture">문화생활</option>
        <option value="life">생활비</option>
        <option value="etc">기타</option>
      </select>
    </div>

    <div v-if="!isModifying" style="flex: 1; align-items: center">
      <p>{{ accountItem.title }}</p>
    </div>
    <div v-else style="flex: 1; align-items: center">
      <input type="text" v-model="accountItem.title">
    </div>

    <div v-if="!isModifying" style="flex: 1; align-items: center">
      <p>{{ accountItem.desc }}</p>
    </div>
    <div v-else style="flex: 1; align-items: center">
      <input type="text" v-model="accountItem.desc">
    </div>

    <div v-if="!isModifying" style="flex: 1; align-items: center">
      <p>{{ moneyFormat(accountItem.amount) }}</p>
    </div>
    <div v-else style="flex: 1; align-items: center">
      <input type="text" v-model="accountItem.amount">
    </div>

    <div style="flex: 1; align-items: center; justify-content: end">
      <button type="button" class="btn" @click="isModifying ? modifyAccountHandler(accountItem):changeInput()">
        <i class="bi bi-house"></i>
      </button>
      <button type="button" class="btn" @click="deleteAccountHandler(accountItem.id)">
        <i class="bi bi-house"></i>
      </button>
    </div>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAccountListStore } from '@/stores/account.js';
import { moneyFormat } from '../utils/moneyFormat';
import { ref } from 'vue'

defineProps({
  accountItem: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const accountListStore = useAccountListStore();

/* 목록 제거 */
const { deleteAccount } = accountListStore;
const deleteAccountHandler = (id) => {
  if(confirm('해당 항목을 삭제하시겠습니까?')) {
    deleteAccount(id);
  }
}

/* 목록 수정 */
const isModifying = ref(false);
const { modifyAccount } = accountListStore;

const changeInput = () => {
  isModifying.value = true;
}

const modifyAccountHandler = (item) => {
    console.log(item);
    modifyAccount(item);

    isModifying.value = false;
}

</script>
