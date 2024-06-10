<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
  />
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script setup>
import Header from '@/components/Header.vue';
</script>
