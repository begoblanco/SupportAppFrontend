<script setup>
import { ref, onMounted } from 'vue';
import { useRequestStore } from '../stores/requestStore';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: String,
});

const emit = defineEmits(['cancel']);

const router = useRouter();
const requestStore = useRequestStore();
const request = ref({
  requesterName: '',
  topic: '',
  description: '',
  requestDate: '',
});

onMounted(() => {
  const selectedRequest = requestStore.getRequestById(props.id);
  if (selectedRequest) {
    console.log(selectedRequest)
    request.value = { ...selectedRequest };
    console.log(request.value);
  }
});

const handleSubmit = async () => {
  try {
    await requestStore.updateRequest(request.value.id, request.value);
    emit('cancel');
  } catch (error) {
    console.error('Error al enviar los cambios:', error);
  }
};

const cancelEdit = () => {
  emit('cancel');
};
</script>

<template>
  <div class="container mt-4">
    <h2>Edit Request Form</h2>
    <div class="card no-border form-card mt-4" >
      <div class="card-header no-border">
        <h5 class="card-title">Edit Request Form</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="requesterName" class="form-label">Requester Name</label>
            <input
              v-model="request.requesterName"
              type="text"
              class="form-control"
              id="requesterName"
              placeholder="Enter requester name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="topic" class="form-label">Topic</label>
            <input
              v-model="request.topic"
              type="text"
              class="form-control"
              id="topic"
              placeholder="Enter topic"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              v-model="request.description"
              class="form-control"
              id="description"
              rows="3"
              placeholder="Enter description"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Date</label>
            <input
              v-model="request.requestDate"
              type="datetime-local"
              class="form-control"
              id="date"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary m-1">Submit</button>
          <button type="button" class="btn btn-secondary m-1" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

h2 {
  color: #f6e9e9;
  text-align: center;
  margin-top: 5%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  flex-direction: column;
}

.card {
  border-radius: 10px;
  background-color: #635d5d;
  color: #f6e9e9;
}

.card-header {
  background-color: #222529;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-title {
  margin-bottom: 0;
}

.card-text {
  margin-bottom: 0.5rem;
}

.no-border {
  border: none;
  box-shadow: none;
}

.form-label {
  color: #f6e9e9;
}

.form-control {
  background-color: #f6e9e9;
  border: none;
  color: #635d5d;
}

.btn-primary {
  background-color: #f6e9e9;
  color: #635d5d;
  border: none;
}

.btn-secondary {
  background-color: #222529;
  color: #f6e9e9;
  border: none;
}

.btn-link {
  color: #f6e9e9;
}

@media (min-width: 768px) {
  .form-card {
    max-width: 600px;
    width: 100%;
  }
}

</style>