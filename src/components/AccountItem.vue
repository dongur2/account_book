<template>
  <li>
    <span @click="console.log(penguin)">
      {{ accountItem.category }}
      카테고리
    </span>
    <span @click="console.log(penguin)">
      {{ accountItem.title }}
      내용
    </span>
    <span @click="console.log(penguin)">
      {{ accountItem.desc }}
      메모(필수x)
    </span>

    <span @click="console.log(penguin)">
      {{ accountItem.type.amount }}
      10000
    </span>
    <span> 원 </span>
    <button type="button" class="btn" @click="console.log(penguin)">
      <i class="bi bi-house" style="font-size: 3rem"></i>
    </button>
    <button type="button" class="btn" @click="console.log(penguin)">
      <i class="bi bi-house" style="font-size: 3rem"></i>
    </button>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAccountListStore } from '@/stores/account.js';
defineProps({
  accountItem: { Type: Object, required: true },
});
const router = useRouter();
const accountListStore = useAccountListStore();
//   const { deleteTodo, toggleDone } = todoListStore;
</script>
