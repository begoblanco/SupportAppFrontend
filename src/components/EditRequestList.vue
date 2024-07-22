<script setup>
import { useRequestStore } from "../stores/requestStore";
import { computed, onMounted, defineEmits } from "vue";

const requestStore = useRequestStore();
const requests = computed(() => requestStore.requests);
const emit = defineEmits(["edit"]);

onMounted(() => {
  requestStore.fetchAllRequests();
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB');
};

const emitEdit = (id) => {
  emit("edit", id);
};
</script>

<template>
  <div class="container mt-4">
    <h2>Edit Requests</h2>
    <div class="row mt-4">
      <div
        class="col-12 col-sm-6 col-md-4 mb-4"
        v-for="request in requests"
        :key="request.id"
      >
        <div class="card no-border h-100">
          <div class="card-header no-border">
            <h4 class="card-title">{{ request.requesterName }}</h4>
          </div>
          <div class="card-body d-flex flex-column">
            <p class="card-text"><strong>Topic:</strong> {{ request.topic }}</p>
            <p class="card-text">
              <strong>Description:</strong> {{ request.description }}
            </p>
            <p class="card-text mt-auto">
              <strong>Date:</strong> {{ formatDate(request.requestDate) }}
            </p>
            <div class="btn-container">
              <button class="btn btn-primary mt-3" @click="emitEdit(request.id)">
                Edit
              </button>
          </div>
        </div>
      </div>
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

.btn-primary {
  background-color: #f6e9e9;
  color: #635d5d;
  border: none;
}

.btn-container {
  display: flex;
  justify-content: center;
}

@media (max-width: 576px) {
  .card {
    margin-bottom: 20px;
  }
}
</style>
