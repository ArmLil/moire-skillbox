<template>
  <div>
    <main class="content container" v-if="productLoading"><Loader /></main>
    <main class="content container" v-else-if="productLoadingFailed">Товар не загрузился</main>
    <main class="content container" v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              {{ product.category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> {{ product.title }} </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img
              width="570"
              height="570"
              :src="currentColor.gallery[0].file.url"
              :alt="product.title"
            />
          </div>
          <ul class="pics__list">
            <li class="pics__item" v-for="_color in product.colors" :key="_color.id">
              <a
                href="#"
                class="pics__link"
                :class="{ 'pics__link--current': _color.id === currentColor.id }"
                @click.prevent="handleColorChange(_color)"
              >
                <img
                  style="width: 98px; height: 98px"
                  :src="_color.gallery[0].file.url"
                  :alt="product.title"
                />
              </a>
            </li>
          </ul>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">{{ product.title }}</h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addToCart">
              <div class="item__row item__row--center">
                <div class="form__counter">
                  <button type="button" aria-label="Убрать один товар" @click="decAmount">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus"></use>
                    </svg>
                  </button>

                  <input type="text" v-model="productAmount" name="count" />

                  <button type="button" aria-label="Добавить один товар" @click="accAmount">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus"></use>
                    </svg>
                  </button>
                </div>

                <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>
              </div>

              <div class="item__row">
                <fieldset class="form__block">
                  <legend class="form__legend">Цвет</legend>
                  <ul class="colors colors--black">
                    <li class="colors__item" v-for="_color in product.colors" :key="_color.id">
                      <label class="colors__label">
                        <input
                          class="colors__radio sr-only"
                          type="radio"
                          name="color-item"
                          :value="_color"
                          v-model="currentColor"
                          checked=""
                        />
                        <span
                          class="colors__value"
                          v-bind:style="{
                            'background-color': _color.color.code,
                            border: '1px solid grey',
                          }"
                        >
                        </span>
                      </label>
                    </li>
                  </ul>
                </fieldset>

                <fieldset class="form__block">
                  <legend class="form__legend">Размер</legend>
                  <label class="form__label form__label--small form__label--select">
                    <select class="form__select" type="text" name="category" v-model="currentSize">
                      <option :value="size" v-for="size in product.sizes" :key="size.id">
                        {{ size.title }}
                      </option>
                    </select>
                  </label>
                </fieldset>
              </div>

              <button
                class="item__button button button--primery"
                type="submit"
                :disabled="productAddSending"
              >
                В корзину
              </button>
              <div v-show="productAdded">Товар добавлен в карзину</div>
              <div v-show="productAddSending">Добовляем товар в карзину...</div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a
                class="tabs__link"
                :class="{ 'tabs__link tabs__link--current': showContent }"
                @click.prevent="showContent = true"
              >
                Информация о товаре
              </a>
            </li>
            <li class="tabs__item">
              <a
                class="tabs__link"
                :class="{ 'tabs__link tabs__link--current': !showContent }"
                href="#"
                @click.prevent="showContent = false"
              >
                Доставка и возврат
              </a>
            </li>
          </ul>

          <div class="item__content" v-if="showContent">
            <h3>Состав:</h3>

            <p v-for="material in product.materials" :key="material.id" style="margin: 0">
              {{ material.title }}
            </p>
            <p>
              {{ product.content }}
            </p>
          </div>
          <div class="item__content" styel="text-align: left" v-else>
            <ul style="list-style-type: disc">
              <li v-for="content in deliveries" :key="content.id">
                <p>{{ content.title }}, стоимость: {{ content.price }} руб.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import gotoPage from "@/helpers/gotoPage";
import numberFormat from "@/helpers/numberFormat";
import isNaturalNumber from "@/helpers/isNumber";
import { API_BASE_URL } from "@/config";

export default {
  components: { Loader },
  props: ["pageParams"],
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false,

      currentColor: null,
      currentSize: null,
      deliveries: [],
      showContent: true,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productData;
    },
  },
  methods: {
    gotoPage,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({
        productId: this.product.id,
        amount: this.productAmount,
      }).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
    decAmount() {
      this.productAmount -= 1;
    },
    accAmount() {
      this.productAmount += 1;
    },
    handleColorChange(color) {
      console.log({ color });
      this.currentColor = color;
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(API_BASE_URL + "api/products/" + this.$route.params.id)
        .then((response) => {
          this.productData = response.data;
          this.currentColor = this.productData.colors[0];
          this.currentSize = this.productData.sizes[0];
        })
        .catch(() => {
          this.productLoadingFailed = true;
        })
        .then(() => {
          this.productLoading = false;
        });
    },
    loadDelivery() {
      axios
        .get(API_BASE_URL + "api/deliveries")
        .then((response) => {
          this.deliveries = response.data;
        })
        .catch((err) => {
          console.error({ err });
        });
    },
  },
  watch: {
    productAmount(newData, oldData) {
      if (!isNaturalNumber(newData)) {
        this.productAmount = oldData;
      } else {
        this.productAmount = newData;
      }
    },
    "$route.params.id": {
      handler() {
        this.loadProduct();
        this.loadDelivery();
      },
      immediate: true,
    },
    currentColor(value) {
      if (value) this.currentImg = value.gallery[0].file.url || null;
    },
  },
};
</script>
