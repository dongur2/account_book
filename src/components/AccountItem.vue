<template>
  <li
    class="list-group-item"
    style="
      display: flex;
      border: none;
      width: 100%;
      border-radius: 5px;
      padding: 5px;
      flex-direction: row;
      justify-content: space-between;
      gap: 10px;
    "
  >
    <!-- 날짜 -->
    <div
      v-if="!isModifying"
      style="flex: 1.5; align-items: center; justify-content: center"
    >
      <p>{{ accountItem.date }}</p>
    </div>
    <div v-else style="flex: 1">
      <input type="date" v-model="accountItem.date" class="form-control" />
    </div>

    <!-- 분류 -->
    <div v-if="isModifying" style="flex: 1; align-items: center">
      <select
        name="type"
        v-model="accountItem.type"
        @change="
          accountItem.incomeCategory = 'salary';
          accountItem.expenseCategory = 'fixed';
        "
        class="form-select"
      >
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>

    <!-- 카테고리 -->
    <div v-if="!isModifying" style="flex: 2">
      <span
        style="
          margin: 0px;
          display: flex;
          align-items: center;
          font-size: 1.3rem;
        "
      >
        <span :class="['badge', categoryBadgeClass]">
          {{
            accountItem.type === 'income'
              ? translateCategory(accountItem.incomeCategory, 'income')
              : translateCategory(accountItem.expenseCategory, 'expense')
          }}
        </span>
      </span>
    </div>
    <div v-else style="flex: 1.5; align-items: center">
      <select
        v-if="accountItem.type === 'income'"
        name="category"
        v-model="accountItem.incomeCategory"
        class="form-select"
      >
        <option value="salary">근로소득</option>
        <option value="pin">용돈</option>
        <option value="etc">기타</option>
      </select>

      <select
        v-else
        name="category"
        v-model="accountItem.expenseCategory"
        class="form-select"
      >
        <option value="fixed">고정지출</option>
        <option value="culture">문화생활</option>
        <option value="life">생활비</option>
        <option value="etc">기타</option>
      </select>
    </div>

    <!-- 내용 -->
    <div v-if="!isModifying" style="flex: 3; align-items: center">
      <p>{{ accountItem.title }}</p>
    </div>
    <div v-else style="flex: 3; align-items: center">
      <input
        type="text"
        v-model="accountItem.title"
        placeholder="내용을 입력하세요"
        class="form-control"
      />
    </div>

    <!-- 메모 -->
    <div v-if="!isModifying" style="flex: 4; align-items: center">
      <p>{{ accountItem.desc }}</p>
    </div>
    <div v-else style="flex: 4; align-items: center">
      <input
        type="text"
        v-model="accountItem.desc"
        placeholder="메모를 입력하세요(선택)"
        class="form-control"
      />
    </div>

    <!-- 금액 -->
    <div v-if="!isModifying" style="flex: 2; align-items: center">
      <p
        :style="{
          color: accountItem.type === 'income' ? '#35948C' : '#CF5A7A',
        }"
      >
        {{ formattedAmount(accountItem) }}
      </p>
    </div>
    <div v-else style="flex: 2; align-items: center">
      <input
        type="text"
        v-model="accountItem.amount"
        placeholder="금액을 입력하세요"
        class="form-control"
      />
    </div>

    <!-- 버튼(수정, 삭제) -->
    <div style="flex: 1; align-items: center; justify-content: end; gap: 5px">
      <!-- 수정 버튼 -->
      <button
        type="button"
        class="btn btn-light"
        @click="isModifying ? modifyAccountHandler(accountItem) : changeInput()"
      >
        <i class="fa-solid fa-pen"></i>
      </button>
      <!-- 삭제 버튼 -->
      <button
        type="button"
        class="btn btn-light"
        @click="deleteAccountHandler(accountItem.id)"
      >
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAccountListStore } from '@/stores/account.js';
import { useCalendarAccountStore } from '@/stores/calendarAccount'; //calendar
import { moneyFormat } from '../utils/moneyFormat';
import { ref, computed } from 'vue';

// 컴포넌트 속성 정의
const props = defineProps({
  accountItem: {
    type: Object,
    required: true,
  },
});

// 라우터 사용
const router = useRouter();

// 스토어 사용
const accountListStore = useAccountListStore();
const calendarAccountStore = useCalendarAccountStore(); //calendar

/* 목록 수정 */
const isModifying = ref(false);
const { modifyAccount } = accountListStore;
const { fetchSummaryList, fetchDailyAccountList } = calendarAccountStore;

const changeInput = () => {
  isModifying.value = true;
};

const modifyAccountHandler = (item) => {
  const regex = /^[0-9]*$/;
  if (item.title === '' || item.title.trim() === '') {
    //title not null
    alert('내용을 입력해주세요.');
  } else if (item.title.trim().length > 15) {
    alert('내용은 15글자 이하만 가능합니다.');
  } else if (item.amount === '' || item.amount.trim() === '') {
    //amount not null
    alert('금액을 입력해주세요.');
  } else if (!regex.test(item.amount)) {
    alert('금액은 숫자만 입력 가능합니다.');
  } else if (parseFloat(item.amount) <= 0 || parseFloat(item.amount) % 1 > 0) {
    //amount > 0 && amount is Integer
    alert('금액은 1원 이상부터 입력 가능합니다. (소수점 불가)');
  } else {
    modifyAccount(item, fetchSummaryList); //callback: fetchCalendarSummary
    isModifying.value = false;
  }
};

/* 목록 제거 */
const { deleteAccount } = accountListStore;
const deleteAccountHandler = (id) => {
  if(confirm('해당 항목을 삭제하시겠습니까?')) {
    deleteAccount(id, fetchSummaryList);
  }
}

// 포맷된 금액 반환 함수
const formattedAmount = (item) => {
  const prefix = item.type === 'income' ? '+ ' : '- ';
  return prefix + moneyFormat(item.amount);
};

// 카테고리 한글 변환 함수
const translateCategory = (category, type) => {
  const incomeCategories = {
    salary: '근로소득',
    pin: '용돈',
    etc: '기타',
  };

  const expenseCategories = {
    fixed: '고정지출',
    culture: '문화생활',
    life: '생활비',
    etc: '기타',
  };

  if (type === 'income') {
    return incomeCategories[category] || category;
  } else if (type === 'expense') {
    return expenseCategories[category] || category;
  }
  return category;
};

// 카테고리별 클래스 설정
const categoryBadgeClass = computed(() => {
  if (props.accountItem.type === 'income') {
    switch (props.accountItem.incomeCategory) {
      case 'salary':
        return 'bg-salary';
      case 'pin':
        return 'bg-pin';
      case 'etc':
        return 'bg-income-etc';
      default:
        return 'bg-secondary';
    }
  } else {
    switch (props.accountItem.expenseCategory) {
      case 'fixed':
        return 'bg-fixed';
      case 'culture':
        return 'bg-culture';
      case 'life':
        return 'bg-life';
      case 'etc':
        return 'bg-expense-etc';
      default:
        return 'bg-secondary';
    }
  }
});

</script>

<style scoped>
* {
  font-size: 1.1rem;
  margin: 0;
  padding: 0;
}

.list-group-item:hover {
  background-color: rgb(241, 241, 241);
}

/* == 카테고리 뱃지 시작 == */

.badge {
  color: white; /* 공통 텍스트 색상 */
}

.bg-salary {
  /* 근로소득 */
  background-color: #90be6d;
}

.bg-pin {
  /* 용돈 */
  background-color: #2196f3;
}

.bg-income-etc {
  /* 수입-기타 */
  background-color: #43aa8b;
}

.bg-fixed {
  /* 고정지출 */
  background-color: #f94144;
}

.bg-culture {
  /* 문화생활 */
  background-color: #f3722c;
}

.bg-life {
  /* 생활비 */
  background-color: #f9c74f;
}

.bg-expense-etc {
  /* 지출-기타 */
  background-color: #f8961e;
}

.bg-secondary {
  background-color: #6c757d;
}

/* == 카테고리 뱃지 끝 == */
</style>
