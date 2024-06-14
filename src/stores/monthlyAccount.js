import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMonthlyAccountStore = defineStore(
  'monthlyAccountListStore',
  () => {
    const BASEURI = '/api/account';
    const nowMonth = ref('');
    const state = reactive({
      monthlyAccountList: [],
    });

    const fetchMonthlyAccountList = async (nowMonthValue, nowYearValue) => {
      try {
        const response = await axios.get(BASEURI);

        if (response.status === 200) {
          state.monthlyAccountList = response.data
            .filter(
              (account) =>
                parseFloat(new Date(account.date).getMonth() + 1) ===
                  parseInt(nowMonthValue) &&
                new Date(account.date).getFullYear() === parseInt(nowYearValue)
            )
            .sort((a, b) => parseFloat(b.id) - parseFloat(a.id));

          if (nowMonthValue !== 'Monthly') {
            nowMonth.value = getMonthName(parseInt(nowMonthValue) - 1);
          }
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

    const currentMonth = computed(() => nowMonth.value);

    const getMonthName = (monthIndex) => {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return monthNames[monthIndex];
    };

    const setCurrentMonth = (month) => {
      nowMonth.value = month;
    };

    return {
      fetchMonthlyAccountList,
      monthlyAccountList: computed(() => state.monthlyAccountList),
      monthlyIncomeSum,
      monthlyExpenseSum,
      currentMonth,
      getMonthName,
      setCurrentMonth,
    };
  }
);
