import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { moneyFormat } from '@/utils/moneyFormat';

export const useMonthlyAccountStore = defineStore(
  'monthlyAccountListStore',
  () => {
    const BASEURI = '/api/account';
    const state = reactive({
      nowMonth: '',
      monthlyAccountList: [],
    });

    // 월별 목록 조회
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
              return parseFloat(b.id) - parseFloat(a.id);
            });

          //   console.log('nowmonth:' + nowMonth);
          //   console.log(new Date(response.data[0].date).getMonth() + 1);
          // console.log(state.monthlyAccountList);
        } else {
          alert('월별 수입/지출 목록 조회 실패');
        }
      } catch (error) {
        alert('에러 발생 : ' + error);
      }
    };

    const monthlyIncomeSum = computed(() => {
      return state.monthlyAccountList
        .filter((account) => account.type === 'income')
        .reduce((sum, account) => sum + parseFloat(account.amount), 0);
    });

    const monthlyExpenseSum = computed(() => {
      return state.monthlyAccountList
        .filter((account) => account.type === 'expense')
        .reduce((sum, account) => sum + parseFloat(account.amount), 0);
    });
    return {
      fetchMonthlyAccountList,
      monthlyAccountList: computed(() => state.monthlyAccountList),
      monthlyIncomeSum: computed(() => state.monthlyAccountList),
      monthlyExpenseSum: computed(() => state.monthlyAccountList),
    };
  }
);
