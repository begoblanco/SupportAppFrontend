<script setup>
import { ref } from 'vue';
import { useRequestStore } from '../stores/requestStore';

const newRequest = ref({
  requesterName: '',
  topic: '',
  description: '',
  date: '',
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
  newRequest.value.date = '';
};
</script>

<template>
    <div class="container mt-4">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">New Support Request</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="requesterName" class="form-label">Requester Name</label>
              <input v-model="newRequest.requesterName" type="text" class="form-control" id="requesterName" placeholder="Enter requester name" required>
            </div>
            <div class="mb-3">
              <label for="topic" class="form-label">Topic</label>
              <input v-model="newRequest.topic" type="text" class="form-control" id="topic" placeholder="Enter topic" required>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea v-model="newRequest.description" class="form-control" id="description" rows="3" placeholder="Enter description" required></textarea>
            </div>
            <div class="mb-3">
              <label for="date" class="form-label">Date</label>
              <input v-model="newRequest.date" type="date" class="form-control" id="date" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-secondary">Reset</button>
            <router-link to="/request-list" class="btn btn-link">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  
  
  
  