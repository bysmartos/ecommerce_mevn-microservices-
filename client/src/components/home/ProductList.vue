<template>
     <div class="row">
    <div
      class="col"
      v-for="(product, index) in products"
      :key="index"
    >
     
        <div class="card" style="width: 18rem; cursor: pointer; "  
          @click="$router.push(`/product/${product._id}`)">
  <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
  <div class="card-body">
    <h5 class="card-title">{{product.title}}</h5>
    <p class="card-text">{{product.desc}}</p>
    <a href="#" class="btn btn-primary">Add to</a>
  </div>
</div>
       
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import  IProduct  from "../../interfaces/product.interface";
  import { getProducts } from "../../services/product.service";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "product-list",
    data() {
      return {
        products: [] as IProduct[],
      };
    },
    methods: {
      async loadProducts() {
        try {
          const res = await getProducts();
          console.log(res);
          this.products = res.data.products;
        } catch (error) {
          console.error(error);
        }
      },
    },
    mounted() {
      this.loadProducts();
    },
  });
  </script> 