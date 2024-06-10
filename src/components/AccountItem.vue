<template>
  <li class="list-group-item">
    <span>
      <span class="badge text-bg-secondary">
        {{
          accountItem.type === 'income'
            ? accountItem.incomeCategory
            : accountItem.expenseCategory
        }}
      </span> </span
    ><br />
    <br />
    <br />
    <span>{{ accountItem.title }}</span>
    <br />
    <span>{{ accountItem.desc }}</span
    ><br />
    <span>{{ accountItem.amount }}</span>
    <span> 원 </span><br />
    <button type="button" class="btn">
      <i class="bi bi-house"></i>
    </button>
    <button type="button" class="btn">
      <i class="bi bi-house"></i>
    </button>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAccountListStore } from '@/stores/account.js';

defineProps({
  accountItem: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const accountListStore = useAccountListStore();
</script>
