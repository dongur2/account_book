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
    <div style="flex: 1">
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
    <div style="flex: 1; align-items: center">
      <p>{{ accountItem.title }}</p>
    </div>
    <div style="flex: 1; align-items: center">
      <p>{{ accountItem.desc }}</p>
    </div>
    <div style="flex: 1; align-items: center">
      <p>{{ moneyFormat(accountItem.amount) }}</p>
    </div>
    <div style="flex: 1; align-items: center; justify-content: end">
      <button type="button" class="btn">
        <i class="bi bi-house"></i>
      </button>
      <button type="button" class="btn">
        <i class="bi bi-house"></i>
      </button>
    </div>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAccountListStore } from '@/stores/account.js';
import { moneyFormat } from '../utils/moneyFormat';

defineProps({
  accountItem: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const accountListStore = useAccountListStore();
</script>
