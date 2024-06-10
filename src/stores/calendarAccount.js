import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCalendarAccountStore = defineStore('summaryList', () => {
  const BASEURI = '/api/account';
  const state = reactive({ summaryList: [] });

  /* 
  * 전체 캘린더 날짜별 수입/지출 요약: 리턴 - title(수입 0원//지출 0원//순수입?), date
  */
  const fetchSummaryList = async () => {
    try {
      const res = await axios.get(BASEURI);

      if (res.status === 200) {
        const accounts = res.data;
        
        const summaryMap = {}; // 총수입/총지출 맵

        // 날짜별로 그룹화하여 총수입과 총지출을 계산
        accounts.forEach(account => {
          const date = account.date;
          if (!summaryMap[date]) {
            summaryMap[date] = { income: 0, expense: 0 };
          }

          if (account.type === 'income') {
            summaryMap[date].income += parseFloat(account.amount);
          } else if (account.type === 'expense') {
            summaryMap[date].expense += parseFloat(account.amount);
          }
        });


        // summary -> state.summaryList에 저장
        let summary = [];
        state.summaryList = Object.entries(summaryMap).map(([date, { income, expense }]) => {
            if (income > 0) {
                summary.push({
                    date,
                    title: `총수입: ${income}원`,
                    type: 'income'
                });
            }
            if (expense > 0) {
                summary.push({
                    date,
                    title: `총지출: ${expense}원`,
                    type: 'expense'
                });
            }
        });    
        state.summaryList = summary;

      } else {
        alert('Failed');
      }

    } catch (err) {
      alert('ERROR: ' + err);
    }
  };

  const summaryList = computed(() => state.summaryList);
  const isLoading = computed(() => state.isLoading);

  return { summaryList, isLoading, fetchSummaryList };
});
