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
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <!-- <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="material"
                v-model="currentMaterial"
              />
              <span class="check-list__desc">
                material.title
                <span>({{ material.count }})</span>
              </span>
            </label>
          </li> -->
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="хлопок"
              />
              <span class="check-list__desc">
                хлопок
                <span>(46)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="шерсть"
              />
              <span class="check-list__desc">
                шерсть
                <span>(20)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="шелк"
              />
              <span class="check-list__desc">
                шелк
                <span>(30)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <!-- <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season"
                v-model="currentSeason"
                checked=""
              />
              <span class="check-list__desc">
                {{ currentSeason.title }}
                <span>({{ currentSeason.title }})</span>
              </span>
            </label>
          </li> -->
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="зима"
              />
              <span class="check-list__desc">
                зима
                <span>(53)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="весна"
              />
              <span class="check-list__desc">
                весна
                <span>(24)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="осень"
              />
              <span class="check-list__desc">
                осень
                <span>(30)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button class="filter__reset button button--second" type="button">Сбросить</button>
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
      currentMaterial: "",
      currentSeason: "",
      categoriesData: null,
      filterMaterials: null,
      filterSeasons: null,
    };
  },
  props: ["priceFrom", "priceTo", "categoryId", "filterMaterial", "filterSeason"],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    materials() {
      return this.filterMaterials ? this.filterMaterials.items : [];
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
    filterMaterial(value) {
      this.currentMaterial = value;
    },
    filterSeason(value) {
      this.currentSeason = value;
    },
  },
  methods: {
    submit() {
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:filterMaterial", this.currentMaterial);
      this.$emit("update:filterSeason", this.currentSeason);
      this.$emit("update:currentPage", 1);
    },
    reset() {
      this.$emit("update:priceFrom", 0);
      this.$emit("update:priceTo", 0);
      this.$emit("update:categoryId", 0);
      this.$emit("update:filterMaterial", "");
      this.$emit("update:filterSeason", "");
      this.$emit("update:currentPage", 1);
    },
    loadCategories() {
      axios.get(API_BASE_URL + "api/productCategories").then((response) => {
        this.categoriesData = response.data;
      });
    },
    loadMaterials() {
      axios.get(API_BASE_URL + "api/materials").then((response) => {
        this.filterMaterials = response.data;
      });
    },
    loadSeasons() {
      axios.get(API_BASE_URL + "api/seasons").then((response) => {
        this.filterSeasons = response.data;
      });
    },
  },
  created() {
    this.loadCategories();
    this.loadMaterials();
    this.loadSeasons();
  },
};
</script>

<style lang="css" scoped></style>
