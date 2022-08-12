<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> 152 товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter />
      <div class="home">
        <section class="catalog">
          <ProductList :products="products" />
          <BasePagination :count="productCount" :per-page="productsPerPage" v-model="page" />
        </section>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import ProductList from "@/components/ProductList.vue"; // @ is an alias to /src
import ProductFilter from "@/components/ProductFilter.vue";
import BasePagination from "@/components/BasePagination.vue";
import products from "@/data/products";
import Product from "@/types/Product";

export default Vue.extend({
  name: "ProductPage",
  components: {
    ProductList,
    ProductFilter,
    BasePagination,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products(): Product[] {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    productCount(): number {
      return products.length;
    },
  },
});
</script>
