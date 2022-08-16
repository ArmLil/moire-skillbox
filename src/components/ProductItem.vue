<template lang="html">
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="img" :alt="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="_color in product.colors" :key="_color.color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="_color"
            checked=""
            v-model="color"
          />
          <span
            class="colors__value"
            v-bind:style="{ 'background-color': _color.color.code, border: '1px solid grey' }"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import gotoPage from "@/helpers/gotoPage";
import numberFormat from "@/helpers/numberFormat";
import Product from "@/types/Product";

export default Vue.extend({
  name: "ProductItem",
  props: {
    product: Object as PropType<Product>,
  },
  data() {
    return {
      color: this.product.colors[0],
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
  computed: {
    img(): string | null {
      if (this.color.gallery) {
        return this.color.gallery[0].file.url;
      }
      return null;
    },
  },
});
</script>

<style lang="css" scoped></style>
