import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { moneyFormat } from '@/utils/moneyFormat';

export const useCalendarAccountStore = defineStore('calendarAccountList', () => {
  const BASEURI = '/api/account';
  const state = reactive({ summaryList: [], dailyAccountList: [], isDailyShow: false });

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
                    title: `+ ${moneyFormat(income)}`,
                    type: 'income',
                    amount: income,
                    datetime: date,
                    className: 'income-event'
                });
            }
            if (expense > 0) {
                summary.push({
                    date,
                    title: `- ${moneyFormat(expense)}`,
                    type: 'expense',
                    amount: expense,
                    datetime: date,
                    className: 'expense-event'
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

  /*
  * 날짜별 목록 조회
  */
  const fetchDailyAccountList = async (date) => {
    try {
      const res = await axios.get(BASEURI);

      if(res.status === 200) {
        state.dailyAccountList = res.data
          .filter((account) => account.date === date)
          .sort((a,b) => { return parseFloat(b.id) - parseFloat(a.id) });
        
      //데이터 없을 경우 닫음
      if(state.dailyAccountList.length === 0) {
        state.isDailyShow = false;
      } else {
        state.isDailyShow = true;
      }
    } else {
      alert('Failed to get daily accounts');
    }
  } catch (err) {
    alert('Err: '+err);
  }
} 

  const deleteFetchDailyAccountList = (id, successCallBack) => {
    try {
      let idx = state.dailyAccountList.findIndex((item) => item.id === id);
      state.dailyAccountList.splice(idx, 1); 
      successCallBack();
    } catch (err) {
      console.log('Err:'+err);
    }
  }

  return { 
    summaryList: computed(() => state.summaryList),
    dailyAccountList: computed(() => state.dailyAccountList),
    isDailyShow: computed(() => state.isDailyShow), 
    fetchSummaryList,
    fetchDailyAccountList,
    deleteFetchDailyAccountList
  };
});
