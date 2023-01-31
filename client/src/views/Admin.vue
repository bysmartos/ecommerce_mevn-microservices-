<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="btn-group" role="group">
        <router-link class="btn btn-primary" to="/product-new">Agregar Producto</router-link>
        <router-link class="btn btn-secondary" to="/user-all">Ver Usuarios</router-link>
        <router-link class="btn btn-success" to="/cart-all">Ver Carritos</router-link>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Admin-view",
});
</script>