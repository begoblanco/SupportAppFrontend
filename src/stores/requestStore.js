// src/store/requestStore.js

import { defineStore } from 'pinia';

export const useRequestStore = defineStore({
  id: 'request',
  state: () => ({
    requests: [],
    error: null,
  }),
  actions: {
    async fetchAllRequests() {
      try {
        const response = await fetch('http://localhost:8080/api/support-requests/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.requests = data;
      } catch (error) {
        this.error = error.message;
      }
    },

   async addRequest(newRequest) {
      try {
        const response = await fetch('http://localhost:8080/api/support-requests/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRequest),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const createdRequest = await response.json();
        this.requests.push(createdRequest);
      } catch (error) {
        this.error = error.message;
      }
    },

    async updateRequest(id, updatedRequest) {
      try {
        const response = await fetch(`http://localhost:8080/api/support-requests/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRequest),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedRequestIndex = this.requests.findIndex(req => req.id === id);
        if (updatedRequestIndex !== -1) {
          this.requests[updatedRequestIndex] = updatedRequest;
        }
      } catch (error) {
        this.error = error.message;
      }
    },

    async deleteRequest(id) {
      try {
        const response = await fetch(`http://localhost:8080/api/support-requests/delete/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.requests = this.requests.filter(req => req.id !== id);
      } catch (error) {
        this.error = error.message;
      }
    },
  },

});