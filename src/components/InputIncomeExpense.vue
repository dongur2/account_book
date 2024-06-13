<template>
  <div id="input_wrap" class="container">
    <form @submit.prevent="handleAddAccount">
      <div id="date">
        <input
          type="date"
          v-model="form.date"
          class="form-control"
          style="font-size: 1.2rem"
          required
        />
      </div>
      <div id="type">
        <select
          v-model="form.type"
          class="form-select"
          style="font-size: 1.2rem"
          @change="updateCategories"
        >
          <option value="none" selected>분류</option>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
      </div>
      <div id="category">
        <select
          v-model="form.category"
          class="form-select"
          style="font-size: 1.2rem"
        >
          <option value="none" selected>카테고리</option>
          <option
            v-for="category in categories"
            :key="category.value"
            :value="category.value"
          >
            {{ category.label }}
          </option>
        </select>
      </div>
      <div id="title">
        <input
          type="text"
          v-model="form.title"
          class="form-control"
          placeholder="내용"
          style="font-size: 1.2rem"
          required
        />
      </div>
      <div>
        <input
          type="text"
          v-model="form.amount"
          class="form-control"
          placeholder="금액"
          style="font-size: 1.2rem"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          class="form-control btn"
          id="add_btn"
          style="font-size: 1.2rem"
        >
          <b>+</b>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useAccountListStore } from '../stores/account';
import { useCalendarAccountStore } from '@/stores/calendarAccount'; //calendar

// 틀
const form = reactive({
  date: '',
  type: 'none',
  category: 'none',
  title: '',
  desc: '',
  amount: '',
});

const categories = ref([]);

const accountStore = useAccountListStore();
const calendarAccountStore = useCalendarAccountStore(); //calendar
const { accountList, fetchAccountList, addAccount } = accountStore;
const { fetchSummaryList, fetchDailyAccountList } = calendarAccountStore;

// 추가 버튼 눌러서 추가되면 입력창 리셋
const successCallback = (date = null) => {
  resetForm();
  fetchAccountList();
  fetchSummaryList();
  if(date != null) fetchDailyAccountList(date);
};

const handleAddAccount = async () => {
  const payload = { ...form };
  
  if(payload.date === '') {
    alert('날짜를 선택해주세요.');
  } else if (payload.title === '' || payload.title.trim() === '') {
    alert('내용을 입력해주세요.');
  } else if (payload.title.trim().length > 15) {
    alert('내용은 15글자 이하만 가능합니다.');
  } else if (payload.type === 'none') {
    alert('수입/지출을 선택해주세요.');
  } else if (payload.category === 'none') {
    alert('카테고리를 선택해주세요.');
  } else if (payload.amount === '' || payload.amount.trim() === '' 
    || parseFloat(payload.amount) <= 0 || parseFloat(payload.amount) % 1 > 0) {
    alert('금액은 1원 이상부터 입력 가능합니다. (소수점 불가)')  

  } else {
    // 동적 생성
    const dynamicPayload = {
      id: payload.id,
      type: form.type,
      title: form.title,
      desc: '',
      amount: form.amount,
      date: form.date,
    };

    if (form.type === 'income') {
      dynamicPayload.incomeCategory = form.category;
    } else if (form.type === 'expense') {
      dynamicPayload.expenseCategory = form.category;
    }

    await addAccount(dynamicPayload, successCallback);
    }
  };

// + 눌러서 추가하면 입력창 리셋
const resetForm = () => {
  form.date = '';
  form.type = 'none';
  form.category = 'none';
  form.title = '';
  form.amount = '';
  updateCategories();
};

// select box 연동(type, category)
const updateCategories = () => {
  if (form.type === 'income') {
    categories.value = [
      { label: '근로소득', value: 'salary' },
      { label: '용돈', value: 'pin' },
      { label: '기타', value: 'etc' },
    ];
  } else if (form.type === 'expense') {
    categories.value = [
      { label: '고정 지출', value: 'fixed' },
      { label: '문화 생활', value: 'culture' },
      { label: '생활비', value: 'life' },
      { label: '기타', value: 'etc' },
    ];
  } else {
    categories.value = [];
  }
  form.category = 'none';
};

onMounted(() => {
  updateCategories();
  fetchAccountList();
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  gap: 10px;
}

#input_wrap {
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
}
#date {
  flex: 1;
}
#type {
  flex: 1;
}
#category {
  flex: 1;
}
#title {
  flex: 3;
}
#add_btn {
  background-color: rgb(156, 143, 125);
  color: white;
  border: none;
  font-size: 1.1rem;
}
</style>
