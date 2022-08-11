<template>
  <ul class="hello">
    <ProductItem v-for="(product, index) in products" :key="index" :product="product" />
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Product from "@/types/Product";
import ProductItem from "@/components/ProductItem.vue";

export default Vue.extend({
  name: "ProductList",
  props: {
    products: Array as PropType<Product[]>,
  },
  components: { ProductItem },
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
