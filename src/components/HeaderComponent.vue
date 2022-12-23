<template>
  <header class="header" >
    <h4 class="title" >{{ title}}</h4>
  </header>

</template>

<script setup lang="ts">

import { defineProps} from "vue";
defineProps<{title: string}>()


</script>

<style scoped>
  .header {
    background-color: #2c3e50;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
    width: 100vw;
  }
  .title {
    color: #FFFFFF;
    font-weight: bold;
  }

</style>
