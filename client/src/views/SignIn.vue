<template>
    <div class="container">
  
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <form @submit.prevent="submitForm()">
          <input
            class="form-control mb-3"
            placeholder="Email"
            type="email"
            v-model="loginForm.email"
            autofocus
          />
          <input
            class="form-control mb-3"
            placeholder="password"
            type="password"
            v-model="loginForm.password"

          />
          <button
            class="btn btn-primary "
          >
            save
          </button>
        </form>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  import { login } from "../services/auth.service";
  export default defineComponent({
    data() {
      return {
        loginForm: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async submitForm() {
        try {
          const res = await login(this.loginForm);
          console.log(res);
          this.$router.push({ name: "products" });
        } catch (error) {
          console.error(error);
        }
      
      }
    }
  })
  </script>
  