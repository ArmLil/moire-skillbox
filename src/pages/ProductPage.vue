<template>
  <div class="home">
    <div id="app"></div>

    <section class="catalog">
      <!-- <ul class="catalog__list">

      </ul> -->
      <ProductList :products="products" />
      <ul class="catalog__pagination pagination">
        <li class="pagination__item">
          <a
            class="pagination__link pagination__link--arrow pagination__link--disabled"
            aria-label="Предыдущая страница"
          >
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-left"></use>
            </svg>
          </a>
        </li>
        <li class="pagination__item">
          <a class="pagination__link pagination__link--current"> 1 </a>
        </li>
        <li class="pagination__item">
          <a class="pagination__link" href="#"> 2 </a>
        </li>
        <li class="pagination__item">
          <a class="pagination__link" href="#"> 3 </a>
        </li>
        <li class="pagination__item">
          <a class="pagination__link" href="#"> 4 </a>
        </li>
        <li class="pagination__item">
          <a class="pagination__link" href="#"> ... </a>
        </li>
        <li class="pagination__item">
          <a class="pagination__link" href="#"> 10 </a>
        </li>
        <li class="pagination__item">
          <a
            class="pagination__link pagination__link--arrow"
            href="#"
            aria-label="Следующая страница"
          >
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductList from "@/components/ProductList.vue"; // @ is an alias to /src
import products from "@/data/products";
import Product from "@/types/Product";

export default Vue.extend({
  name: "ProductPage",
  components: {
    ProductList,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products(): any {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
  },
});
</script>
