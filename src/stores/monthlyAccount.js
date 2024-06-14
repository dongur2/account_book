import { computed, reactive, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMonthlyAccountStore = defineStore(
  'monthlyAccountListStore',
  () => {
    const BASEURI = '/api/account';
    const nowMonth = ref('');
    const state = reactive({
      monthlyAccountList: [],
      filterCategory: null, // 필터 카테고리 추가
      monthlyExpenseSum: '',
      monthlyIncomeSum: '',
    });

    const fetchMonthlyAccountList = async (nowMonthValue, nowYearValue) => {
      try {
        const response = await axios.get(BASEURI);

        if (response.status === 200) {
          state.monthlyAccountList = response.data
            .filter(
              (account) =>
                parseFloat(new Date(account.date).getFullYear()) === parseInt(nowYearValue)
                && parseFloat(new Date(account.date).getMonth() + 1) === parseFloat(nowMonthValue) 
            )
            .sort((a, b) => {
              if(new Date(a.date)+'' === new Date(b.date)+'') {
                return parseFloat(b.id) - parseFloat(a.id); 
              } else {
                return new Date(b.date) - new Date(a.date);
              }
            });

          if (nowMonthValue !== 'Monthly') {
            nowMonth.value = getMonthName(parseInt(nowMonthValue) - 1);
          }
          
        } else {
          alert('월별 수입/지출 목록 조회 실패');
        }
      } catch (error) {
        console.log('에러 발생 : ' + error);
      }
    };

    const incomeCategoryMap = {
      salary: '급여',
      pin: '보너스',
      etc: '기타 수입',
    };
  
    const expenseCategoryMap = {
      fixed: '고정 지출',
      culture: '문화 생활',
      life: '생활비',
      etc: '기타 지출',
    };
  
    const getCategoryData = (type) => {
      const map = type === 'income' ? incomeCategoryMap : expenseCategoryMap;
  
      const categoryData = state.monthlyAccountList.reduce((acc, item) => {
        if (item.type !== type) return acc;
  
        const category = map[item[`${type}Category`]] || '기타';
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += parseFloat(item.amount);
        return acc;
      }, {});
  
      return {
        labels: Object.keys(categoryData),
        datasets: [
          {
            data: Object.values(categoryData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderColor: ['white'],
            borderWidth: 1,
          },
        ],
      };
    };

    const chartData = ref(getCategoryData('expense')); // 초기값은 expense 데이터

    const updateChartData = (type) => {
      console.log(type)
      chartData.value = getCategoryData(type);
    };

    watch(
      () => state.monthlyAccountList,
      () => {
        chartData.value = getCategoryData('expense');
      },
      { deep: true }
    );

    const setFilterCategory = (category) => {
      state.filterCategory = category;
    };
  
    const filteredAccountList = computed(() => {
      if (!state.filterCategory) return state.monthlyAccountList;
      return state.monthlyAccountList.filter((item) => {
        const categoryMap =
          item.type === 'income' ? incomeCategoryMap : expenseCategoryMap;
        return categoryMap[item[`${item.type}Category`]] === state.filterCategory;
      });
    });


    /* 월별 총수입/총지출 */
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
      chartData,
      updateChartData,
      setFilterCategory,
      filteredAccountList,
      monthlyIncomeSum,
      monthlyExpenseSum,
      currentMonth,
      getMonthName,
      setCurrentMonth,
    };
  }
);
