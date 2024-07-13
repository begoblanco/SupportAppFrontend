<script setup>

import { ref } from 'vue';

import {useRequestStore} from '../stores/requestStore';

const newRequest = ref({
  requesterName: '',
  topic: '',
  description: ''
});

const requestStore = useRequestStore();

const handleSubmit = async () => {
  try {
    await requestStore.addRequest(newRequest.value);
    resetForm();
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
};

const resetForm = () => {
  newRequest.value.requesterName = '';
  newRequest.value.topic = '';
  newRequest.value.description = '';
};
</script>



<template>
    <form @submit.prevent="handleSubmit">
    
      <input v-model="formData.requesterName" type="text" placeholder="Requester Name" required>
      <input v-model="formData.topic" type="text" placeholder="Topic" required>
      <textarea v-model="formData.description" placeholder="Description" required></textarea>
      <input v-model="formData.date" type="date" required>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
      <router-link to="/request-list">Cancel</router-link>
    </form>
  </template>
  
  
  
  
  