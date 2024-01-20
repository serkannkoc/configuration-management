<template>
  <div class="container-xxl d-flex flex-column align-items-center justify-content-center min-vh-100">
    <div class="col-md-2">
      <img src="../assets/icon.png" class="img-fluid" alt="marmara university logo">
    </div>
    <h4 class="mt-3 custom-h4">Please sign in</h4>
    <div class="col-md-2 mt-4 ">
      <form class="row g-3" @submit.prevent="loginForm">
        <input v-model="email" type="email" placeholder="E-mail address" class="form-control mt-2" required>
        <input v-model="password" type="password" placeholder="Password" class="form-control mt-0" required>
        <button type="submit" class="btn btn-primary mt-2">Sign in</button>
      </form>
    </div>
    <h6 class="fs-6 mt-5 custom-h6">Codeway © 2021</h6>
  </div>
</template>

<script>
import AuthService from '../services/authService';
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginForm() {
      try {
        await AuthService.login(this.email, this.password);
        this.$router.push({name: "home"});
      } catch (error) {
        alert("Login failed. Please check your credentials.")
      }
    },
  },
};
</script>


<style scoped src="../scss/Login.scss"></style>
