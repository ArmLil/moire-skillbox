<template>
  <ul class="hello">
    <li class="catalog__item" v-for="(product, index) in products" :key="index">
      <a class="catalog__pic" href="#">
        <img :src="product.image" :alt="product.title" />
      </a>

      <h3 class="catalog__title">
        <a href="#"> {{ product.title }} </a>
      </h3>

      <span class="catalog__price"> {{ product.price }} ₽ </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="(color, index) in product.colors" :key="index">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" :value="color" checked="" />
            <span class="colors__value" v-bind:style="{ 'background-color': color }"> </span>
          </label>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Product from "@/types/Product";

export default Vue.extend({
  name: "ProductList",
  props: {
    products: Array as PropType<Product[]>,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
