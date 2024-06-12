import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAccountListStore = defineStore('accountList', () => {
  const BASEURI = 'http://localhost:3000/account';
  const state = reactive({ accountList: [], isLoading: false });

  const fetchAccountList = async () => {
    state.isLoading = true;
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        state.accountList = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    } finally {
      state.isLoading = false;
    }
  };

  // 항목 추가
  const addAccount = async (account, successCallback) => {
    try {
      const response = await axios.post(BASEURI, account);
      if (response.status === 201) {
        state.accountList.push({ ...response.data });
        successCallback();
      } else {
        alert('Account 추가 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  const accountList = computed(() => state.accountList);
  const isLoading = computed(() => state.isLoading);

  return { accountList, isLoading, fetchAccountList, addAccount };
});
