<script setup>
import { ref } from "vue";
import { useRequestStore } from "../stores/requestStore";

const newRequest = ref({
  requesterName: "",
  topic: "",
  description: "",
  requestDate: "",
});

const requestStore = useRequestStore();

const handleSubmit = async () => {
  try {
    console.log("Submitting request:", newRequest.value);
    let cleanRequest = {...newRequest.value};
    console.log(cleanRequest);
    await requestStore.addRequest(cleanRequest);
    resetForm();
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
};


const resetForm = () => {
  newRequest.value.requesterName = "";
  newRequest.value.topic = "";
  newRequest.value.description = "";
  newRequest.value.requestDate = "";
};
</script>

<template>
  <div class="container mt-4">
    <h2>Request Form</h2>
    <div class="card no-border form-card mt-4">
      <div class="card-header no-border">
        <h5 class="card-title">New Request Form</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="requesterName" class="form-label">Requester Name</label>
            <input
              v-model="newRequest.requesterName"
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
              v-model="newRequest.topic"
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
              v-model="newRequest.description"
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
              v-model="newRequest.requestDate"
              type="datetime-local"
              class="form-control"
              id="date"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary m-1">Submit</button>
          <button type="reset" class="btn btn-secondary m-1" @click="resetForm">Reset</button>
          <router-link to="/request-list" id="cancel-btn" class="btn btn-link">Cancel</router-link>
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
