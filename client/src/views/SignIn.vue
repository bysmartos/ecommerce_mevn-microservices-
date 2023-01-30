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
            Sign in
          </button>
        </form>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import store from '../store';
    import IUserLogin from '../interfaces/login.interface'
  import { login } from "../services/auth.service";
  import { mapActions } from 'vuex'
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
          const res :any = await login(this.loginForm);
          console.log(res.data.user._doc);
          const user= res.data.user._doc;
    const accessToken = res.data.acces_token;
    store.dispatch('login', { user, accessToken });
          this.$router.push({ name: "products" });
        } catch (error) {
          console.error(error);
        }
      
      }
    }
  })
  </script>
  