<template>
  <div class="modal fade" id="configEditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog  modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Configuration</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="configEditForm">
            <div class="form-group">
              <label class="form-label">Parameter Key</label>
              <input
                  v-model="config.paramKey"
                  type="text"
                  class="form-control"
                  required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Value</label>
              <input
                  v-model="config.value"
                  type="text"
                  class="form-control"
                  required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <input
                  v-model="config.description"
                  type="text"
                  class="form-control"
                  required
              />
            </div>
            <div class="mt-2">
              <button
                  type="submit"
                  class="btn btn-primary me-2 "
              >
                Save
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
      config: {
        id:"",
        paramKey:"",
        description:"",
        value:"",
      },
    }
  },
  created() {
  },
  methods: {
    assignDataToEditModal(config) {
      this.config = config;
    },
    async configEditForm() {
      try {
        await ConfigurationService.update(this.config.id, {
          paramKey: this.config.paramKey,
          description: this.config.description,
          value: this.config.value,
          updatedAt: this.config.updatedAt,
        });
        alert("Configuration updated successfully");
        this.$emit("configEdited", this.config)
      } catch (error) {
        if (error.response.data.message === 'Conflict: Document has been modified by another transaction.') {
          alert('Conflict: Another user has updated the configuration. Please refresh and try again.');
        } else {
          alert("Error updating configuration. Please try again.");
        }
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