<script setup></script>

<template>
  <div id="input_wrap" class="container">
    <div id="date">
      <input type="date" class="form-control" name="date" />
    </div>
    <div id="type">
      <select name="type" id="" class="form-select">
        <option value="">분류</option>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>
    <div id="category">
      <select name="name" id="" class="form-select">
        <!-- v-if로 분류에 따라 다른 카테고리 나오게 -->
        <option value="">카테고리</option>
        <option value="">카테고리</option>
        <option value="">카테고리</option>
      </select>
    </div>
    <div id="title">
      <input type="text" class="form-control" placeholder="내용" />
    </div>
    <div>
      <input type="text" class="form-control" placeholder="금액" />
    </div>
    <!-- 추가 버튼 -->
    <div><button class="btn btn-outline-warning">+</button></div>
  </div>

  <!-- ----------------------------------------------------------------- -->

  <div id="output_wrap"></div>
</template>

<style>
#input_wrap {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  justify-content: space-between;
}
#date {
  width: 180px;
}
#type {
  width: 170px;
}
#category {
  width: 180px;
}
#title {
  width: 400px;
}
</style>
