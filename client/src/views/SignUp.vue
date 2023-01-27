<template>
    <div class="container">
  
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <form @submit.prevent="submitForm()">
          <input
            class="form-control mb-3"
            placeholder="Email"
            type="email"
            v-model="registerForm.email"
            autofocus
          />
          <input
            class="form-control mb-3"
            placeholder="Userame"
            type="text"
            v-model="registerForm.username"
            autofocus
          />
          <input
            class="form-control mb-3"
            placeholder="password"
            type="password"
            v-model="registerForm.password"

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
  import { register } from "../services/auth.service";
  export default defineComponent({
    data() {
      return {
        registerForm: {
          email: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async submitForm() {
        try {
          const res = await register(this.registerForm);
          console.log(res);
          this.$router.push({ name: "products" });
        } catch (error) {
          console.error(error);
        }
      
      }
    }
  })
  </script>
  