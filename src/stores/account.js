import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { useMonthlyAccountStore } from './monthlyAccount';
import { useCalendarAccountStore } from './calendarAccount';

export const useAccountListStore = defineStore('accountList', () => {
  const BASEURI = '/api/account';
  const state = reactive({
    accountList: [],
    isLoading: false,
  });

  const monthlyAccountListStore = useMonthlyAccountStore();
  const { fetchMonthlyAccountList } = monthlyAccountListStore;

  const fetchAccountList = async () => {
    state.isLoading = true;
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        state.accountList = response.data.sort((a, b) => {
          if (a.date === b.date) {
            return parseFloat(b.id) - parseFloat(a.id);
          } else {
            return new Date(b.date) - new Date(a.date);
          }
        });
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      console.log('에러발생 :' + error);
    } finally {
      state.isLoading = false;
    }
  };

  // 항목 추가
  const addAccount = async (account, successCallback) => {
    try {
      const response = await axios.post(BASEURI, {
        ...account,
        id: Date.now() + '',
      });
      if (response.status === 201) {
        state.accountList.push({ ...response.data });
        successCallback(account.date);
        fetchMonthlyAccountList(new Date(account.date).getMonth()+1)
      } else {
        alert('Account 추가 실패');
      }
    } catch (error) {
      console.log('에러발생 :' + error);
    }
  };

  /*
   * 목록 수정
   */
  const modifyAccount = async (
    { id, type, incomeCategory, expenseCategory, title, desc, amount, date },
    successCallBack
  ) => {
    try {
      let payload = {};
      if (type === 'income')
        payload = { id, type, incomeCategory, title, desc, amount, date };
      else payload = { id, type, expenseCategory, title, desc, amount, date };

      const res = await axios.put(`${BASEURI}/${id}`, payload); // PUT

      if (res.status === 200) {
        let idx = state.accountList.findIndex((item) => item.id === id);
        if (idx > -1) {
          state.accountList[idx] = payload; // local update & rendering
          successCallBack(); //fetchCalendarSummary
        } else throw Exception('None');
      } else {
        console.log('Failed to modify');
      }
    } catch (err) {
      console.log('Err: ' + err);
    }
  };

  /*
   * 목록 삭제
   */
  const calendarAccountStore = useCalendarAccountStore();
  const { deleteFetchDailyAccountList } = calendarAccountStore;

  const deleteAccount = async (id, successCallBack) => {
    try {
      const res = await axios.delete(`${BASEURI}/${id}`); // delete

      if (res.status === 200) {
        let idx = state.accountList.findIndex((item) => item.id === id);
        state.accountList.splice(idx, 1); // local delete & rendering
        deleteFetchDailyAccountList(id, successCallBack); //fetchCalendarSummary
      } else {
        console.log('Failed to delete');
      }
    } catch (err) {
      console.log('Err: ' + err);
    }
  };


  return {
    accountList: computed(() => state.accountList),
    isLoading: computed(() => state.isLoading),
    fetchAccountList,
    modifyAccount,
    deleteAccount,
    addAccount,
  };
});
