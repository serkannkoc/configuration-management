<template>
  <div class="modal fade" id="configDeleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Configuration</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="deleteConfigForm">
            <p>Configuration will be deleted. Are you sure?</p>
            <div class="mt-2">
              <button
                  type="button"
                  class="btn btn-danger me-2"
                  data-bs-dismiss='modal'
                  @click="deleteConfigForm"
              >
                Delete
              </button>
              <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
              >
                Close
              </button>

            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import ConfigurationService from "../services/configurationService";

export default {
  data() {
    return {
        id: "",
    }
  },
  methods: {
    assignDataToDeleteModal(id) {
      this.id = id;
    },
    async deleteConfigForm() {
      try {
        await ConfigurationService.delete(this.id);
        alert("Configuration deleted successfully");
        this.$emit("configDeleted",this.id)
      } catch (error) {
        alert("Error deleting configuration. Please try again.");
      }
    }

  }
}
</script>

<style scoped>
.custom-modal-footer {
  position: relative; /* or any other positioning style you want */

}
</style>