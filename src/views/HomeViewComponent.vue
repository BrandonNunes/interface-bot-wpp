<template>
  <div class="container-home" >
    <article class="container-status">
      <p>Status connection: <span>{{store.state.statusConnection}}</span></p>
      <p>Name connection: <span>{{store.state.sectionName}}</span></p>
    </article>
    <article class="container-qr-code" >
      <img
          v-if="store.state.stringQrCode"
          :src="store.state.stringQrCode"
          style="max-width: 300px;">
      <p v-if="!store.state.stringQrCode">Não foi encontrado um QrCode disponível!</p>
    </article>
  <section class="container-actions" >
    <Button label="Start / Restart" class="p-button-info" @click="startBot" />
    <Button label="Disconnect" class="p-button-danger" @click="logoutBot" />
    <img v-if="loading" src="src/assets/spinnerLoading.gif" alt="loading" width="50" />
    <small v-if="waitRead" >aguardando leitura...</small>
  </section>
  </div>
    <section class="container-logs" v-if="store.state.connectionBot || statusRead" >
      <p>{{store.state.connectionBot}}</p>
      <p>{{statusRead}}</p>
    </section>

</template>

<script setup lang="ts">
import Button from 'primevue/button';
import {useStore} from "vuex";
import bot from "@/services/bot.service";
import {ref} from "vue";

const store = useStore()
let loading = ref(false)
let waitRead = ref(false)
let statusRead = ref("")
const startBot = async () => {
  loading.value = true
  waitRead.value = true
  store.commit('changeStringQrCode', '')
  try {
    const resp = await bot.get('/start')
    console.log(resp.data)
    loading.value = false
    waitRead.value = false
    getStatus()
  }catch (e) {
    console.log(e)
    loading.value = false
    waitRead.value = false
    setTimeout(() => {
      getStatus()
    }, 3000)
  }
}
const logoutBot = async () => {
  loading.value = true
  try {
    const resp = await bot.get('/logout')
    console.log(resp.data)
    loading.value = false
    getStatus()
  }catch (e) {
    console.log(e)
    loading.value = false
    getStatus()
  }
}
const getStatus = async () => {

  try {
    const resp = await bot.get('/status')
    console.log(resp.data.response)
    statusRead.value = resp.data.response
  }catch (e: any) {
    console.log(e)
    if (e.data) {
      statusRead.value = e.data
    }
  }
}
getStatus()

</script>

<style scoped>
  .container-home {
    /*background-color: antiquewhite;*/
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 4px;
    column-gap: 10px;
    row-gap: 10px;
  }

  .container-status {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #2c3e50;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .container-status p {
    font-weight: bold;
    text-transform: uppercase;
  }
  .container-status p span {
    color: #2c3e50;
    text-decoration: underline;
  }
  .container-qr-code {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #2c3e50;
    display: flex;
    justify-content: center;
  }
  .container-actions {
    border-radius: 5px;
    border: 1px solid #000;
    min-height: 80px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .container-actions .btn-action {
    border: none;
    padding: 5px;
    border-radius: 5px;
    color: #FFFFFF;
    background-color: #2c3e50;
    cursor: pointer;
  }
  .btn-disconect {
    background-color: #dd0000!important;
  }
  .container-logs {
    background-color: #2E0922;
    min-height: 100px;
    color: #7D5C6C;
    padding: 10px;
  }
  @media (max-width: 480px){
    .container-home {
      grid-template-columns: 1fr;
    }
    .container-status {
     min-height: 100px;
    }
  }

</style>
