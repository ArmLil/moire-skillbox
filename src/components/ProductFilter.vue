<template lang="html">
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo" />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors colors--black">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="checkbox"
                name="color"
                :value="color"
                checked=""
                v-model="currentColors"
              />
              <span class="colors__value" v-bind:style="{ 'background-color': color.code }"> </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials" :key="material.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="material"
                v-model="currentMaterials"
                checked=""
              />
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasons" :key="season.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season"
                v-model="currentSeasons"
                checked=""
              />
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button
        class="filter__reset button button--second"
        type="button"
        v-if="resetButton"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config";

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentMaterials: [],
      currentSeasons: [],
      categoriesData: null,
      apiMaterials: null,
      apiSeasons: null,
      apiColors: null,
      currentColors: [],
      resetButton: false,
    };
  },
  props: ["priceFrom", "priceTo", "categoryId", "filterMaterials", "filterSeasons", "filterColors"],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    materials() {
      return this.apiMaterials ? this.apiMaterials.items : [];
    },
    seasons() {
      return this.apiSeasons ? this.apiSeasons.items : [];
    },
    colors() {
      return this.apiColors ? this.apiColors.items : [];
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    filterMaterials(value) {
      this.currentMaterials = value;
    },
    filterSeasons(value) {
      this.currentSeasons = value;
    },
    filterColors(value) {
      this.currentColors = value;
    },

    currentPriceFrom() {
      this.actResetButton();
    },
    currentPriceTo() {
      this.actResetButton();
    },
    currentCategoryId() {
      this.actResetButton();
    },
    currentMaterials() {
      this.actResetButton();
    },
    currentSeasons() {
      this.actResetButton();
    },
    currentColors() {
      this.actResetButton();
    },
  },
  methods: {
    submit() {
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:filterMaterials", this.currentMaterials);
      this.$emit("update:filterSeasons", this.currentSeasons);
      this.$emit("update:filterColors", this.currentColors);
      this.$emit("update:currentPage", 1);
    },
    reset() {
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryId = 0;
      this.currentMaterials = [];
      this.currentSeasons = [];
      this.currentColors = [];
      this.$emit("update:priceFrom", 0);
      this.$emit("update:priceTo", 0);
      this.$emit("update:categoryId", 0);
      this.$emit("update:filterMaterials", []);
      this.$emit("update:filterSeasons", []);
      this.$emit("update:currentPage", 1);
      this.$emit("update:filterColors", []);
    },
    actResetButton() {
      if (
        this.currentPriceFrom > 0 ||
        this.currentPriceTo > 0 ||
        this.currentCategoryId > 0 ||
        this.currentMaterials.length > 0 ||
        this.currentSeasons.length > 0 ||
        this.currentColors.length > 0
      ) {
        this.resetButton = true;
      } else this.resetButton = false;
    },
    loadCategories() {
      axios.get(API_BASE_URL + "api/productCategories").then((response) => {
        this.categoriesData = response.data;
      });
    },
    loadMaterials() {
      axios.get(API_BASE_URL + "api/materials").then((response) => {
        this.apiMaterials = response.data;
      });
    },
    loadSeasons() {
      axios.get(API_BASE_URL + "api/seasons").then((response) => {
        this.apiSeasons = response.data;
      });
    },
    loadColors() {
      axios.get(API_BASE_URL + "api/colors").then((response) => {
        this.apiColors = response.data;
      });
    },
  },
  created() {
    this.loadCategories();
    this.loadMaterials();
    this.loadSeasons();
    this.loadColors();
  },
};
</script>

<style lang="css" scoped></style>
