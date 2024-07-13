<script>
import { computed, onMounted } from 'vue';
import {useRequestStore} from '../stores/requestStore.js';

export default {
  name: 'RequestsList',
  setup() {
    const requestStore = useRequestStore();
    const requests = computed(() => requestStore.requests);
    onMounted(() => {
      requestStore.fetchAllRequests();  
    });

    return { requests };
  },
};
</script>

<template>
    <div class="container mt-4">
      <h2>Request List</h2>
      <ul>
        <li v-for="request in requests" :key="request.id">
          <h4>{{ request.requesterName }}</h4>
          <p>{{ request.topic }}</p>
          <p>{{ request.description }}</p>
          <p>{{ request.requestDate }}</p>
        </li>
      </ul>
    </div>
  </template>