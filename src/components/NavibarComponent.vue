<script setup lang="ts">
import {RouterLink} from "vue-router";

</script>

<template>
  <nav class="nav" >
    <ul class="nav-group" >
      <li class="nav-item"><RouterLink to="home" >Home</RouterLink></li>
      <li class="nav-item"><RouterLink to="mensagem" >Mensagem</RouterLink></li>
    </ul>

  </nav>

</template>

<style scoped>
  .nav {
    background-color: #f1f1f1;
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: center;
    color: #2c3e50;
  }
  .nav-group {
    display: flex;
    list-style: none;
    gap: 10px;
  }
  .nav-item:hover a {
    cursor: pointer;
    background-color: #2c3e50;
    color: #FFFFFF;
    padding: 5px;
    font-weight: bold;
    border-radius: 5px;
  }
  a {
    text-decoration: none;
    color: #2c3e50;
  }
  .router-link-active {
    cursor: pointer;
    background-color: #6891bb;
    color: #FFFFFF;
    padding: 5px 10px 5px 10px;
    font-weight: bold;
    border-radius: 5px;
  }
</style>
