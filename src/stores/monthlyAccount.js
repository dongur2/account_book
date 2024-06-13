import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMonthlyAccountStore = defineStore(
  'monthlyAccountListStore',
  () => {
    const BASEURI = '/api/account';
    const state = reactive({
      nowMonth: '',
      monthlyAccountList: [],
    });

    // 월별 목록 조회: 최신순
    const fetchMonthlyAccountList = async (nowMonth) => {
      try {
        const response = await axios.get(BASEURI);

        if (response.status === 200) {
          state.monthlyAccountList = response.data
            .filter(
              (account) =>
                parseFloat(new Date(account.date).getMonth() + 1) ===
                parseInt(nowMonth)
            )
            .sort((a, b) => {
              if(new Date(a.date) === new Date(b.date)) {
                return parseFloat(b.id) - parseFloat(a.id); 
              } else {
                return new Date(b.date) - new Date(a.date);
              }
            });

        } else {
          alert('월별 수입/지출 목록 조회 실패');
        }
      } catch (error) {
        alert('에러 발생 : ' + error);
      }
    };

    return {
      fetchMonthlyAccountList,
      monthlyAccountList: computed(() => state.monthlyAccountList),
    };
  }
);
