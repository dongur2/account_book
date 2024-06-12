import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAccountListStore = defineStore('accountList', () => {
  const BASEURI = '/api/account';
  const state = reactive({
    accountList: [],
    filterCategory: null, // 필터 카테고리 추가
    isLoading: false,
  });

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

    const categoryData = state.accountList.reduce((acc, item) => {
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
    chartData.value = getCategoryData(type);
  };

  const setFilterCategory = (category) => {
    state.filterCategory = category;
  };

  const filteredAccountList = computed(() => {
    if (!state.filterCategory) return state.accountList;
    return state.accountList.filter((item) => {
      const categoryMap =
        item.type === 'income' ? incomeCategoryMap : expenseCategoryMap;
      return categoryMap[item[`${item.type}Category`]] === state.filterCategory;
    });
  });

  return {
    accountList: computed(() => state.accountList),
    isLoading: computed(() => state.isLoading),
    fetchAccountList,
    chartData,
    updateChartData,
    setFilterCategory,
    filteredAccountList,
  };
});
