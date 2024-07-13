<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRequestStore } from "../stores/requestStore";

const route = useRoute();
const router = useRouter();
const requestStore = useRequestStore();
const requestId = route.params.id;

const editRequest = ref({
  requesterName: "",
  topic: "",
  description: "",
  date: "",
});

onMounted(async () => {
  await requestStore.fetchAllRequests();
  const request = requestStore.requests.find((req) => req.id === requestId);
  if (request) {
    editRequest.value = { ...request };
  } else {
    console.error("Request not found");
    router.push("/request-list");
  }
});

const handleSubmit = async () => {
  try {
    await requestStore.updateRequest(requestId, editRequest.value);
    router.push("/request-list");
  } catch (error) {
    console.error("Error updating request:", error);
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Edit Request Form</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="requesterName" class="form-label">Requester Name</label>
            <input
              v-model="editRequest.requesterName"
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
              v-model="editRequest.topic"
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
              v-model="editRequest.description"
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
              v-model="editRequest.date"
              type="date"
              class="form-control"
              id="date"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Update</button>
          <router-link to="/request-list" class="btn btn-secondary"
            >Cancel</router-link
          >
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  margin-inline: auto;
  margin-top: 20%;
  margin-bottom: 20%;
}
</style>
