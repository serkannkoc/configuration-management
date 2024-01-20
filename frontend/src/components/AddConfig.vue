<template>
  <div>
    <form @submit.prevent="addConfigForm" class="d-flex">
      <div class="col-md-2 me-1">
        <input v-model="config.paramKey" type="text" placeholder="New Parameter" class="form-control mt-2" required>
      </div>
      <div class="col-md-2 me-1">
        <input v-model="config.value" type="text" placeholder="Value" class="form-control mt-2" required>
      </div>
      <div class="col-md-6 me-1">
        <input v-model="config.description" type="text" placeholder="New Description" class="form-control mt-2" required>
      </div>
      <div class="col-md-2">
        <button type="submit" class="btn btn-primary mt-2">Add</button>

      </div>
    </form>

  </div>
</template>



<script>

import ConfigurationService from "../services/configurationService";

export default {
  data() {
    return {
      config: {
        paramKey:"",
        value:"",
        description:"",
      },
    };
  },
  methods: {
    async addConfigForm() {
      try {
        const response = await ConfigurationService.add(this.config);
        alert("Configuration added successfully!");
        this.$emit("configAdded",response.config)
        this.config = {
          paramKey: "",
          value: "",
          description: "",
        };
      } catch (error) {
        alert("Error adding configuration. Please try again.");
      }
    },
  },
};
</script>

<style scoped src="../scss/AddConfig.scss"></style>
