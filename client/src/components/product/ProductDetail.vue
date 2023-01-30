<template>
   <div class="container">
		
					<div class="details col-md-6">
						<h3 class="product-title">{{currentProduct.title}}</h3>
						<p class="product-description">{{currentProduct.desc}}</p>
						<h4 class="price">current price: {{currentProduct.price}}</h4>
				
				</div>
      </div>
			
  </template>
 
  <script lang="ts">
  import IProduct from "../..//interfaces/product.interface";
import { defineComponent } from "vue";
  import { getProduct } from "../../services/product.service";
  
  export default defineComponent({
    name: "product-details",
    data() {
      return {
        currentProduct: {} as IProduct,
      };
    },
    methods: {
      async loadProduct(id: string) {
        try {
          const res  = await getProduct(id);
          this.currentProduct = res.data.product;
          console.log(res.data);
        } catch (error) {
          console.error(error);
        }
      },},
   
    mounted() {
      if (typeof this.$route.params.id === "string") {
        this.loadProduct(this.$route.params.id);
      }
    },
  });
  </script> 