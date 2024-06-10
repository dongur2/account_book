import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAccountListStore = defineStore('account', () => {
  // const BASEURI = '/api/';
  const state = reactive({ accountList: [] });

  const fetchAccountList = async () => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        state.accountList = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  const accountList = computed(() => state.accountList);
  const isLoading = computed(() => state.isLoading);

  return { accountList, isLoading, fetchAccountList };
});
