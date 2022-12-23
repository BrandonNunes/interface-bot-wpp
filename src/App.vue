<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from "@/components/HeaderComponent.vue";
import NavibarComponent from "@/components/NavibarComponent.vue"
import SocketioService from "@/services/socketio.service";
import {ref} from "vue";
import type {Socket} from "socket.io-client";
import {useStore} from "vuex";

function createConnection() {
  SocketioService.socketConnection()
}
createConnection()
const socket = ref(SocketioService.socket  as Socket)
let qrCode = ref("")
let statusAtual = ref("")
let sectionName = ref("")
let loadingScreen = ref("")
const store = useStore()

socket.value.on('connect', function() {
  console.log('Connected');
  socket.value.emit('events', { test: 'test' });
  socket.value.emit('identity', 0, (response: any) =>
      console.log('Identity:', response),
  );
});
socket.value.on('qrcode', function(data) {
 // console.log(data)
  store.commit('changeStringQrCode', data)
  qrCode = data;
});
socket.value.on('status', function(data) {
  console.log('status conexão', data);
  store.commit('changeStatusConnection', data)
  statusAtual = data
});
socket.value.on('session', function(data) {
  console.log('nome da sessão', data);
  store.commit('changeSectionName', data)
  sectionName = data
});
socket.value.on('loading', function(data) {
  store.commit('changeConnectionBot', data)
  loadingScreen = data
});
</script>

<template>
  <HeaderComponent title="I.Bot" />
  <NavibarComponent />
  <RouterView />
</template>

<style scoped>

</style>
