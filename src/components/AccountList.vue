<template>
  <div class="row">
    <div class="col p-3">
      <!-- <span>완료된 할일 : {{ doneCount }}</span> -->
      <router-link class="btn btn-primary" to="/todos/add">
        할일 추가
      </router-link>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <ul class="list-group">
        <!-- <TodoItem
            v-for="todoItem in todoList"
            :key="todoItem.id"
            :todoItem="todoItem"
          /> -->
        <AccountItem
          v-for="accountItem in AccountList"
          :key="accountItem.id"
          :accountItem="accountItem"
        ></AccountItem>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAccountListStore } from '@/stores/account.js';
import AccountItem from './AccountItem.vue';
const accountListStore = useAccountListStore();
const { fetchTodoList } = accountListStore;
// const doneCount = computed(() => todoListStore.doneCount);
const accountList = computed(() => accountListStore.accountList);
</script>
