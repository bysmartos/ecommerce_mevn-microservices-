<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-black">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Ecommerce</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <template v-if="!store.state.user">
            <li class="nav-item">
              <router-link class="nav-link" to="/signin">SignIn</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/signup">SignUp</router-link>
            </li>
          </template>
          <li class="nav-item">
              <router-link class="nav-link" to="/user">User</router-link>
            </li>
       
        <template v-if="store.state.user">
           
            <template v-if="store.state.user.isAdmin">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin">Admin</router-link>
              </li>
            </template>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout">Logout</a>
            </li>
          </template>
          <li class="nav-item">
          <a class="nav-link" href="#">Cart</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-sm-2" type="search" placeholder="Search">
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import store from "../store";
  
  export default defineComponent({
    name: "Navbar-n",
    computed: {
    store(): typeof store {
      return store;
    }
  },
    methods: {
    logout() {
      store.dispatch('logout');
      this.$router.push({ name: "products" });
    },
   
  }
  });
  </script>