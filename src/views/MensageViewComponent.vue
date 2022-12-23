<template>
  <Card>
    <template #header style="padding: 10px;">
      <i class="pi pi-envelope" style="font-size: 2rem"></i>
    </template>
    <template #content >
      <div class="content-card" >
        <InputMask v-model="number" mask="99 (99)9 9999-9999" placeholder="+55 (99)9 9999-9999" />
        <Textarea v-model="message" :autoResize="true" rows="5" cols="30" placeholder="Sua mensagem..." />
      </div>
    </template>
    <template #footer>
      <Button
          @click="sendMessage"
          icon="pi pi-send" label="Enviar" :disabled="!message || number.length < 12" :loading="isLoading" />
    </template>
  </Card>
  <Toast position="bottom-center" />

</template>

<script setup lang="ts" >
import Card from 'primevue/card';
import Button from "primevue/button";
import InputMask from 'primevue/inputmask';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import {ref} from "vue";
import bot from "@/services/bot.service";

let number = ref("")
let message = ref("")
let isLoading = ref(false)
const toast = useToast();
// toast.add({severity:'success', summary: 'Sucesso', detail:'Message Content', life: 3000});
// toast.add({severity:'warn', summary: 'Falha', detail:'Message Content', life: 3000});


const sendMessage = async () => {
  isLoading.value = true;
  const payload = {
    number: number.value
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '')
        .replace(/[' ']/g, ''),
    message: message.value
  }
  try {
    const resp = await bot.post('/enviarmensagem', payload)
    toast.add({severity:'success', summary: 'Sucesso', detail: `${resp.data.mensagem || 'Sucesso'}`, life: 5000});
    isLoading.value = false;
    number.value = ""
    message.value = ""
  }catch (e: any) {
    console.warn(e)
    toast.add({severity:'warn', summary: 'Falha', detail:`${e.request.mensagem || 'Falha ao enviar mensagem'}`, life: 5000});
    isLoading.value = false;
  }
}

</script>

<style scoped>
  .content-card {
    display: flex;
    flex-direction: column;
  }

</style>
