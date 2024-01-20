<template>
  <div>
    <delete-config-modal ref="deleteModal" @configDeleted="handleConfigDeleted"></delete-config-modal>
    <edit-config-modal ref="editModal" @configEdited="handleConfigEdited" ></edit-config-modal>
    <table class="table table-borderless">
      <thead>
      <tr>
        <th scope="col" class="col-md-2">Parameter Key</th>
        <th scope="col" class="col-md-2">Value</th>
        <th scope="col" class="col-md-3">Description</th>
        <th scope="col" class="col-md-3">Create Date</th>
        <th scope="col" class="col-md-2"></th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(config) in configs" :key="config.id">
        <td data-label="Parameter Key: ">{{ config.paramKey }}</td>
        <td data-label="Value: ">{{ config.value }}</td>
        <td data-label="Description: ">{{ config.description }}</td>
        <td data-label="Create Date: ">{{ config.createDate }}</td>
        <td class="mb-2">
          <button class="btn btn-primary me-4" data-bs-toggle="modal" data-bs-target="#configEditModal"
                  @click="openEditModal(config)">
            Edit
          </button>
          <button v-if="isMobile" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#configDeleteModal" @click="openDeleteModal(config.id)">
            Del
          </button>
          <button v-else class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#configDeleteModal" @click="openDeleteModal(config.id)">
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <add-config @configAdded="handleConfigAdded"></add-config>
  </div>
</template>

<script>
import ConfigurationService from "../services/configurationService";
import DeleteConfigModal from "./DeleteConfigModal.vue";
import EditConfigModal from "./EditConfigModal.vue";
import AddConfig from "./AddConfig.vue";
export default {
  components:{
    DeleteConfigModal,
    EditConfigModal,
    AddConfig,
  },
  data() {
    return {
      configs: null,
      isMobile: false,
    };
  },
  created() {
    this.getConfigs();
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    async getConfigs() {
      try {
        const data = await ConfigurationService.list();
        this.configs = data.configurations;
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    },
    openDeleteModal(id) {
      this.$refs.deleteModal.assignDataToDeleteModal(id);
    },
    openEditModal(config) {
      const newConfigObject = { ...config };
      this.$refs.editModal.assignDataToEditModal(newConfigObject);
    },
    handleConfigDeleted(deletedConfigId) {
      this.configs = this.configs.filter((config) => config.id !== deletedConfigId);
    },
    handleConfigEdited(editedConfig) {
      const newConfigObject = { ...editedConfig };
      this.configs = this.configs.map((config) =>
          config.id === newConfigObject.id ? newConfigObject : config
      );
    },
    handleConfigAdded(newConfig) {
      this.configs.push(newConfig);
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
};
</script>

<style scoped src="../scss/ConfigTable.scss"></style>
