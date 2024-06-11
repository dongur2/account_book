/*
* 금액 ₩999,999,999 표시 포맷 함수
*/
export const moneyFormat = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount);
};