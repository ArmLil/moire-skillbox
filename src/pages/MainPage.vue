<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> 152 товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :filter-materials.sync="filterMaterials"
        :filter-seasons.sync="filterSeasons"
        :filter-colors.sync="filterColors"
        :current-page.sync="page"
      />
      <div class="home">
        <section class="catalog">
          <Loader v-if="productLoading" />
          <div v-if="productsLoadingFailed">
            Произашла ошибка при загрузке товаров
            <button @click.prevent="loadProducts">Попробовать еще раз</button>
          </div>
          <ProductList v-if="!productLoading" :products="products" />
          <BasePagination :count="productCount" :per-page="productsPerPage" v-model="page" />
        </section>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import ProductList from "@/components/ProductList.vue"; // @ is an alias to /src
import ProductFilter from "@/components/ProductFilter.vue";
import BasePagination from "@/components/BasePagination.vue";
import Product from "@/types/Product";
import Material from "@/types/Material";
import Season from "@/types/Season";
import Color from "@/types/Color";
import { API_BASE_URL } from "@/config";
import Loader from "@/components/Loader.vue";

export default Vue.extend({
  name: "ProductPage",
  components: {
    ProductList,
    ProductFilter,
    BasePagination,
    Loader,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      page: 1,
      productsPerPage: 4,
      filterMaterials: [],
      filterSeasons: [],
      filterColors: [],
      productsData: { items: [], pagination: { page: 1, pages: 1, total: 10 } },
      productLoading: false,
      productsLoadingFailed: false,
      loadProductsTimer: 0,
      materialIds: [],
      seasonIds: [],
      colorIds: [],
    };
  },
  computed: {
    products(): Product[] {
      return this.productsData.items;
    },
    productCount(): number {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + "api/products", {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              materialIds: this.materialIds,
              seasonIds: this.seasonIds,
              colorIds: this.colorIds,
            },
          })
          .then((response: any) => {
            if (response.data) {
              this.productsData = response.data;
            } else throw new Error("Incorrect response");
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productLoading = false;
          });
      }, 1000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterMaterials(values) {
      this.materialIds = values.map((el: Material) => el.id);
      this.loadProducts();
    },
    filterSeasons(values) {
      this.seasonIds = values.map((el: Season) => el.id);
      this.loadProducts();
    },
    filterColors(values) {
      this.colorIds = values.map((el: Color) => el.id);
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
});
</script>
