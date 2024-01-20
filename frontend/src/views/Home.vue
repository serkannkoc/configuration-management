<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../assets/icon.png" alt="Codeway" class="logo-img">
      </a>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="../assets/account.png" alt="Profile" class="profile-img">
            </a>
            <ul class="dropdown-menu">
              <li ><router-link class="dropdown-item" aria-current="page" :to="{ name: 'signIn' }" @click.prevent="signOut">Sign out</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
  </nav>
  <config-table class="m-4"></config-table>

</template>


<script>
import {mapStores} from "pinia";
import {useAuthStore} from "../stores/authStore.js";
import ConfigTable from "../components/ConfigTable.vue";

export default {
  components:{
    ConfigTable,
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    signOut() {
      this.authStore.logout();
    },
  },
};
</script>

<style scoped src="../scss/Home.scss"></style>


